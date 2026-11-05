// node tests/sania-frames.test.cjs
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const from=source.indexOf('function v23SaniaPowerVisible()'),to=source.indexOf('function v23Gallery(){',from);
assert(from!==-1&&to>from,'Sania gallery patch must exist');
const atlas={naturalWidth:512},base={naturalWidth:320};
const state={created:true,flags:{v08:{stage:'sealed'}}};
const skins=new Map([['Sania',{image:base}],['Yuno',{image:base}]]);
const d=['down','left','right','up'],starts={idle:[0,4,8,12],run:[16,24,32,40],attack:[48,52,56,60],cast:[64,68,72,76]};
const frame=(action,dir,elapsed)=>starts[action][d.indexOf(dir)]+Math.floor(elapsed/100)%(action==='run'?8:4);
const fns=new Function('state','V21_SANIA','V11_SKINS','v21Ready','v21Frame','v09FrameId',
 source.slice(from,to)+'return {v23SaniaPowerVisible,v23GalleryFrames,v23FrameInfo};')(state,atlas,skins,true,frame,()=>10);
assert.equal(fns.v23GalleryFrames('Sania').kind,'approved-64');
assert(!fns.v23GalleryFrames('Sania').actions.includes('cast'));
assert.equal(fns.v23FrameInfo('Sania','idle','down',0).sw,64);
assert.equal(fns.v23FrameInfo('Sania','run','up',0).sy,5*64);
assert.equal(fns.v23FrameInfo('Yuno','idle','down',0).sw,32);
state.flags.v08.stage='fractured';assert(fns.v23GalleryFrames('Sania').actions.includes('cast'));
assert.equal(fns.v23FrameInfo('Sania','cast','down',0).sy,8*64);
state.flags.v08.stage='steady';assert(fns.v23GalleryFrames('Sania').actions.includes('cast'));
state.flags.v08.stage=undefined;assert(!fns.v23GalleryFrames('Sania').actions.includes('cast'));
assert.equal(fns.v23GalleryFrames('Unknown').available,false);
console.log('PASS: 64px Sania atlas, 4-direction frame rows, distinct Yuno, secrecy gates.');
