// Run with: node tests/combat-presentation.test.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'combat-presentation.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'combat-presentation.css'),'utf8');
new Function(source);
new Function(html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>')));
assert(css.includes('.v24battle #game{display:none}'));
assert(html.includes('window.__BriarfordCombatBridge=v24Bridge'));
class Element {
 constructor(tag='div'){this.tagName=tag;this.children=[];this.attributes={};this.style={display:''};this.disabled=false;this.id='';this.className='';this.textContent='';this._classes=new Set();
 this.classList={add:(...args)=>args.forEach(x=>this._classes.add(x)),remove:(...args)=>args.forEach(x=>this._classes.delete(x)),contains:x=>this._classes.has(x),toggle:x=>{if(this._classes.has(x)){this._classes.delete(x);return false;}this._classes.add(x);return true;}};
 }
 appendChild(n){this.children.push(n);return n}
 after(n){this.afterChild=n;return n}
 replaceChildren(...n){this.children=[...n]}
 setAttribute(k,v){this.attributes[k]=String(v)}
 getContext(){return context}
 contains(n){return true}
 focus(){}
 click(){if(!this.disabled)this.onclick?.()}
}
const nop=()=>{};
const context={clearRect:nop,fillRect:nop,ellipse:nop,fill:nop,beginPath:nop,moveTo:nop,lineTo:nop,closePath:nop,stroke:nop,arc:nop,save:nop,restore:nop,translate:nop,scale:nop,drawImage:nop,fillText:nop,createLinearGradient:()=>({addColorStop:nop})};
const ids=new Map();
function make(id){const o=new Element('button');o.id=id;ids.set(id,o);return o}
for(const id of ['game','event','battlebar','turnBtn','v17quick','attackBtn','v17heavy','v17aim','guardBtn','focusBtn','v18sense','v18breath','v08-pulse','healBtn','fleeBtn','saveBattleBtn'])make(id);
const app=new Element(),wrap=new Element(),head=new Element(),body=new Element(),frames=[];
const document={head,body,hidden:false,getElementById:id=>ids.get(id)||null,querySelector:s=>s==='.app'?app:s==='.canvas-wrap'?wrap:null,createElement:tag=>new Element(tag)};
const state={zone:'forest',created:true,x:19,y:17,hp:42,maxHp:42,stats:{STR:14,DEX:10,CON:13},flags:{v08:{stage:'sealed'},v06:{learned:{}},v03:{magic:{}}},combat:{kind:'wolf',hp:18,maxHp:18,ap:4,stamina:8,enemyX:20,enemyY:17}};
let callbacks=null,attacks=0,turns=0;
makeAction('v17quick',()=>{attacks++;state.combat.hp-=3;callbacks.onRefresh();});
makeAction('turnBtn',()=>{turns++;callbacks.onRefresh();});
function makeAction(id,fn){ids.get(id).onclick=fn}
const bridge={state:()=>state,pulseUnlocked:()=>false,saniaFrame:()=>0,saniaAtlas:()=>({naturalWidth:0}),wolfFrames:()=>[],action:()=>null,setCallbacks:x=>callbacks=x};
new Function('document','window','requestAnimationFrame','performance',source)(document,{__BriarfordCombatBridge:bridge},fn=>frames.push(fn),{now:()=>1000});
const panel=ids.get('event').afterChild,intro=body.children.find(x=>x.id==='v24intro');
const tabs=panel.children.find(x=>x.className==='v24tabs'),opts=panel.children.find(x=>x.className==='v24options'),bottom=panel.children.find(x=>x.className==='v24bottom');
assert.equal(tabs.children.length,5);assert.equal(opts.children.length,4);
assert(app.classList.contains('v24battle'));
opts.children[0].click();assert.equal(attacks,1);assert.equal(state.combat.hp,15);
tabs.children.find(x=>x.textContent==='Magic').click();
assert.equal(opts.children.length,1);assert.equal(opts.children[0].tagName,'p','Sealed magic must not expose spells');
tabs.children.find(x=>x.textContent==='Defense').click();assert.equal(opts.children.length,2);
bottom.children[0].click();assert.equal(turns,1);
bottom.children[1].click();assert(app.classList.contains('v24map'));
bottom.children[1].click();assert(!app.classList.contains('v24map'));
callbacks.onEncounter();assert(intro.classList.contains('open'));
intro.children[0].children.at(-1).click();assert(!intro.classList.contains('open'));
state.combat.kind='ward';state.zone='tower';state.flags.v08.stage='fractured';callbacks.onRefresh();
tabs.children.find(x=>x.textContent==='Magic').click();
assert(opts.children.some(x=>x.textContent.includes('Unsteady Pulse')));
for(const zone of ['forest','tower','village','region:hage','region:kikka','site:chapel']){
 state.zone=zone;
 assert.doesNotThrow(()=>frames[0](1100),'Scene must render zone '+zone);
}
state.combat=null;callbacks.onRefresh();assert(!app.classList.contains('v24battle'));
console.log('PASS: 5 categories, 1:1 original action dispatch, sealed/learned magic, intro, tactical map, 6 location scenes, leave combat.');
