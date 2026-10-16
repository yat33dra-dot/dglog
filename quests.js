'use strict';
// Quests: Night Game, Approach Ladder, Torero Drills. Additive module, loaded after app.js.
(function(){
const css=`
.qp{padding:14px 14px 96px}.qs{color:#6b7280;font-size:13px;margin:2px 0 14px}.qback{border:0;background:none;color:#6b7280;font-weight:600;font-size:14px;padding:0 0 8px}
.qc{border-radius:22px;padding:18px;margin-bottom:12px;position:relative;background:#fff;box-shadow:0 1px 3px #0002}.qc .e{font-size:32px;line-height:1}.qc h2{font-size:19px;margin:8px 0 2px}.qc p{font-size:13px;margin:0;color:#6b7280}.qc:after{content:'›';position:absolute;right:18px;top:50%;margin-top:-16px;font-size:26px;opacity:.4}
.qpill{display:inline-block;margin-top:10px;border-radius:99px;padding:5px 12px;font-size:12px;font-weight:700}.qbar{height:7px;border-radius:9px;background:#e5e7eb;margin-top:10px;width:70%}.qbar i{display:block;height:100%;border-radius:9px;background:#528a61}
.qd{font-size:13.5px;color:#374151;margin:6px 0}.qg{font-size:12px;color:#6b7280;margin:4px 0 0}
.qlv{display:flex;gap:8px;margin-bottom:10px}.qlv span{flex:1;text-align:center;padding:8px 0;border-radius:10px;background:#f3f4f6;font-weight:700;color:#9ca3af}.qlv .on{background:#111;color:#fff}.qlv .pa{background:#E3F1E7;color:#2f6b40}
.qcnt{font-size:54px;font-weight:800;line-height:1}.qcnt small{font-size:20px;color:#9ca3af}.qdots{display:flex;gap:6px;justify-content:center;margin:10px 0}.qdots i{width:14px;height:14px;border-radius:50%;background:#e5e7eb}.qdots i.on{background:#528a61}
.qok{color:#2f6b40;font-weight:700;margin:6px 0}.qbtns{display:flex;gap:10px;margin-top:8px}.qb{width:54px;border:0;border-radius:14px;background:#f3f4f6;font-size:22px;font-weight:700}.big2{flex:1;background:#528a61;color:#fff;font-size:17px;padding:14px}
.qs2{flex:1;border:0;border-radius:12px;padding:12px;background:#e5e7eb;font-weight:600;font-size:13px;color:#374151}.qs2:disabled{opacity:.4}.qcalm{display:block;width:100%;margin-top:10px;background:#E8F1FB;color:#2b5d95}
.qb2{display:block;width:100%;border:0;border-radius:14px;padding:13px;background:#111;color:#fff;font-weight:700;font-size:15px;margin-top:8px}.qb2.g{background:#528a61}.qb2.l{background:#e5e7eb;color:#374151}
.qtm{font-size:46px;font-weight:800;text-align:center;line-height:1.1}.qtm.late{color:#db6256}
.tdots{display:flex;gap:4px;margin:4px 0 14px}.tdots i{flex:1;height:5px;border-radius:9px;background:#e5e7eb}.tdots .pa{background:#528a61}.tdots .on{background:#111}
.chk{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-top:1px solid #f0f1f2}.chk:first-child{border:0}.chk i{flex:none;width:26px;height:26px;border-radius:8px;border:2px solid #d1d5db;display:flex;align-items:center;justify-content:center;font-style:normal;color:#fff;font-weight:800}.chk.on i{background:#528a61;border-color:#528a61}.chk b{display:block;font-size:14px}.chk span{font-size:12.5px;color:#6b7280}
.scr2{font-style:italic;background:#f9fafb;border-radius:12px;padding:12px;margin:8px 0;font-size:15px;line-height:1.45}.rule{font-size:12px;color:#6b7280;background:#FEF7E6;border-radius:10px;padding:9px;margin-top:8px}
.rt{display:flex;gap:6px;margin:6px 0 10px}.rt button{flex:1;border:0;border-radius:9px;padding:9px 0;background:#f3f4f6;font-weight:700}.rt .on{background:#111;color:#fff}.rw2{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.rw2 button{border:0;border-radius:99px;padding:9px 14px;background:#f3f4f6;font-weight:600}.rw2 .on{background:#111;color:#fff}
#qbr{position:fixed;inset:0;z-index:60;background:#0b1020;color:#e8eaf6;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center}
#qbr .bc{position:relative;width:240px;height:240px;display:flex;align-items:center;justify-content:center}#qbr .bo{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,#38bdf8aa,#38bdf822);box-shadow:0 0 40px #38bdf855}#qbr .bt{position:relative;font-size:20px;font-weight:700}#qbr p{margin:26px 0;color:#9aa4c7;min-height:24px}#qbr button{max-width:260px}
body.qn{background:#05060d;color:#e8eaf6}body.qn nav{background:#0b0d17;border-color:#20233a}body.qn nav button{color:#565c8a}body.qn nav button.on{color:#FFD27A}
.nq{background:radial-gradient(120% 40% at 50% 0%,#1b1440 0%,transparent 70%);margin:-14px -14px 0;padding:14px}.nq .qback{color:#8b93b8}.nneon{font-size:25px;font-weight:800;color:#FFD27A;text-shadow:0 0 6px #FFB02088,0 0 18px #FFB02066}.ntag{font-size:12px;color:#8b93b8;margin:2px 0 10px}
.nst{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0 12px}.nst div{background:#141829;border:1px solid #2a2e4d;border-radius:16px;padding:9px;text-align:center}.nst small{font-size:10px;font-weight:700;color:#8b93b8;letter-spacing:1px;display:block}.nst b{font-size:30px;display:block;line-height:1.2}
.nrw{background:#12162a;border:1px solid #262a48;border-radius:18px;padding:10px 10px 11px;margin-bottom:9px}.nt{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:14px}.nlv{font-size:10px;font-weight:800;border-radius:6px;padding:2px 6px;margin-right:7px}.nop{font-size:12px;color:#8b93b8;font-style:italic;margin:3px 0 8px}
.ncl{display:grid;grid-template-columns:1fr 1fr 1fr 1.2fr;gap:7px}.nc{height:50px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;text-align:center;line-height:1.15}.nc.o{border:2px dashed #353a63;color:#4b5180;font-size:16px}.nc.lk{background:#161a30;color:#565c8a;font-size:10.5px;font-weight:600}
.nc.rd{background:#3a2a05;border:2px solid #FFB020;color:#FFD27A;font-size:12px;box-shadow:0 0 14px #FFB02055}.nc.sk{background:#0f2b22;border:2px solid #34D399;color:#6EE7B7;font-size:12px}.nc.dk{background:#2a1216;border:2px solid #DB6256;color:#F28B82;font-size:12px}
.nbk{position:fixed;inset:0;background:#000a;z-index:40}.nsh{position:fixed;left:0;right:0;bottom:0;max-width:440px;margin:0 auto;background:#141829;border-top:1px solid #FFB02066;border-radius:24px 24px 0 0;padding:22px 18px 30px;text-align:center;z-index:41;color:#e8eaf6}.nsh .qb2{border:1px solid}
.nbt{display:inline-block;background:#171a30;border:1px solid #2a2e4d;border-radius:99px;padding:8px 14px;font-size:13px;font-weight:600;color:#c7cdf0}
.ned{background:#12162a;border:1px solid #262a48;border-radius:18px;padding:11px;margin-bottom:9px}.nin{background:#0b0d17;border:1px solid #2a2e4d;border-radius:11px;padding:9px 10px;font-size:13px;color:#c7cdf0;width:100%}
.nsp{display:flex;align-items:center;gap:8px}.nsp button{width:30px;height:30px;border:0;border-radius:8px;background:#1d2140;color:#e8eaf6;font-size:17px}.nsp b{min-width:26px;text-align:center;color:#FFD27A}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const td=()=>ld(new Date());
function Q(){D.quests=D.quests||{};const q=D.quests;
 if(!q.ladder)q.ladder={level:1,count:0,date:'',doneDate:'',lat:[]};
 if(!q.torero)q.torero={step:0,warm:[0,0,0,0,0,0],done:0,sid:null,rw:'',au:{p:0,v:0,e:0,r:0},audit:0};
 if(!q.night)q.night={cfg:{pen:1,lv:[{e:'🤝',n:'Staff Open',o:"Busy night? What's good here?",p:1,b:2},{e:'🍻',n:'Cheers Dude',o:'Cheers man! What are you drinking?',p:2,b:3},{e:'💡',n:'Opinion opener',o:'Settle this: best beer in the house?',p:3,b:4},{e:'💬',n:'Compliment',o:"That jacket is great, where's it from?",p:4,b:5}]},ck:[],dr:[]};
 const N=q.night;N.cfg.lv.forEach((_,i)=>{if(!N.ck[i])N.ck[i]=[0,0,0];if(N.dr[i]===undefined)N.dr[i]=null});return q}
let sub='menu',edit=false,sheet=null,T={},I={},BR=null;
const nsum=N=>N.ck.reduce((a,r)=>a+r[0]+r[1]+r[2],0);
const nscore=N=>N.cfg.lv.reduce((a,l,i)=>a+(N.ck[i][0]+N.ck[i][1]+N.ck[i][2])*l.p+(N.dr[i]==='s'?l.b:N.dr[i]==='d'?-N.cfg.pen:0),0);
function showup(kind,place,notes){const s={id:Date.now(),isStarted:false,date:td(),startTime:hm(),place,notes,reps:[],showup:1,kind};D.sessions.unshift(s);save();return s}
function cel(title,subt){const o=document.createElement('div');o.id='cel';o.innerHTML=`<canvas></canvas><div class=card><div style="font-size:40px;line-height:1">🎉</div><div style="font-size:21px;font-weight:700;margin:8px 0 2px">${title}</div><div style="color:#6b7280;margin-top:6px">${subt}</div></div>`;document.body.appendChild(o);setTimeout(()=>o.remove(),3300);o.onclick=()=>o.remove();
 try{playCheer();navigator.vibrate&&navigator.vibrate([30,40,30])}catch(e){}
 const cv=o.querySelector('canvas'),x=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;const P=Array.from({length:100},()=>({x:Math.random()*cv.width,y:-Math.random()*cv.height*.6,w:6+Math.random()*5,h:10+Math.random()*8,v:2+Math.random()*4,r:Math.random()*6,s:(Math.random()-.5)*.2,c:['#82B1E6','#528A61','#DB6256','#F5C542'][Math.random()*4|0]}));const end=Date.now()+2600;
 (function f(){x.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.y+=p.v;p.r+=p.s;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore()});if(Date.now()<end&&document.body.contains(o))requestAnimationFrame(f)})()}
const back=()=>`<button class=qback data-a=qgo data-v=menu>‹ Quests</button>`;
// ---------- menu ----------
function menu(){const q=Q(),L=q.ladder,t=q.torero,N=q.night,c=L.date===td()?L.count:0,tot=N.cfg.lv.length*3;
 const ts=t.step>10?'Debrief':t.step===0?(t.warm.some(Boolean)?'Warm-up in progress':'Not started'):`Drill ${t.step} of 10`;
 return `<h1>Quests</h1><p class=qs>Side quests to build the identity</p>
<div class=qc data-a=qgo data-v=night style="background:radial-gradient(120% 90% at 20% 0%,#2a1b66,#0b0d17);border:1px solid #2a2e4d"><div class=e>🌙</div><h2 style="color:#FFD27A;text-shadow:0 0 12px #FFB02088">Night Game</h2><p style="color:#a5adcf">Bar bingo. Talk first, pints second.</p><span class=qpill style="background:#35260a;color:#FFD27A">Tonight · ${nsum(N)} of ${tot} new people</span></div>
<div class=qc data-a=qgo data-v=ladder><div class=e>🪜</div><h2>Approach Ladder</h2><p>10 reps a day. Level up when it feels boring.</p><div class=qbar><i style="width:${Math.min(100,c*10)}%"></i></div><span class=qpill style="background:#E3F1E7;color:#2f6b40">Level ${L.level} · ${c} of 10 today</span></div>
<div class=qc data-a=qgo data-v=torero><div class=e>🐂</div><h2>Torero Drills</h2><p>Warm-up, then 10 timed street drills.</p><span class=qpill style="background:#FDECEA;color:#DB6256">${ts}</span></div>`}
// ---------- ladder ----------
const LV=[['Simple Ask','Ask 10 people for directions or the time. Say thank you. Exit.','Get past the barrier of starting an interaction.'],['Origin Check','Ask for directions, notice how friendly they are, ask where they are from, then exit.','Hold a 2-stage interaction.'],['Interactive Guess','Ask for directions, then guess where they are from.','Add playful spontaneity and a little risk.'],['Opinion Share','Give a brief, genuine opinion about the area or venue.','Go from asking for information to offering a perspective.'],['Direct Compliment','Give a specific, non-creepy compliment about what they are wearing or doing.','Express appreciation and handle the response.']];
function walk(){const L=Q().ladder,w=T.walk;
 if(w&&w.run)return `<b>Approach immediately</b><div id=qtm class=qtm>0.0</div><p class=qd style="text-align:center">Open the first person you see.</p><button class="qb2 g" data-a=qapp>I approached</button>`;
 return `<b>Approach immediately</b><p class=qd>Walk into a venue, tap the button, then open the first person within 3 seconds.</p><button class=qb2 data-a=qwin>⏱ I just walked in</button>${w&&w.last?`<p class=qg>Last: ${w.last}s ${w.last<=3?'✓ under 3 seconds':''}</p>`:L.lat.length?`<p class=qg>Last: ${L.lat[0]}s</p>`:''}`}
function ladder(){const L=Q().ladder,d=td();if(L.date!==d){L.date=d;L.count=0}const lv=LV[L.level-1],done=L.doneDate===d;
 return `${back()}<h1>🪜 Approach Ladder</h1><p class=qs>10 reps a day. Move up only when it feels routine, easy or boring.</p>
<div class=qlv>${LV.map((x,i)=>`<span class="${i+1===L.level?'on':i+1<L.level?'pa':''}">${i+1}</span>`).join('')}</div>
<div class=card><b>Level ${L.level}: ${lv[0]}</b><p class=qd>${lv[1]}</p><p class=qg>Goal: ${lv[2]}</p></div>
<div class=card style="text-align:center"><div class=qcnt>${L.count}<small>/10</small></div><div class=qdots>${[...Array(10)].map((_,i)=>`<i class="${i<L.count?'on':''}"></i>`).join('')}</div>${done?'<div class=qok>✅ Done today · X earned</div>':''}<div class=qbtns><button class=qb data-a=qlm>−</button><button class="qb big2" data-a=qlp>+1 rep</button></div></div>
<div class=card id=qwalk>${walk()}</div>
<div style="display:flex;gap:8px"><button class=qs2 data-a=qup ${L.level>=5?'disabled':''}>Move up a level</button><button class=qs2 data-a=qdn ${L.level<=1?'disabled':''}>Back a level</button></div>
<button class="qs2 qcalm" data-a=qcalm>😮‍💨 Calm and breathe</button>`}
// ---------- torero ----------
const WU=[['Body tension release','Rotate your shoulders forward and back, roll your head shoulder to shoulder, scrunch and drop your shoulders, shake out legs, feet, hands and arms.'],['Face and voice','Open wide and project a low "Ah" from the diaphragm, rotate your jaw like chewing grass, scrunch your face then release.'],['Breathing','In through the nose for 2, out through the mouth for 3, until you feel centred.'],['Mirror smirk','Check for stray hair or teeth, then practise a closed-mouth smirk: raised mouth corners, raised eyebrows, twinkling eyes.'],['Sensory grounding','In a busy spot, close your eyes, listen to the city, imagine your feet set in concrete and push nervous energy down into the ground.'],['The rule','Maximum 2 minutes of hesitation between approaches. If you think, you sink.']];
const DR=[['Directional Ask','Ask anyone standing or ambling slowly for directions to a local non-chain coffee shop.','Skip fast walkers. Focus on starting the action, not on perfection.'],
['Targeted Directional','Ask a woman about your age for directions to a good non-chain coffee shop.','Playful smirk, a deeper and louder voice, slower speech.'],
['Compliment and Leave','"Excuse me, I know this is random, but I think you look great. Have a good day." Then walk away.','Aim to make her smile. Enter with the smirk and positive energy.'],
['Posture Check','"Excuse me, I know this is random, but I think you look great. Have a nice day."','Put your hands in your back pockets to pull the shoulders back, then take them out and keep the posture so you do not lean in.'],
['Specific Compliment','"Hey, I know this is unusual, but I just wanted to say you look beautiful. I love your [long hair / eyes]. Have a great day."','Pick a real detail you noticed. A 5-minute break and a check-in follow this drill.'],
['Mini-Tease','"Excuse me, I know this is random, but I think you look very nice. What I noticed about you was how dreamy you look. Have a nice day."','Low, slow voice, sparkle in the eyes, upright posture.'],
['Side-Step Stop','"Excuse me, I know this is random, but I think you look really nice. What I noticed about you was how focused you look. It\'s cute. Have a nice day."','Approach from the side or front at a comfortable distance so she can see you coming. Never step into her path.'],
['Job Guess','"I\'m guessing you\'re a spy about to save the world. Is that what you\'re doing right now?" Find out what she is doing (the topic), then leave.','The topic is material for improv. If drills 7 and 8 did not land, repeat them.'],
['Indoor Store Approach','"Sorry, excuse me... I noticed how focused you were on those [shoes / bananas]. I\'m guessing this is a life-or-death purchase, huh?"','Get her attention with your voice from a step away, no touching. Keep your volume up without leaning in.'],
['Topic Improv Riffing','Pull out the topic (for example, art student) and riff: "Ah, when I think of [X], I think of [Y]." For example: "When I think of art students, I think of throwing paint at canvases in basements."','Keep it fun, flirty and non-logical.']];
const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
function torero(){const t=Q().torero,s=t.step,bar=`<div class=tdots>${[...Array(12)].map((_,i)=>`<i class="${i<s?'pa':i===s?'on':''}"></i>`).join('')}</div>`;
 const tm=secs=>`<div class=card style="text-align:center"><div id=qtd class=qtm>${fmt(T.tm?Math.max(0,Math.ceil((T.tm.end-Date.now())/1000)):secs)}</div><button class="qb2 l" data-a=qts data-v=${secs}>${T.tm?'Restart timer':'Start timer'}</button></div>`;
 let b;
 if(s===0)b=`<h1>Warm-up</h1><p class=qs>Tick each one off. Drills unlock when all six are done.</p><div class=card>${WU.map((w,i)=>`<div class="chk ${t.warm[i]?'on':''}" data-a=qw data-v=${i}><i>${t.warm[i]?'✓':''}</i><div><b>${w[0]}</b><span>${w[1]}</span></div></div>`).join('')}</div><button class="qb2 g" data-a=qstart ${t.warm.every(Boolean)?'':'disabled style="opacity:.4"'}>Start drills</button>`;
 else if(s>10)b=`<h1>Debrief</h1><p class=qs>${t.sid?'Session saved. Add the finishing touches.':'Finish up.'}</p><div class=card><b>Reward yourself</b><div class=rw2>${[['🍺','Pint'],['☕','Coffee'],['🍰','Cake'],['','Nothing']].map(r=>`<button class="${t.rw===r[1]?'on':''}" data-a=qrw2 data-v="${r[1]}">${r[0]} ${r[1]}</button>`).join('')}</div></div>
<div class=card><b>Weasel voice</b><p class=qg>What excuses did you hear before approaching?</p><textarea id=qwz class=pl rows=3 style="margin:8px 0 0">${esc(t.wz||'')}</textarea></div>
<div class=card><b>Self-audit</b>${[['p','Posture'],['v','Voice speed'],['e','Eye contact'],['r','How they reacted']].map(a=>`<p class=qg style="margin-top:10px">${a[1]}</p><div class=rt>${[1,2,3,4,5].map(n=>`<button class="${t.au[a[0]]===n?'on':''}" data-a=qau data-v="${a[0]}:${n}">${n}</button>`).join('')}</div>`).join('')}</div>
<div class=card style="text-align:center"><b>This week</b><p class=qd>${wk()} of 3 sessions</p></div><button class="qb2 g" data-a=qfin>Finish session</button>`;
 else if(t.audit)b=`<h1>Mid-session audit</h1><p class=qs>Take a 5-minute coffee break.</p>${tm(300)}<div class=card><b>How did the first 5 go?</b><p class=qd>If the responses were mostly negative or you skipped drills, go back to Drill 1 for clean reps.</p></div><button class="qb2 g" data-a=qaud data-v=ok>Mostly fine, continue</button><button class="qb2 l" data-a=qaud data-v=back>Back to Drill 1</button>`;
 else{const d=DR[s-1];b=`<h1>Drill ${s} of 10</h1><p class=qs>${d[0]}</p>${tm(120)}<div class=card><b>What to do</b><div class=scr2>${d[1]}</div><b>Tips</b><p class=qd>${d[2]}</p><div class=rule>Clean rep rule: if she keeps walking or says no, smile, say "no worries, have a good one" and move on. That still counts.</div></div><button class="qb2 g" data-a=qdone>COMPLETE DRILL</button><button class="qb2 l" data-a=qend>End session early</button>`}
 return `${back()}${bar}${b}`}
function wk(){const n=new Date(),m=new Date(n.getFullYear(),n.getMonth(),n.getDate()-((n.getDay()+6)%7));return D.sessions.filter(x=>x.kind==='torero'&&x.date>=ld(m)).length}
function tsave(n){const t=Q().torero;if(n<5||!t.warm.every(Boolean))return;const note=`Torero session · Drill ${n}`;let s=D.sessions.find(x=>x.id===t.sid);
 if(s){s.notes=s.notes.replace(/^Torero session · Drill \d+/,note)}else{s=showup('torero','Torero',note);t.sid=s.id;cel('Torero session saved','X earned · Drill '+n)}save()}
// ---------- night ----------
const PAL=[['#1a2a55','#7DD3FC'],['#0f2b22','#6EE7B7'],['#35260a','#FFD27A'],['#331a3e','#F9A8D4'],['#12303a','#67E8F9'],['#2a1f4d','#C4B5FD']];
function night(){const N=Q().night,cf=N.cfg;if(edit)return nedit(N);
 const rows=cf.lv.map((l,i)=>{const r=N.ck[i],n=r[0]+r[1]+r[2],full=n===3,d=N.dr[i],c=PAL[i%6],
  rw=!full?'<div class="nc lk">🔒<br>Finish row</div>':d==='s'?`<div class="nc sk" data-a=qrw data-v=${i}>🍺 Saved<br>+${l.b}</div>`:d==='d'?`<div class="nc dk" data-a=qrw data-v=${i}>🍺 Drank<br>−${cf.pen}</div>`:`<div class="nc rd" data-a=qrw data-v=${i}>🍺 Pint<br>ready</div>`;
  return `<div class=nrw><div class=nt><span><span class=nlv style="background:${c[0]};color:${c[1]}">LVL ${i+1}</span>${esc(l.e)} ${esc(l.n)}</span><span style="color:#8b93b8;font-weight:600;font-size:12px">+${l.p} each · ${n}/3</span></div><div class=nop>“${esc(l.o)}”</div><div class=ncl>${r.map((v,j)=>v?`<div class=nc data-a=qck data-v="${i}:${j}" style="background:${c[1]};color:#06110c">✓</div>`:`<div class="nc o" data-a=qck data-v="${i}:${j}">${j+1}</div>`).join('')}${rw}</div></div>`}).join('');
 const sh=sheet!==null?`<div class=nbk data-a=qsh data-v=x></div><div class=nsh><div style="font-size:44px;line-height:1">🍺</div><div style="font-size:21px;font-weight:800;margin:8px 0 2px;color:#FFD27A">Level ${sheet+1} cleared</div><div style="color:#8b93b8;margin-bottom:6px">${cf.lv[sheet].n} done. The pint is yours to decide.</div><button class=qb2 style="background:#0f2b22;border-color:#34D399;color:#6EE7B7" data-a=qdr data-v="${sheet}:s">Save it +${cf.lv[sheet].b}</button><button class=qb2 style="background:#2a1216;border-color:#DB6256;color:#F28B82" data-a=qdr data-v="${sheet}:d">Drink it −${cf.pen}</button><button class=qb2 style="background:none;border:0;color:#565c8a" data-a=qsh data-v=x>Decide later</button></div>`:'';
 return `<div class=nq>${back()}<div class=r style="display:flex;justify-content:space-between;align-items:center"><span class=nneon>🌙 NIGHT GAME</span><span class=nbt data-a=qed>✏️ Edit</span></div><div class=ntag>Talk first. Pints second.</div>
<div class=nst><div><small>SCORE</small><b style="color:#FFD27A">${nscore(N)}</b></div><div><small>NEW PEOPLE</small><b style="color:#7DD3FC">${nsum(N)}<span style="font-size:17px;color:#565c8a">/${cf.lv.length*3}</span></b></div></div>${rows}<div style="text-align:center;margin-top:10px"><span class=nbt data-a=qnew>New night</span></div></div>${sh}`}
function nedit(N){const cf=N.cfg,sp=(k,v)=>`<div class=nsp><button data-a=qns data-v="${k}:-1">−</button><b>${v}</b><button data-a=qns data-v="${k}:1">+</button></div>`;
 return `<div class=nq>${back()}<div class=nneon>✏️ Edit game</div><div class=ntag>Rename levels, change the openers, set the points.</div>${cf.lv.map((l,i)=>`<div class=ned><div class=r style="display:flex;justify-content:space-between;margin-bottom:8px"><b style="color:#FFD27A">LVL ${i+1}</b>${cf.lv.length>1?`<span style="color:#565c8a;font-size:12px" data-a=qlr data-v=${i}>remove</span>`:''}</div>
<div style="display:flex;gap:8px;margin-bottom:8px"><input class=nin style="width:56px;text-align:center" data-q="${i}:e" value="${esc(l.e)}"><input class=nin data-q="${i}:n" value="${esc(l.n)}"></div><input class=nin style="margin-bottom:8px;font-style:italic" data-q="${i}:o" value="${esc(l.o)}">
<div class=r style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:12px;color:#8b93b8">Points per tile</span>${sp(i+':p',l.p)}</div><div class=r style="display:flex;justify-content:space-between"><span style="font-size:12px;color:#8b93b8">Bonus for saving the pint</span>${sp(i+':b',l.b)}</div></div>`).join('')}
<div class=ned style="text-align:center;color:#8b93b8;border-style:dashed" data-a=qla>+ Add level</div><div class=ned><div class=r style="display:flex;justify-content:space-between"><span style="font-size:13px">Drinking the pint costs</span>${sp('pen',cf.pen)}</div></div><button class=qb2 style="background:#FFD27A;color:#1a1200" data-a=qed>Done</button></div>`}
// ---------- hooks ----------
window.qDark=()=>sub==='night';
window.qHtml=()=>{Q();return `<div class=qp>${sub==='menu'?menu():sub==='ladder'?ladder():sub==='torero'?torero():night()}</div>`};
window.qMount=()=>{clearInterval(I.w);clearInterval(I.t);
 if(sub==='ladder'&&T.walk&&T.walk.run)I.w=setInterval(()=>{const e=document.getElementById('qtm');if(!e){clearInterval(I.w);return}const s=(Date.now()-T.walk.t0)/1000;e.textContent=s.toFixed(1);e.classList.toggle('late',s>3)},100);
 if(sub==='torero'&&T.tm)I.t=setInterval(()=>{const e=document.getElementById('qtd');if(!e){clearInterval(I.t);return}const r=Math.max(0,Math.ceil((T.tm.end-Date.now())/1000));e.textContent=fmt(r);e.classList.toggle('late',!r);if(!r){clearInterval(I.t);navigator.vibrate&&navigator.vibrate([200,100,200])}},250)};
const go=A.go;A.go=v=>{if(v==='q'){sub='menu';edit=false;sheet=null;T={}}go(v)};
document.addEventListener('input',e=>{if(e.target.id==='qwz'){Q().torero.wz=e.target.value;save();return}const k=e.target.dataset.q;if(!k)return;const [i,f]=k.split(':');Q().night.cfg.lv[i][f]=e.target.value;save()});
const R=()=>{save();render()};
Object.assign(A,{
 qgo(v){sub=v;edit=false;sheet=null;T={};render();scrollTo(0,0)},
 qlp(){const L=Q().ladder,d=td();L.count++;if(L.count>=10&&L.doneDate!==d){L.doneDate=d;showup('ladder','Ladder','Ladder session · Level '+L.level);R();cel('Ladder complete','Level '+L.level+' · X earned');return}R();navigator.vibrate&&navigator.vibrate(12)},
 qlm(){const L=Q().ladder;if(L.count>0)L.count--;R()},
 qup(){const L=Q().ladder;if(L.level<5&&confirm('Move up to Level '+(L.level+1)+'? Today\'s rep count restarts.')){L.level++;L.count=0;L.doneDate='';R()}},
 qdn(){const L=Q().ladder;if(L.level>1&&confirm('Go back to Level '+(L.level-1)+'? Today\'s rep count restarts.')){L.level--;L.count=0;L.doneDate='';R()}},
 qwin(){T.walk={run:1,t0:Date.now()};render()},
 qapp(){const L=Q().ladder,s=+((Date.now()-T.walk.t0)/1000).toFixed(1);L.lat.unshift(s);L.lat=L.lat.slice(0,20);T.walk={run:0,last:s};R()},
 qcalm(){if(BR)return;const o=document.createElement('div');o.id='qbr';o.innerHTML='<div class=bc><div class=bo id=qbo></div><div class=bt id=qbt>Breathe in</div></div><p id=qbg></p><button class=qb2 id=qbx>Done</button>';document.body.appendChild(o);
  const G=['Feel your feet on the floor.','Name 3 things you can see.','Drop your shoulders.','Unclench your jaw.'],P=[['Breathe in',4],['Hold',7],['Breathe out',8]],t0=Date.now();
  const f=()=>{const el=(Date.now()-t0)/1000,s=el%19,cy=Math.floor(el/19);let a=s,i=0;while(a>=P[i][1]){a-=P[i][1];i++}const sc=i===0?.55+.45*a/4:i===1?1:1-.45*a/8;document.getElementById('qbo').style.transform=`scale(${sc})`;document.getElementById('qbt').textContent=P[i][0]+' · '+Math.ceil(P[i][1]-a);document.getElementById('qbg').textContent=G[cy%4]};
  BR=setInterval(f,100);f();document.getElementById('qbx').onclick=()=>{clearInterval(BR);BR=null;o.remove()}},
 qw(i){const t=Q().torero;t.warm[i]=t.warm[i]?0:1;R()},
 qstart(){const t=Q().torero;if(!t.warm.every(Boolean))return;t.step=1;t.done=0;T={};R()},
 qts(v){T.tm={end:Date.now()+ +v*1000};render()},
 qdone(){const t=Q().torero,n=t.step;t.done=Math.max(t.done,n);T={};if(n===5){t.audit=1;t.step=6}else t.step=n+1;tsave(n);R();navigator.vibrate&&navigator.vibrate(15)},
 qaud(v){const t=Q().torero;t.audit=0;T={};if(v==='back'){t.step=1;t.done=0}R()},
 qend(){const t=Q().torero;if(confirm('End the session now?')){t.step=11;t.audit=0;T={};R()}},
 qrw2(v){const t=Q().torero;t.rw=t.rw===v?'':v;R()},
 qau(v){const t=Q().torero,[k,n]=v.split(':');t.au[k]=t.au[k]===+n?0:+n;R()},
 qfin(){const t=Q().torero,wz=t.wz||'',s=D.sessions.find(x=>x.id===t.sid),au=t.au;
  if(s){const x=[];if(t.rw)x.push('Reward: '+t.rw);if(wz.trim())x.push('Weasel voice: '+wz.trim());if(au.p||au.v||au.e||au.r)x.push(`Self-audit: posture ${au.p||'-'}, voice ${au.v||'-'}, eye contact ${au.e||'-'}, reactions ${au.r||'-'}`);if(x.length)s.notes+='\n'+x.join('\n')}
  D.quests.torero={step:0,warm:[0,0,0,0,0,0],done:0,sid:null,rw:'',wz:'',au:{p:0,v:0,e:0,r:0},audit:0};T={};sub='menu';R();toast(s?'Session finished':'Session ended')},
 qed(){edit=!edit;R()},
 qnew(){if(confirm('Start a new night? This clears the board.')){const N=Q().night;N.ck=[];N.dr=[];sheet=null;Q();R()}},
 qck(v){const N=Q().night,[i,j]=v.split(':').map(Number),r=N.ck[i];r[j]=r[j]?0:1;const n=r[0]+r[1]+r[2];if(n<3)N.dr[i]=null;else if(N.dr[i]===null)sheet=i;R()},
 qrw(i){sheet=+i;render()},qsh(){sheet=null;render()},
 qdr(v){const N=Q().night,[i,c]=v.split(':');N.dr[i]=c;sheet=null;R()},
 qns(v){const cf=Q().night.cfg,p=v.split(':');if(p[0]==='pen')cf.pen=Math.max(0,Math.min(10,cf.pen+ +p[1]));else{const l=cf.lv[p[0]];l[p[1]]=Math.max(0,Math.min(30,(+l[p[1]]||0)+ +p[2]))}R()},
 qla(){const N=Q().night;if(N.cfg.lv.length>=8)return toast('Eight levels is the maximum');N.cfg.lv.push({e:'⭐',n:'New level',o:'Your opener here',p:N.cfg.lv.length+1,b:N.cfg.lv.length+2});Q();R()},
 qlr(i){const N=Q().night;if(confirm('Remove this level?')){N.cfg.lv.splice(i,1);N.ck.splice(i,1);N.dr.splice(i,1);R()}}
});
})();
