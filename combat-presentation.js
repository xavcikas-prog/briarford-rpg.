/* Briarford v0.24 — mobile combat presentation, never replaces tactical simulation */
(()=>{'use strict';
const B=window.__BriarfordCombatBridge;if(!B)return;
const $=id=>document.getElementById(id),app=document.querySelector('.app'),wrap=document.querySelector('.canvas-wrap');
const stage=document.createElement('canvas');stage.id='v24arena';stage.width=480;stage.height=275;
stage.setAttribute('aria-label','Battle scene. Switch to Tactical Map to reposition.');wrap.appendChild(stage);
const panel=document.createElement('section');panel.id='v24hud';$('event').after(panel);
const bar=document.createElement('div');bar.className='v24health';panel.appendChild(bar);
const tabs=document.createElement('div');tabs.className='v24tabs';tabs.setAttribute('role','tablist');panel.appendChild(tabs);
const options=document.createElement('div');options.className='v24options';panel.appendChild(options);
const help=document.createElement('div');help.className='v24help';panel.appendChild(help);
const bottom=document.createElement('div');bottom.className='v24bottom';panel.appendChild(bottom);
const end=document.createElement('button');end.textContent='⏭ End Turn';end.onclick=()=>proxy('turnBtn');bottom.appendChild(end);
const mapButton=document.createElement('button');mapButton.textContent='▦ Tactical Map';bottom.appendChild(mapButton);
mapButton.onclick=()=>{app.classList.toggle('v24map');mapButton.textContent=app.classList.contains('v24map')?'◈ Battle Scene':'▦ Tactical Map';};
const intro=document.createElement('div');intro.id='v24intro';intro.setAttribute('role','dialog');intro.setAttribute('aria-modal','true');document.body.appendChild(intro);
const GROUPS={
 Attack:[['v17quick','Quick Strike · 1 AP'],['attackBtn','Standard Attack · 2 AP'],['v17heavy','Heavy Strike · 3 AP'],['v17aim','Aim · bonus']],
 Defense:[['guardBtn','Guard · 1 AP'],['focusBtn','Focus · bonus'],['v18sense','Mana Read · 1 AP'],['v18breath','Controlled Breath · bonus']],
 Magic:[['v08-pulse','Unsteady Pulse · 2 AP']],
 Items:[['healBtn','Healing Potion · bonus']],
 Tactics:[['fleeBtn','Retreat · 2 AP'],['saveBattleBtn','Save Game']]
};
let category='Attack',wasFighting=false,lastEnemy=null,lastPlayer=null;
const pops=[];
function enemy(c){return c?.kind==='ward'?'Living Ward':'Forest Wolf';}
function canPulse(c,s){return !!c&&c.kind==='ward'&&['fractured','steady'].includes(s?.flags?.v08?.stage);}
function proxy(id){const orig=$(id);if(!orig||orig.disabled||orig.style.display==='none')return false;orig.click();refresh();return true;}
for(const name of Object.keys(GROUPS)){
 const btn=document.createElement('button');btn.setAttribute('role','tab');btn.textContent=name;
 btn.setAttribute('aria-selected',String(name===category));
 btn.onclick=()=>{category=name;for(const node of tabs.children)node.setAttribute('aria-selected',String(node===btn));drawMenu();};
 tabs.appendChild(btn);
}
function drawMenu(){
 options.replaceChildren();const s=B.state(),c=s?.combat;if(!c)return;
 let entries=GROUPS[category].filter(([id])=>!!$(id));
 if(category==='Magic')entries=entries.filter(([id])=>id!=='v08-pulse'||canPulse(c,s));
 if(category==='Defense')entries=entries.filter(([id])=>id!=='v18sense'||s.flags?.v06?.learned?.sense||s.flags?.v03?.magic?.sense)
 .filter(([id])=>id!=='v18breath'||s.flags?.v06?.learned?.breath||s.flags?.v03?.magic?.breath);
 if(!entries.length){const note=document.createElement('p');note.textContent=category==='Magic'?'No spell can currently be cast against this enemy. Powers are discovered through gameplay.':'Nothing available in this category.';options.appendChild(note);}
 for(const [id,label] of entries){
  const original=$(id),btn=document.createElement('button');btn.textContent=label;btn.disabled=original.disabled||original.style.display==='none';
  btn.onclick=()=>proxy(id);options.appendChild(btn);
 }
 help.textContent=category==='Tactics'?'Use Tactical Map to reposition. Tile distance, AP and enemy movement stay authoritative.':
  category==='Magic'?'Unsteady Pulse can disrupt active magical defenses, not physical enemies.':
  category==='Attack'?'Your current weapon, stamina, range and accuracy determine the result.':'Existing AP, bonus actions and inventory rules apply.';
}
function refresh(){
 const s=B.state(),c=s?.combat;
 if(!c){app.classList.remove('v24battle','v24map');intro.classList.remove('open');wasFighting=false;lastEnemy=null;lastPlayer=null;return;}
 app.classList.add('v24battle');
 bar.textContent=enemy(c)+' '+c.hp+'/'+c.maxHp+' HP • Sania '+s.hp+'/'+s.maxHp+' HP • AP '+c.ap+'/4 • STA '+(c.stamina??8)+'/8';
 drawMenu();if(!wasFighting){lastEnemy=c.hp;lastPlayer=s.hp;wasFighting=true;}
}
function locationName(zone){
 if(zone==='forest')return 'Northern Forest';if(zone==='tower')return 'Abandoned Watchtower';if(zone==='village')return 'Briarford Village';
 if(zone==='region:hage')return 'Hage Village';if(zone==='region:kikka')return 'Kikka Streets';
 if(zone?.startsWith('region:'))return zone.slice(7);if(zone?.startsWith('inside:')||zone?.startsWith('site:'))return 'Building Interior';return 'Frontier Road';
}
function previewStat(box,label,ours,theirs){
 const row=document.createElement('div');row.className='stat';
 for(const text of [ours,label,theirs]){const cell=document.createElement('span');cell.textContent=String(text);row.appendChild(cell);}
 box.appendChild(row);
}
function showIntro(){
 const s=B.state(),c=s?.combat;if(!c)return;
 intro.replaceChildren();
 const card=document.createElement('div');card.className='v24introcard';intro.appendChild(card);
 const title=document.createElement('h2');title.textContent='Encounter · '+locationName(s.zone);card.appendChild(title);
 const line=document.createElement('div');line.className='vs';card.appendChild(line);
 for(const text of ['Sania','VS',enemy(c)]){const node=document.createElement(text==='VS'?'b':'span');node.textContent=text;line.appendChild(node);}
 previewStat(card,'HP',s.hp+'/'+s.maxHp,c.hp+'/'+c.maxHp);
 previewStat(card,'Strength',s.stats?.STR??'?','?');
 previewStat(card,'Speed / DEX',s.stats?.DEX??'?','?');
 previewStat(card,'Endurance / CON',s.stats?.CON??'?','?');
 previewStat(card,'Magic',B.pulseUnlocked()?'First pulse':'Sealed',c.kind==='ward'?'Active ward':'None seen');
 const explanation=document.createElement('p');explanation.textContent='Enemy attributes are not invented. This screen is a comparison, not a free attack. The battle still uses your current HP, abilities, equipment and tactical positions.';card.appendChild(explanation);
 const button=document.createElement('button');button.textContent='⚔ Enter Battle';
 button.onclick=()=>intro.classList.remove('open');card.appendChild(button);intro.classList.add('open');button.focus();
}
function onRefresh(){
 const s=B.state(),c=s?.combat;if(wasFighting&&c){
  if(lastEnemy!=null&&c.hp<lastEnemy)pops.push({x:345,value:'-'+(lastEnemy-c.hp),at:performance.now(),color:'#ffdfaa'});
  if(lastPlayer!=null&&s.hp<lastPlayer)pops.push({x:134,value:'-'+(lastPlayer-s.hp),at:performance.now(),color:'#ff999b'});
 }
 if(c){lastEnemy=c.hp;lastPlayer=s.hp;}refresh();
}
const ctx=stage.getContext('2d');
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}
function ellipse(x,y,rx,ry,c){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();}
function polygon(p,c){ctx.beginPath();ctx.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)ctx.lineTo(p[i],p[i+1]);ctx.closePath();ctx.fillStyle=c;ctx.fill();}
function line(x,y,xx,yy,c,w=2){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(xx,yy);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
function pine(x,y,s,back=false){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rect(-4,-85,9,85,'#443b34');for(let i=0;i<3;i++)polygon([0,-138+i*27,-34+i*4,-77+i*27,35-i*4,-77+i*27],back?(i%2?'#4f7361':'#3f6658'):(i%2?'#25493d':'#1c392e'));ctx.restore();}
function floor(kind){polygon([0,166,480,166,480,275,0,275],kind==='forest'?'#73624d':kind==='ruins'?'#6b6470':kind==='city'?'#847c79':'#aa8a65');for(let i=0;i<7;i++){const y=170+i*i*3;line(0,y,480,y,'#38312b88',1);}for(let j=-3;j<10;j++)line(240,165,30+j*53,275,'#3c362f50',1);}
function landscape(zone,t){
 const kind=zone==='forest'?'forest':zone==='tower'?'ruins':zone==='village'||zone==='region:hage'?'village':zone?.startsWith('inside:')||zone?.startsWith('site:')?'inside':zone?.startsWith('region:')?'city':'road';
 const sky=ctx.createLinearGradient(0,0,0,240);sky.addColorStop(0,kind==='ruins'?'#343b56':kind==='inside'?'#574439':'#4a8286');sky.addColorStop(1,kind==='ruins'?'#aa8c8f':'#ead0a4');rect(0,0,480,275,sky);ellipse(350,57,24,24,'#f1e5b171');
 for(let i=0;i<6;i++){const x=(i*103+Math.sin(t/15000+i)*13+550)%550-30,y=25+i%3*21;ellipse(x,y,36,12,'#ffffff22');ellipse(x+18,y-5,24,10,'#ffffff24');}
 if(kind==='forest'||kind==='road'){
  polygon([0,150,62,114,139,147,231,107,316,148,399,115,480,149,480,180,0,180],'#799884');
  polygon([0,161,80,137,175,157,275,133,362,154,480,128,480,184,0,184],'#477165');
  for(let i=0;i<11;i++)pine(i*49-20,177,.55+i%3*.15,true);floor(kind);
  for(let i=0;i<6;i++)pine(i%2?455+i*15:i*22-24,181,.85+i%3*.07);
 }else if(kind==='ruins'){
  for(let i=0;i<8;i++){const x=i*72-9,h=72+i%3*18;rect(x,163-h,27,h,'#817b83');rect(x-5,163-h,36,10,'#aaa1a1');for(let j=0;j<5;j++)line(x,166-h+j*16,x+26,166-h+j*16,'#534e5f',1);}
  floor(kind);
 }else if(kind==='inside'){
  rect(0,0,480,173,'#65503e');for(let x=0;x<480;x+=64){rect(x,0,10,173,'#44352c');line(x+5,0,x+5,173,'#9e7f5e',2);}rect(159,53,139,106,'#293b3c');rect(167,61,122,89,'#688b94');floor(kind);
 }else{
  for(let i=0;i<7;i++){const x=i*80-22,h=66+i%3*22;rect(x,165-h,74,h,kind==='city'?'#8d8390':'#bca07a');polygon([x-5,165-h,x+36,135-h,x+80,165-h],kind==='city'?'#4f5869':'#6b503b');rect(x+18,179-h,15,19,'#3b4c52');rect(x+49,184-h,14,22,'#70533b');}
  floor(kind);for(let x=0;x<480;x+=25){rect(x,174,5,22,'#62503a');line(x,181,x+25,181,'#4e3e32',2);}
 }
 const fog=ctx.createLinearGradient(0,100,0,188);fog.addColorStop(0,'#d5ded200');fog.addColorStop(1,'#d5ded222');rect(0,100,480,88,fog);
}
function renderSania(t){
 const image=B.saniaAtlas(),act=B.action('Sania'),current=act&&t<act.end?act.name:'idle';
 const kind=current==='cast'&&B.pulseUnlocked()?'cast':current==='attack'?'attack':'idle';
 const index=B.saniaFrame(kind,'right',act&&t<act.end?t-act.start:t);
 ellipse(129,224,44,9,'#07121288');
 if(image?.naturalWidth===512){ctx.imageSmoothingEnabled=false;ctx.drawImage(image,index%8*64,Math.floor(index/8)*64,64,64,81,68,98,151);ctx.imageSmoothingEnabled=true;}
 else{rect(109,109,41,108,'#314a3d');ellipse(130,94,21,22,'#a88b72');}
 if(current==='attack'){ctx.beginPath();ctx.arc(177,150,51,-1.15,.65);ctx.strokeStyle='#e9f2f7';ctx.lineWidth=4;ctx.stroke();}
 if(current==='cast'&&B.pulseUnlocked()){ctx.beginPath();ctx.ellipse(171,148,49,65,0,0,Math.PI*1.5);ctx.strokeStyle='#b4a0c9';ctx.lineWidth=4;ctx.stroke();}
}
function renderEnemy(t,c){
 const s=B.state(),d=Math.abs(s.x-c.enemyX)+Math.abs(s.y-c.enemyY),x=Math.max(239,Math.min(362,190+d*31));
 ellipse(x+36,224,52,11,'#10151a88');
 if(c.kind==='ward'){
  ctx.save();ctx.translate(x+34,158+Math.sin(t/270)*4);
  for(let i=0;i<8;i++){const a=i*2.3+t/900;ellipse(Math.sin(a)*31,Math.cos(a)*28,9,13,i%2?'#6c7b8c':'#414b57');}
  ellipse(0,-5,29,29,'#53656a');ellipse(-9,-10,5,5,c.shield?'#83f0e4':'#d8ad70');ellipse(10,-10,5,5,c.shield?'#83f0e4':'#d8ad70');
  if(c.shield){ctx.beginPath();ctx.arc(0,-5,49,0,Math.PI*2);ctx.strokeStyle='#a9dfe3';ctx.lineWidth=3;ctx.stroke();}
  ctx.restore();
 }else{
  const sprites=B.wolfFrames(),wolf=sprites?.[Math.floor(t/320)%2];
  if(wolf){ctx.save();ctx.translate(x+103,217);ctx.scale(-1,1);ctx.imageSmoothingEnabled=false;ctx.drawImage(wolf,0,0,36,30,0,-110,116,107);ctx.restore();ctx.imageSmoothingEnabled=true;}
  else{ellipse(x+40,178,52,28,'#647372');}
 }
 ctx.font='bold 13px system-ui';ctx.textAlign='center';ctx.fillStyle='#fff1d3';ctx.fillText(enemy(c),x+35,39);
 rect(x-7,45,93,9,'#663234');rect(x-7,45,93*Math.max(0,c.hp/c.maxHp),9,'#d38c75');
}
function tick(t){
 if(!document.body.contains(stage))return;
 const s=B.state(),c=s?.combat;
 if(c&&!app.classList.contains('v24map')&&!document.hidden){
  ctx.clearRect(0,0,480,275);landscape(s.zone,t);ctx.font='bold 12px system-ui';ctx.fillStyle='#f6dcb2';ctx.textAlign='left';ctx.fillText(locationName(s.zone).toUpperCase(),14,20);
  renderSania(t);renderEnemy(t,c);
  for(let i=pops.length-1;i>=0;i--){const p=pops[i],phase=(t-p.at)/850;if(phase>1){pops.splice(i,1);continue;}ctx.save();ctx.globalAlpha=1-phase;ctx.fillStyle=p.color;ctx.textAlign='center';ctx.font='bold 23px system-ui';ctx.fillText(p.value,p.x,116-phase*44);ctx.restore();}
 }
 requestAnimationFrame(tick);
}
B.setCallbacks({onRefresh,onEncounter:()=>{refresh();showIntro();}});
refresh();requestAnimationFrame(tick);
})();