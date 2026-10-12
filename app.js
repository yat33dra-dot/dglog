'use strict';
const KEY='logger_app_data',$=s=>document.querySelector(s);
const TY=['L1','L2','HNR','FU','MO'];
const ST={L1:['👀 L1','#E6E8EA','#4B5563','#333'],L2:['💬 L2','#82B1E6','#fff','#82B1E6'],HNR:['🔥 HNR','#528A61','#fff','#528A61'],FU:['📲 FU','#1F2937','#fff','#1F2937'],MO:['🏆 MO','#DB6256','#fff','#DB6256']};
const DEF={pts:{L1:1,L2:2,HNR:5,FU:10,MO:-1},first:10,step:5};
const PRE={HNR:'🟢',FU:'🟡',MO:'🔴'};
const TAGS=[['OO','OO'],['Weasel','Weasel'],['I-date','☕I-date'],['No#Close','No#Close'],['2-set','2️⃣2-set'],['Over came','💪🏻Over came'],['Name close','🏷️Name close'],['zero set','0️⃣zero set'],['Dude HNR','🕺🏻Dude HNR']];
const EMO=['😀','😝','😡','🥳','💪🏻','💡'];
const MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const LINE=/^\[(\d{1,2}:\d{2} [ap]m)\]\s*(🟢|🟡|🔴)\s*(HNR|FU|MO)\s*#(\d+):/i;
const ld=d=>new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10);
const hm=()=>new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
const tm12=()=>new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true}).toLowerCase();
const ym=d=>d.slice(0,7),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const blank=()=>({isStarted:false,date:ld(new Date()),startTime:hm(),place:'',notes:'',reps:[]});
function load(){let d;try{d=JSON.parse(localStorage.getItem(KEY))}catch(e){}
 d=d&&typeof d==='object'?d:{};d.sessions=Array.isArray(d.sessions)?d.sessions:[];d.rules=d.rules||{};
 d.venues=Array.isArray(d.venues)?d.venues:['FC','Px Vn','Mg Road','Camp','Viman Nagar'];
 d.currentSession={...blank(),...(d.currentSession||{})};return d}
let D=load(),view='log',mon=new Date(),scoM=ym(ld(new Date()));mon=new Date(mon.getFullYear(),mon.getMonth(),1);
let exS=ld(mon),exE=ld(new Date(mon.getFullYear(),mon.getMonth()+1,0));
function save(){try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){toast('⚠️ Could not save: storage full or blocked')}}
const C=()=>D.currentSession;
if(!C().isStarted&&!C().reps.length){C().date=ld(new Date());C().startTime=hm();save()}
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display='none',2000)}
// ---------- scoring (per month) ----------
function rule(m){const k=Object.keys(D.rules).filter(x=>x<=m).sort();return k.length?D.rules[k[k.length-1]]:DEF}
const pts=(reps,m)=>{const p=rule(m).pts;return reps.reduce((a,r)=>a+(p[r.type]||0),0)};
const cnt=r=>{const n={L1:0,L2:0,HNR:0,FU:0,MO:0};r.forEach(x=>{if(x.type in n)n[x.type]++});return n};
const dayTot=d=>D.sessions.filter(s=>s.date===d).reduce((a,s)=>a+pts(s.reps,ym(s.date)),0);
const dots=(s,m)=>{const r=rule(m);return s<r.first?-1:Math.min(3,Math.floor((s-r.first)/r.step))};
const markTxt=(s,m)=>{const k=dots(s,m);return k<0?'':'X'+'0'.repeat(k)};
// ---------- notes editor ----------
const rd=()=>{const e=$('#ed');return e?e.innerText.replace(/\u00a0/g,' ').replace(/\n$/,''):C().notes};
const html=t=>t.split('\n').map(l=>{const m=l.match(LINE);return m?`<b>${esc(m[0])}</b>${esc(l.slice(m[0].length))}`:esc(l)}).join('<br>');
function setEd(t,end){const e=$('#ed');if(!e)return;e.innerHTML=html(t);if(end){e.focus();const r=document.createRange();r.selectNodeContents(e);r.collapse(false);const s=getSelection();s.removeAllRanges();s.addRange(r);e.scrollTop=e.scrollHeight}}
function ins(t){const e=$('#ed');if(!e)return;
 if(document.activeElement!==e){e.focus();const r=document.createRange();r.selectNodeContents(e);r.collapse(false);const s=getSelection();s.removeAllRanges();s.addRange(r)}
 const s=getSelection(),n=s.anchorNode,p=n&&n.nodeType===3&&s.anchorOffset>0?n.data[s.anchorOffset-1]:'';
 document.execCommand('insertText',false,(p&&!/\s/.test(p)?' ':'')+t+' ');C().notes=rd();save()}
// ---------- views ----------
const tile=(k,n,cls)=>{const [l,bg,fg,bt]=ST[k],p=D.rules?rule(ym(C().date)).pts[k]:0;
 return `<div class="${cls}" style="background:${bg};color:${fg}"><i>${l}</i><b data-n="${k}">${n[k]}</b><small>${p>0?'+':''}${p} pt${Math.abs(p)==1?'':'s'}</small><p><button class=m data-a=sub data-v=${k} data-keep data-m="${k}" ${n[k]?'':'disabled'}>−</button><button data-a=add data-v=${k} data-keep style="color:${bt}">+</button></p></div>`};
const tiles=(n,lock)=>`<div class="tl ${lock?'lock':''}">${tile('L1',n,'a')}${tile('L2',n,'a')}${tile('HNR',n,'a')}${tile('FU',n,'b')}${tile('MO',n,'b')}</div>`;
const hdr=()=>`<div class="r top"><b>⚛ DG LOG</b><span class=scr>Score <b id=sc>${pts(C().reps,ym(C().date))}</b></span></div>`;
function logV(){const c=C(),n=cnt(c.reps),on=c.isStarted||c.reps.length;
 if(!on){const ok=c.place.trim()&&c.date&&c.startTime;
  return `<div class=pg>${hdr()}<div class=card><div class=meta><input type=date data-f=date value="${esc(c.date)}"><input type=time data-f=startTime value="${esc(c.startTime)}"></div>
<input class=pl data-f=place placeholder="Place" value="${esc(c.place)}" autocomplete=off><div class=chs>${D.venues.map((v,i)=>`<button class="chip ${v.toLowerCase()===c.place.trim().toLowerCase()?'on':''}" data-a=ven data-v=${i}>${esc(v)}</button>`).join('')}</div></div>
<button class="big st ${ok?'':'off'}" data-a=start>▶ START SESSION</button>${tiles(n,1)}</div>`}
 return `<div class=lp>${hdr()}<div class=r style="margin-bottom:8px"><div class=meta style="margin:0"><span class=chip style="font-weight:600">${esc(c.place)}</span><span class=chip style="font-weight:600">${c.date.slice(8)}-${c.date.slice(5,7)} · ${esc(c.startTime)}</span></div><button data-a=reset style="border:0;background:none;color:#9ca3af;font-weight:600;font-size:12px">Reset</button></div>
${tiles(n)}<div id=ed class=ed contenteditable=true spellcheck=false data-ph="Quick notes..."></div>
<div class=dock>${TAGS.map((t,i)=>`<button class=chip data-a=tag data-v=${i} data-keep>${t[0]}</button>`).join('')}${EMO.map(e=>`<button class="chip e" data-a=emo data-v="${e}" data-keep>${e}</button>`).join('')}</div>
<button class="big sv" data-a=saveS>SAVE SESSION</button></div>`}
function mountLog(){const e=$('#ed');if(!e)return;e.innerHTML=html(C().notes);
 e.addEventListener('input',()=>{C().notes=rd();save()});
 e.addEventListener('keydown',k=>{if(k.key==='Enter'){k.preventDefault();document.execCommand('insertLineBreak')}});
 e.addEventListener('paste',k=>{k.preventDefault();document.execCommand('insertText',false,(k.clipboardData||window.clipboardData).getData('text/plain'))});
 e.addEventListener('focus',()=>document.body.classList.add('typing'));e.addEventListener('blur',()=>document.body.classList.remove('typing'))}
function updTiles(){const n=cnt(C().reps);TY.forEach(k=>{const b=document.querySelector(`[data-n=${k}]`);if(b)b.textContent=n[k];const m=document.querySelector(`[data-m=${k}]`);if(m)m.disabled=!n[k]});const s=$('#sc');if(s)s.textContent=pts(C().reps,ym(C().date))}
function statsV(){const y=mon.getFullYear(),m=mon.getMonth(),M=ym(ld(mon)),dim=new Date(y,m+1,0).getDate(),lead=(mon.getDay()+6)%7,today=ld(new Date());
 let c='';for(let i=0;i<lead;i++)c+='<div class=d></div>';
 for(let i=1;i<=dim;i++){const d=ld(new Date(y,m,i)),s=dayTot(d),k=dots(s,M),has=D.sessions.some(x=>x.date===d);
  c+=`<div class="d ${d===today?'now':''}">${i}<div class=x>${k>-1?`<u>X</u>${k?`<s>${'<i></i>'.repeat(k)}</s>`:''}`:''}${has?`<em>${s}</em>`:''}</div></div>`}
 for(let i=0;i<(7-(lead+dim)%7)%7;i++)c+='<div class=d></div>';
 return `<div class=pg><div class=r style="margin-bottom:16px"><h1>Calendar</h1><div class=mh><button data-a=mo data-v=-1>‹</button><span>${mon.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</span><button data-a=mo data-v=1>›</button></div></div>
<div class=cal><div class="g7 dow">${[...'MTWTFSS'].map(d=>`<div>${d}</div>`).join('')}</div><div class="g7 days">${c}</div></div>
<div class=card style="padding:16px;border-radius:24px"><h2 style="font-size:15px">Export &amp; Backup</h2>
<div class=er><div>START DATE<input type=date data-f=exS value="${exS}"></div><div>END DATE<input type=date data-f=exE value="${exE}"></div></div>
<div class=eb><button class=a data-a=csv>CSV backup</button><button class=c data-a=ai>JSON for AI</button><button class=k data-a=png>Calendar PNG</button><label>Import<input type=file accept=".json,.txt,.csv" hidden onchange="imp(this)"></label><button class=w data-a=wipe>Delete All Logs</button></div></div></div>`}
function scoV(){const m=scoM,r=rule(m),lock=m<ym(ld(new Date())),[y,mo]=m.split('-'),
 st=(p,v)=>`<div class=stp><button data-a=sp data-v="${p}:-1">−</button><b>${v}</b><button data-a=sp data-v="${p}:1">+</button></div>`;
 return `<div class=pg><div class=r style="margin-bottom:16px"><h1>Scoring</h1><div class=mh><button data-a=sm data-v=-1>‹</button><span>${MN[mo-1]} ${y}</span><button data-a=sm data-v=1>›</button></div></div>
<div class=card style="${lock?'opacity:.6':''}"><h2>Points per tap</h2>${TY.map((k,i)=>`<div class="row2 ${i?'':'f'}"><span class=pc style="background:${ST[k][1]};color:${ST[k][2]}">${k}</span>${st('pts.'+k,r.pts[k])}</div>`).join('')}</div>
<div class=card style="${lock?'opacity:.6':''}"><h2>Marking</h2><div class="row2 f"><span>First X at</span>${st('first',r.first)}</div><div class=row2><span>Step</span>${st('step',r.step)}</div>
<div class=mk>${[0,1,2,3].map(i=>`<div><u>X</u><s>${'<i></i>'.repeat(i)}</s>${r.first+r.step*i}</div>`).join('')}</div></div>
<div class=r style="font-size:12px;color:#6b7280;padding:0 4px"><span>${lock?'Past month: locked':'Applies to '+MN[mo-1]+' only'}</span>${lock?'':'<button data-a=rst style="border:0;background:#e6e8ea;color:#4b5563;border-radius:10px;padding:9px 12px;font-weight:600">Reset to defaults</button>'}</div></div>`}
function render(){const v=$('#v');v.innerHTML=view==='log'?logV():view==='stats'?statsV():scoV();if(view==='log')mountLog();
 document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===view))}
// ---------- actions ----------
const A={
 go(v){view=v;render();scrollTo(0,0)},
 ven(i){C().place=D.venues[i];save();render()},
 start(){const c=C(),p=c.place.trim().replace(/\s+/g,' ');if(!p||!c.date||!c.startTime)return toast('⚠️ Fill place, date and time first');
  const f=D.venues.find(v=>v.toLowerCase()===p.toLowerCase());c.place=f||p;if(!f)D.venues.push(p);c.isStarted=true;save();render();toast('Session started')},
 add(t){const c=C();c.notes=rd();c.reps.push({time:tm12(),type:t,notes:''});
  if(PRE[t]){const k=c.reps.filter(r=>r.type===t).length;c.notes=(c.notes&&!c.notes.endsWith('\n')?c.notes+'\n':c.notes)+`[${c.reps[c.reps.length-1].time}] ${PRE[t]} ${t} #${k}: `;setEd(c.notes,true)}
  save();updTiles();navigator.vibrate&&navigator.vibrate(12)},
 sub(t){const c=C(),i=c.reps.map(r=>r.type).lastIndexOf(t);if(i<0)return;c.notes=rd();c.reps.splice(i,1);
  if(PRE[t]){const L=c.notes.split('\n');let j=-1;L.forEach((l,x)=>{const m=l.match(LINE);if(m&&m[3].toUpperCase()===t)j=x});
   if(j>-1&&!L[j].replace(LINE,'').trim()){L.splice(j,1);c.notes=L.join('\n');setEd(c.notes,true)}else if(j>-1)toast('Removed tap. Your note text was kept.')}
  save();updTiles()},
 tag(i){ins(TAGS[i][1])},emo(e){ins(e)},
 reset(){if(confirm('Clear current session?')){D.currentSession=blank();save();render()}},
 saveS(){const c=C();c.notes=rd();if(!c.reps.length&&!c.notes.trim())return toast('Nothing to save');
  const s={...c,id:Date.now()};D.sessions.unshift(s);D.currentSession=blank();save();celebrate(s)},
 mo(n){mon=new Date(mon.getFullYear(),mon.getMonth()+n,1);render()},
 sm(n){const [y,m]=scoM.split('-').map(Number),d=new Date(y,m-1+ +n,1);scoM=ld(d).slice(0,7);render()},
 sp(v){if(scoM<ym(ld(new Date())))return toast('Past months are locked');const [p,d]=v.split(':'),b=rule(scoM),r={pts:{...b.pts},first:b.first,step:b.step};
  if(p.startsWith('pts.'))r.pts[p.slice(4)]+=+d;else r[p]=Math.max(1,r[p]+ +d);D.rules[scoM]=r;save();render()},
 rst(){D.rules[scoM]=JSON.parse(JSON.stringify(DEF));save();render()},
 csv(){exp('csv')},ai(){exp('ai')},png(){drawPng()},
 wipe(){if(confirm('Delete ALL logged sessions? Tap CSV backup first if you want a copy. This cannot be undone.')){D.sessions=[];D.currentSession=blank();save();render();toast('All logs deleted')}}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b&&A[b.dataset.a])A[b.dataset.a](b.dataset.v)});
document.addEventListener('mousedown',e=>{if(e.target.closest('[data-keep]'))e.preventDefault()});
document.addEventListener('input',e=>{const f=e.target.dataset.f;if(!f)return;
 if(f==='exS')exS=e.target.value;else if(f==='exE')exE=e.target.value;
 else{C()[f]=e.target.value;save();if(f==='place'){const ok=C().place.trim(),b=$('.big.st');if(b)b.classList.toggle('off',!ok);document.querySelectorAll('.chs .chip').forEach((c,i)=>c.classList.toggle('on',D.venues[i].toLowerCase()===ok.toLowerCase()))}}});
// ---------- celebration ----------
function celebrate(s){const M=ym(s.date),tot=dayTot(s.date),mk=markTxt(tot,M),o=document.createElement('div');o.id='cel';
 o.innerHTML=`<canvas></canvas><div class=card><div style="font-size:40px;line-height:1">🎉</div><div style="font-size:21px;font-weight:700;margin:8px 0 2px">Session saved</div><div style="font-size:50px;font-weight:800;color:#528a61;line-height:1.1">${pts(s.reps,M)>0?'+':''}${pts(s.reps,M)}</div><div style="color:#6b7280;margin-bottom:10px">points · today ${tot}</div>${mk?`<div style="display:inline-block;background:#FDECEA;color:#DB6256;border-radius:12px;padding:6px 16px;font-size:20px;font-weight:800">${mk}</div>`:''}<div style="color:#9ca3af;font-size:12px;margin-top:12px">tap to continue</div></div>`;
 document.body.appendChild(o);navigator.vibrate&&navigator.vibrate([30,40,30]);
 try{const a=new(window.AudioContext||window.webkitAudioContext)();[523,659,784,1047].forEach((f,i)=>{const n=a.createOscillator(),g=a.createGain();n.type='triangle';n.frequency.value=f;n.connect(g);g.connect(a.destination);const t=a.currentTime+i*.12;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.35,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.5);n.start(t);n.stop(t+.55)})}catch(e){}
 const cv=o.querySelector('canvas'),x=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;
 const P=Array.from({length:110},()=>({x:Math.random()*cv.width,y:-Math.random()*cv.height*.6,w:6+Math.random()*5,h:10+Math.random()*8,v:2+Math.random()*4,r:Math.random()*6,s:(Math.random()-.5)*.2,c:['#82B1E6','#528A61','#DB6256','#F5C542'][Math.random()*4|0]}));
 const end=Date.now()+2800;(function f(){x.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.y+=p.v;p.r+=p.s;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});if(Date.now()<end&&document.body.contains(o))requestAnimationFrame(f)})();
 o.onclick=()=>{o.remove();const p=s.date.split('-');mon=new Date(+p[0],+p[1]-1,1);view='stats';render();scrollTo(0,0)}}
// ---------- export ----------
const q=s=>`"${String(s||'').replace(/"/g,'""')}"`;
const dmy=d=>d.split('-').reverse().join('-');
function base(){const a=exS.split('-'),b=exE.split('-'),same=a[0]===b[0],f=(p,y)=>`${p[2]}-${MN[+p[1]-1]}${y?'-'+p[0]:''}`;return `DG LOG_${f(a,!same)}_to_${f(b,1)}`}
const inR=()=>D.sessions.filter(s=>(!exS||s.date>=exS)&&(!exE||s.date<=exE)).sort((a,b)=>a.date.localeCompare(b.date)||a.startTime.localeCompare(b.startTime));
function out(name,data,mime,alt){const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(data instanceof Blob?data:new Blob([data],{type:mime}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2e3)};
 const tries=[[name,mime]];if(alt)tries.push([alt,'text/plain']);
 for(const [n,t] of tries){const f=new File([data],n,{type:t});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:n}).catch(e=>{if(e.name!=='AbortError')dl()});return}}dl()}
function exp(t){const ss=inR();if(!ss.length)return toast('No sessions in that date range');
 if(t==='csv'){let o='Date,Day,Start,Place,L1,L2,HNR,FU,MO,Session Score,Day Total,Day Mark,Notes\n';
  ss.forEach(s=>{const n=cnt(s.reps),M=ym(s.date),tot=dayTot(s.date);o+=[dmy(s.date),new Date(s.date+'T12:00').toLocaleDateString('en-US',{weekday:'short'}),s.startTime,q(s.place),n.L1,n.L2,n.HNR,n.FU,n.MO,pts(s.reps,M),tot,markTxt(tot,M),q((s.notes||'').replace(/\r?\n+/g,' | '))].join(',')+'\n'});
  return out(base()+'.csv','\ufeff'+o,'text/csv')}
 const days={},keys={},tg={};let tp=0;const all=[];
 ss.forEach(s=>{(days[s.date]=days[s.date]||[]).push(s);keys[ym(s.date)]=rule(ym(s.date));all.push(...s.reps)});
 const tagOf=t=>{const r=[];TAGS.forEach(x=>{if(t.includes(x[1]))r.push(x[0])});EMO.forEach(e=>{if(t.includes(e))r.push(e)});return r};
 const split=(notes,M,s)=>{const E=[];let cur=null,pre=[];(notes||'').split('\n').forEach(l=>{const m=l.match(LINE);if(m){cur={time:m[1].toLowerCase(),type:m[3].toUpperCase(),n:+m[4],text:l.slice(m[0].length).trim()};E.push(cur)}else if(cur){cur.text=(cur.text+' '+l.trim()).trim()}else if(l.trim())pre.push(l.trim())});
  E.forEach(e=>{e.points=rule(M).pts[e.type];e.tags=tagOf(e.text)});return {pre,E}};
 const dl=Object.keys(days).sort().map(d=>{const M=ym(d),tot=dayTot(d);tp+=tot;return {date:d,weekday:new Date(d+'T12:00').toLocaleDateString('en-US',{weekday:'short'}),points:tot,mark:markTxt(tot,M)||null,
  sessions:days[d].map(s=>{const sp=split(s.notes,M,s);sp.E.forEach(e=>e.tags.forEach(t=>tg[t]=(tg[t]||0)+1));return {place:s.place,start:s.startTime,points:pts(s.reps,M),counts:cnt(s.reps),approaches:sp.E,other_notes:sp.pre.join(' | '),raw_notes:s.notes||''}})}});
 const J={about:'Daygame approach log from the DG LOG app, for monthly review. Points and day marks are already calculated using the scoring key for each month. Approaches are notes split at each timestamped HNR/FU/MO line. Tags are plain text in notes and score 0.',
  legend:{types:{L1:'Directional / functional open',L2:'Social opens / interactions / Dude HNR',HNR:'Direct open / compliment',FU:'Number ask / instadate',MO:'Missed opportunity (fear, not logistics)'},tags:{OO:'Opinion opener',Weasel:'Creative but weak excuse (reason)','I-date':'Instadate','No#Close':'Number close'},marks:'X = first threshold, X0/X00/X000 = each further step'},
  scoring_key_used:Object.fromEntries(Object.entries(keys).map(([m,r])=>[m,{points_per_tap:r.pts,first_X_at:r.first,step:r.step}])),
  range:{from:exS,to:exE},month_totals:{days_logged:dl.length,sessions:ss.length,total_points:tp,avg_points_per_logged_day:+(tp/dl.length).toFixed(1),counts:cnt(all),tag_mentions:tg},days:dl};
 out(base()+'.json',JSON.stringify(J,null,2),'application/json',base()+'.txt')}
function drawPng(){const y=mon.getFullYear(),m=mon.getMonth(),M=ym(ld(mon)),dim=new Date(y,m+1,0).getDate(),lead=(mon.getDay()+6)%7,rows=Math.ceil((lead+dim)/7),W=1080,cw=W/7,ch=150,H=130+rows*ch+30,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 x.fillStyle='#fff';x.fillRect(0,0,W,H);x.fillStyle='#111';x.font='bold 54px system-ui,sans-serif';x.fillText(mon.toLocaleDateString('en-US',{month:'long',year:'numeric'}),30,70);
 x.font='bold 24px system-ui,sans-serif';x.fillStyle='#9ca3af';x.textAlign='center';'MTWTFSS'.split('').forEach((l,i)=>x.fillText(l,cw*i+cw/2,118));
 x.strokeStyle='#e5e7eb';x.lineWidth=2;for(let r=0;r<=rows;r++){x.beginPath();x.moveTo(0,130+r*ch);x.lineTo(W,130+r*ch);x.stroke()}for(let i=0;i<=7;i++){x.beginPath();x.moveTo(i*cw,130);x.lineTo(i*cw,130+rows*ch);x.stroke()}
 for(let d=1;d<=dim;d++){const i=lead+d-1,cx=(i%7)*cw,cy=130+(i/7|0)*ch,dd=ld(new Date(y,m,d)),s=dayTot(dd),k=dots(s,M),has=D.sessions.some(z=>z.date===dd);
  x.textAlign='left';x.fillStyle='#374151';x.font='26px system-ui,sans-serif';x.fillText(d,cx+12,cy+34);x.textAlign='center';
  if(k>-1){x.fillStyle='#DB6256';x.font='bold 56px system-ui,sans-serif';x.fillText('X',cx+cw/2,cy+96);x.fillStyle='#111';for(let j=0;j<k;j++){x.beginPath();x.arc(cx+cw/2+(j-(k-1)/2)*20,cy+112,6,0,7);x.fill()}}
  if(has){x.fillStyle='#9ca3af';x.font='20px system-ui,sans-serif';x.fillText(s,cx+cw/2,cy+ch-8)}}
 const f=`DG LOG_01-${MN[m]}_to_${dim}-${MN[m]}-${y}.png`;c.toBlob(b=>out(f,b,'image/png'))}
// ---------- import ----------
function rows(t){const R=[];let r=[],f='',iq=0;for(let i=0;i<t.length;i++){const c=t[i];
 if(iq){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else iq=0}else f+=c}else if(c==='"')iq=1;else if(c===','){r.push(f);f=''}
 else if(c==='\n'||c==='\r'){if(c==='\r'&&t[i+1]==='\n')i++;r.push(f);f='';if(r.some(z=>z.trim()))R.push(r);r=[]}else f+=c}
 r.push(f);if(r.some(z=>z.trim()))R.push(r);return R}
const nd=s=>/^\d{2}-\d{2}-\d{4}$/.test(s)?s.split('-').reverse().join('-'):s;
function parseCSV(t){const R=rows(t.replace(/^\ufeff/,''));if(R.length<2)return[];const h=R[0].map(x=>x.trim().toLowerCase()),ix=n=>h.findIndex(x=>n.includes(x)),out=[];
 if(h.includes('rep type')){const M={};R.slice(1).forEach((r,i)=>{const [date,time,type,place='',notes='']=r;if(!type)return;const k=date+'|'+place+'|'+notes;(M[k]=M[k]||{id:Date.now()+i,isStarted:false,date:nd(date),startTime:time,place,notes,reps:[]}).reps.push({time,type,notes:''})});return Object.values(M)}
 const c={date:ix(['date']),st:ix(['start','session start time']),pl:ix(['place']),nt:ix(['notes'])};
 R.slice(1).forEach((r,i)=>{const reps=[];TY.forEach(k=>{const j=ix([k.toLowerCase(),k.toLowerCase()+' count']);for(let n=0;n<(+r[j]||0);n++)reps.push({time:'',type:k,notes:''})});
  out.push({id:Date.now()+i,isStarted:false,date:nd(r[c.date]),startTime:r[c.st]||'',place:r[c.pl]||'',notes:(r[c.nt]||'').replace(/ \| /g,'\n'),reps})});return out}
function imp(el){const file=el.files[0];if(!file)return;const rd=new FileReader();
 rd.onload=()=>{try{let add;if(/\.csv$/i.test(file.name))add=parseCSV(rd.result);else{const p=JSON.parse(rd.result);if(!Array.isArray(p.sessions))throw new Error('Not a valid backup file');add=p.sessions;if(p.venues)p.venues.forEach(v=>{if(!D.venues.some(z=>z.toLowerCase()===v.toLowerCase()))D.venues.push(v)});if(p.rules)D.rules={...p.rules,...D.rules}}
  const key=s=>[s.date,s.startTime,s.place,s.notes].join('|'),have=new Set(D.sessions.map(key)),fresh=add.filter(s=>s&&s.date&&Array.isArray(s.reps)&&!have.has(key(s)));
  D.sessions=[...fresh,...D.sessions].sort((a,b)=>b.date.localeCompare(a.date));save();render();toast(`Imported ${fresh.length} sessions`)}catch(e){alert(e.message||'Import failed')}el.value=''};rd.readAsText(file)}
render();
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
