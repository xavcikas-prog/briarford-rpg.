// IPH-BUG-01 reproducible regression test.
// Usage: node tests/wolf-visibility.test.cjs
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const page=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const begin=page.indexOf('/* IPH-BUG-01 / v0.23-step-1:');
const end=page.indexOf('const V03_ORIGINAL_INIT=init;',begin);
assert(begin!==-1&&end>begin,'Wolf patch must be present');
const fullScript=page.slice(page.indexOf('<script>')+8,page.lastIndexOf('</script>'));
new Function(fullScript); // ensure the entire built game parses

const records=[];
const ctx={
 save(){records.push({op:'save'});},
 restore(){records.push({op:'restore'});},
 fillRect(...args){records.push({op:'fillRect',args,fill:this.fillStyle});},
 strokeRect(...args){records.push({op:'strokeRect',args,stroke:this.strokeStyle});},
 drawImage(...args){records.push({op:'drawImage',args});},
 fillText(...args){records.push({op:'fillText',args});}
};
const document={
 createElement(tag){
  assert.equal(tag,'canvas');
  return {width:36,height:30,getContext:()=>ctx};
 }
};
const state={
 created:true,zone:'forest',x:19,y:17,
 camera:[10,8],enemy:{wolfAlive:true},combat:null
};
let baseDraws=0;
let reach=1;
const code=page.slice(begin,end);
const env=new Function('document','state','ctx','draw','performance','v17Reach',
 code+'\nreturn {draw,v23WolfTarget,V23_WOLF_FRAMES};'
)(
 document,state,ctx,()=>{baseDraws++},{now:()=>640},()=>reach
);
let tested=0;
function assertCase(label,fn){
 records.length=0;fn();tested++;
 console.log('  ✓ '+label);
}
function has(op){return records.some(r=>r.op===op)}
function textLabel(s){return records.some(r=>r.op==='fillText'&&r.args[0]===s)}
assertCase('two unique readable wolf frames',()=>{
 assert.equal(env.V23_WOLF_FRAMES.length,2);
 assert.notEqual(env.V23_WOLF_FRAMES[0],env.V23_WOLF_FRAMES[1]);
});
assertCase('exploration wolf visible; no battle-only HP bar',()=>{
 env.draw();assert(has('drawImage'));assert(!textLabel('WOLF'));assert.equal(baseDraws,1);
});
state.combat={kind:'wolf',enemyX:20,enemyY:17,hp:13,maxHp:18};
assertCase('battle draws wolf sprite and explicit WOLF label',()=>{
 env.draw();assert(has('drawImage'));assert(textLabel('WOLF'));
});
assertCase('health bar width matches enemy health',()=>{
 env.draw();
 assert(records.some(r=>r.op==='fillRect'&&r.args[2]===Math.round(32*13/18)&&r.args[3]===5));
});
assertCase('melee in-range tile is green',()=>{
 env.draw();
 assert(records.some(r=>r.op==='strokeRect'&&r.stroke==='#b5edaa'&&r.args[2]===14&&r.args[3]===14));
});
assertCase('melee out-of-range tile is amber',()=>{
 state.x=16;env.draw();
 assert(records.some(r=>r.op==='strokeRect'&&r.stroke==='#ffd086'&&r.args[2]===14&&r.args[3]===14));
 state.x=19;
});
assertCase('bow reach changes range cue correctly',()=>{
 reach=6;state.x=14;env.draw();
 assert(records.some(r=>r.op==='strokeRect'&&r.stroke==='#b5edaa'));
 reach=1;state.x=19;
});
assertCase('moving wolf updates overlay coordinates',()=>{
 env.draw();const a=records.find(r=>r.op==='drawImage').args.slice(1,3);
 records.length=0;state.combat.enemyX=21;env.draw();
 const b=records.find(r=>r.op==='drawImage').args.slice(1,3);
 assert.equal(b[0]-a[0],16);state.combat.enemyX=20;
});
assertCase('off-screen wolf gets screen-edge cue instead of invisible sprite',()=>{
 state.combat.enemyX=40;env.draw();
 assert(!has('drawImage'));assert(textLabel('WOLF'));state.combat.enemyX=20;
});
assertCase('dead wolf disappears from exploration',()=>{
 state.combat=null;state.enemy.wolfAlive=false;env.draw();
 assert(!has('drawImage'));assert(!textLabel('WOLF'));
});
assertCase('magical ward battle never uses wolf model',()=>{
 state.combat={kind:'ward',enemyX:20,enemyY:17,hp:10,maxHp:10};
 state.enemy.wolfAlive=true;env.draw();
 assert(!has('drawImage'));assert(!textLabel('WOLF'));
});
assertCase('village has no wolf overlay',()=>{
 state.zone='village';state.combat=null;env.draw();
 assert(!has('drawImage'));assert(!textLabel('WOLF'));
});
console.log('PASS '+tested+' wolf visibility tests (+ full-game JS syntax).');
