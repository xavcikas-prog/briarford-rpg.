/* Briarford experimental 3D viewport v0.22 — WebGL, no external library.
   Only used when ?view=3d. Existing 2D gameplay/state remains authoritative.
   Original rendering/interaction backed by the same 2D world tiles and NPC data.
*/
(()=>{'use strict';
const bridge=window.__briarford3d;
if(!bridge || !bridge.canvas) return;
const host=bridge.canvas.parentElement;
if(!host) return;
const canvas=document.createElement('canvas');canvas.id='briarford-3d';canvas.setAttribute('aria-label','Interactive three-dimensional Briarford world');
canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;background:#182522;cursor:crosshair;';
bridge.canvas.style.visibility='hidden';host.appendChild(canvas);
const gl=canvas.getContext('webgl',{antialias:true,alpha:false,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
const info=document.createElement('div');info.style.cssText='position:absolute;left:8px;top:8px;background:#13241ee5;color:#eddfc6;border:1px solid #8aa181;border-radius:8px;font:600 11px system-ui;padding:7px 9px;pointer-events:none;box-shadow:0 2px 9px #0008;z-index:3';info.textContent='3D EXPERIMENT · Drag to rotate · Tap to move';host.appendChild(info);
const toolbar=document.createElement('div');toolbar.style.cssText='position:absolute;right:7px;top:7px;display:flex;gap:4px;z-index:4';host.appendChild(toolbar);
const addTool=(label,callback,title)=>{const b=document.createElement('button');b.textContent=label;b.title=title||label;b.style.cssText='padding:3px 7px;border:1px solid #72917e;border-radius:7px;background:#213c33e8;color:#fff;font:700 12px system-ui;min-height:28px;min-width:30px;';b.addEventListener('click',e=>{e.stopPropagation();callback();});toolbar.appendChild(b);return b;};
let yaw=.67,pitch=.75,distance=17,camPos=[0,15,0],lookAt=[0,0,0],prevTime=0,lastClick=0;
addTool('−',()=>distance=Math.min(26,distance+2),'Zoom out');addTool('+',()=>distance=Math.max(9,distance-2),'Zoom in');
addTool('⟳',()=>{yaw=.67;pitch=.75;distance=17;},'Reset camera');
addTool('2D',()=>{window.location.href='./';},'Return to unchanged 2D game');
const labelLayer=document.createElement('div');labelLayer.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:2';host.appendChild(labelLayer);
const message=document.createElement('div');message.style.cssText='position:absolute;left:6px;right:6px;bottom:8px;text-align:center;font:11px system-ui;color:#f2e9d8;text-shadow:0 1px 4px #000;background:#0b1c1bc9;border:1px solid #46624e;border-radius:7px;padding:4px 8px;pointer-events:none;z-index:3';message.textContent='Tap ground / characters · Drag camera · All RPG menus work below';host.appendChild(message);
const names=new Map();let lastZone='';
function setStatus(t){message.textContent=t;}
if(!gl){bridge.canvas.style.visibility='visible';canvas.style.display='none';info.textContent='3D unavailable (WebGL unsupported)';setStatus('Your browser cannot start WebGL. The usual 2D map is still available.');return;}
function compile(type,src){const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){throw Error(gl.getShaderInfoLog(sh));}return sh;}
let shader;
try{
shader=gl.createProgram();gl.attachShader(shader,compile(gl.VERTEX_SHADER,`attribute vec3 aPosition;attribute vec3 aNormal;attribute vec3 aColor;uniform mat4 uMatrix;uniform vec3 uSun;varying vec3 vColor;varying float vFog;void main(){vec4 p=uMatrix*vec4(aPosition,1.0);gl_Position=p;float lit=0.53+max(0.0,dot(normalize(aNormal),normalize(uSun)))*0.53;vColor=aColor*lit;vFog=clamp((p.w-8.0)/34.0,0.0,0.73);}`));
gl.attachShader(shader,compile(gl.FRAGMENT_SHADER,`precision mediump float;varying vec3 vColor;varying float vFog;uniform vec3 uFog;void main(){gl_FragColor=vec4(mix(vColor,uFog,vFog),1.0);}`));
gl.linkProgram(shader);if(!gl.getProgramParameter(shader,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(shader));
}catch(e){bridge.canvas.style.visibility='visible';canvas.style.display='none';info.textContent='3D renderer failed';setStatus('WebGL shader failed: '+e.message);return;}
gl.useProgram(shader);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
const loc={p:gl.getAttribLocation(shader,'aPosition'),n:gl.getAttribLocation(shader,'aNormal'),c:gl.getAttribLocation(shader,'aColor'),m:gl.getUniformLocation(shader,'uMatrix'),sun:gl.getUniformLocation(shader,'uSun'),fog:gl.getUniformLocation(shader,'uFog')};
for(const slot of [loc.p,loc.n,loc.c])gl.enableVertexAttribArray(slot);
const staticBuffer=gl.createBuffer(),dynamicBuffer=gl.createBuffer();let staticCount=0,staticZone='',staticPX=-999,staticPZ=-999;let lastStatic=0;
const rgbCache=new Map();
function color(s){if(Array.isArray(s))return s;if(rgbCache.has(s))return rgbCache.get(s);const x=(s||'#557364').replace('#','');const c=x.length===6?[parseInt(x.slice(0,2),16)/255,parseInt(x.slice(2,4),16)/255,parseInt(x.slice(4,6),16)/255]:[.5,.7,.5];rgbCache.set(s,c);return c;}
function tint(src,mult=1){return src.map(n=>Math.max(0,Math.min(1,n*mult)));}
function hash(x,y,seed=712){let k=Math.imul(x+seed,374761393)+Math.imul(y+41,668265263);k=Math.imul(k^(k>>>13),1274126177);return ((k^(k>>>16))>>>0)/4294967296;}
class Mesh{
 constructor(){this.data=[];}
 tri(a,b,c,col){const n=this.normal(a,b,c),rgb=color(col);for(const v of [a,b,c])this.data.push(v[0],v[1],v[2],...n,...rgb);}
 normal(a,b,c){const u=b.map((v,i)=>v-a[i]),v=c.map((q,i)=>q-a[i]);const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const d=Math.hypot(...n)||1;return n.map(z=>z/d);}
 quad(a,b,c,d,col){this.tri(a,b,c,col);this.tri(a,c,d,col);}
 box(x,y,z,wx,hy,wz,col,roof){const hx=wx/2,hz=wz/2,y0=y,y1=y+hy;const a=[x-hx,y0,z-hz],b=[x+hx,y0,z-hz],c=[x+hx,y0,z+hz],d=[x-hx,y0,z+hz],e=[x-hx,y1,z-hz],f=[x+hx,y1,z-hz],g=[x+hx,y1,z+hz],h=[x-hx,y1,z+hz];
 this.quad(e,f,g,h,roof||col);this.quad(a,e,f,b,col);this.quad(b,f,g,c,tint(color(col),.82));this.quad(c,g,h,d,col);this.quad(d,h,e,a,tint(color(col),.85));
 }
 pyramid(x,y,z,r,height,col,n=5){const bottom=[];for(let j=0;j<n;j++){const t=j/n*Math.PI*2;bottom.push([x+Math.cos(t)*r,y,z+Math.sin(t)*r]);}const top=[x,y+height,z];for(let j=0;j<n;j++){this.tri(bottom[j],top,bottom[(j+1)%n],tint(color(col),.9+j*.035));}}
 roof(x0,x1,z0,z1,y,height,col){const mid=(z0+z1)/2;const a=[x0,y,z0],b=[x1,y,z0],c=[x0,y,z1],d=[x1,y,z1],e=[x0,y+height,mid],f=[x1,y+height,mid];this.quad(a,b,f,e,tint(color(col),.95));this.quad(c,e,f,d,tint(color(col),.80));this.tri(a,e,c,tint(color(col),.68));this.tri(b,d,f,tint(color(col),.72));}
 get array(){return new Float32Array(this.data);}
}
function upload(buf,m){const a=m.array;gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,a,gl.STATIC_DRAW);return a.length/9;}
function drawBuffer(buf,count){if(!count)return;gl.bindBuffer(gl.ARRAY_BUFFER,buf);for(const [i,offset]of [[loc.p,0],[loc.n,12],[loc.c,24]])gl.vertexAttribPointer(i,3,gl.FLOAT,false,36,offset);gl.drawArrays(gl.TRIANGLES,0,count);}
function matMul(a,b){const out=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)out[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return out;}
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),o=new Float32Array(16);o[0]=f/aspect;o[5]=f;o[10]=(far+near)/(near-far);o[11]=-1;o[14]=2*far*near/(near-far);return o;}
function norm(v){const d=Math.hypot(...v)||1;return v.map(n=>n/d);}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function look(eye,center){const f=norm(center.map((n,i)=>n-eye[i])),side=norm(cross(f,[0,1,0])),up=cross(side,f),o=new Float32Array(16);o.set([side[0],up[0],-f[0],0,side[1],up[1],-f[1],0,side[2],up[2],-f[2],0,-side.reduce((s,a,i)=>s+a*eye[i],0),-up.reduce((s,a,i)=>s+a*eye[i],0),f.reduce((s,a,i)=>s+a*eye[i],0),1]);return o;}
function project(x,y,z,matrix,w,h){const a=matrix,q=[x,y,z,1],v=[0,0,0,0];for(let r=0;r<4;r++)for(let c=0;c<4;c++)v[r]+=a[c*4+r]*q[c];if(v[3]<=.05)return null;return {x:(v[0]/v[3]+1)*w/2,y:(1-v[1]/v[3])*h/2,depth:v[3]};}
function ray(x,y,rect){const u=((x-rect.left)/rect.width)*2-1,v=1-((y-rect.top)/rect.height)*2;const forward=norm(lookAt.map((n,i)=>n-camPos[i]));const right=norm(cross(forward,[0,1,0])),up=cross(right,forward);const tangent=Math.tan(56*Math.PI/360),aspect=rect.width/rect.height;const d=norm(forward.map((n,i)=>n+u*right[i]*tangent*aspect+v*up[i]*tangent));if(d[1]>-.005)return null;const t=-camPos[1]/d[1];if(t<=0)return null;return {x:camPos[0]+d[0]*t,z:camPos[2]+d[2]*t};}
function tree(mesh,x,z,h){const shade=hash(x,z,74),height=1.2+h*.65,leaf=shade>.55?'#416a49':'#2f5e42';mesh.box(x,0,z,.22,height*.7,.22,'#69523c');mesh.pyramid(x,height*.47,z,.67,height*.80,leaf,6);mesh.pyramid(x,height*.76,z,.52,height*.64,tint(color(leaf),1.10),6);}
function rock(mesh,x,z,h){mesh.box(x,.07,z,.3+h*.25,.23,.36,'#858b7e');}
function hut(mesh,b){const w=b.maxX-b.minX+1,d=b.maxZ-b.minZ+1,x=(b.minX+b.maxX)/2,z=(b.minZ+b.maxZ)/2;
 mesh.box(x,0,z,w-.1,2.0,d-.1,'#af9472','#c1a787');mesh.roof(b.minX-.48,b.maxX+.48,b.minZ-.62,b.maxZ+.62,2.0,1.12,'#66534e');
 const door=b.door||[Math.round(x),b.maxZ];const dz=door[1]>z?b.maxZ+.50:b.minZ-.50;
 mesh.box(door[0],.01,dz,.80,1.44,.08,'#4b3428');mesh.box(door[0]+.25,.82,dz+.055,.08,.08,.08,'#d3ae71');
 for(const wx of [b.minX+.8,b.maxX-.8])if(Math.abs(wx-door[0])>.5){mesh.box(wx,1.12,b.maxZ+.50,.55,.48,.09,'#677f7e');mesh.box(wx,1.12,b.maxZ+.55,.05,.56,.06,'#d4c49c');}
}
function houseGroups(map){const result=[],seen=new Set(),height=map.length,width=map[0]?.length||0;
 for(let z=0;z<height;z++)for(let x=0;x<width;x++){
 const key=x+','+z;if(seen.has(key)||!['house','door'].includes(map[z][x]))continue;
 const queue=[[x,z]],group={minX:x,maxX:x,minZ:z,maxZ:z,door:null};seen.add(key);
 for(let i=0;i<queue.length;i++){const [u,v]=queue[i];group.minX=Math.min(group.minX,u);group.maxX=Math.max(group.maxX,u);group.minZ=Math.min(group.minZ,v);group.maxZ=Math.max(group.maxZ,v);if(map[v][u]==='door')group.door=[u,v];for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=u+dx,zz=v+dz,k=xx+','+zz;if(xx<0||zz<0||xx>=width||zz>=height||seen.has(k)||!['house','door'].includes(map[zz][xx]))continue;seen.add(k);queue.push([xx,zz]);}}
 result.push(group);
 }return result;
}
function material(tile){switch(tile){case 'road':return '#988368';case 'square':return '#a69a7e';case 'path':return '#83755b';case 'bridge':return '#c2a77a';case 'water':return '#3c8b9e';case 'farm':return '#756d40';case 'floor':return '#8e7861';case 'wall':return '#514c47';case 'furniture':return '#847158';case 'exit':return '#b89b68';case 'void':return '#1d2724';case 'brush':return '#446848';default:return '#52714a';}}
function rebuild(map,player,zone,now){const mesh=new Mesh(),range=17;const x0=Math.max(0,Math.floor(player.x)-range),z0=Math.max(0,Math.floor(player.y)-range),x1=Math.min(map[0].length-1,Math.floor(player.x)+range),z1=Math.min(map.length-1,Math.floor(player.y)+range);
 for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){
  const tile=map[z]?.[x]||'void',h=hash(x,z),base=color(material(tile));const ground=tile==='water'?-.18:tile==='wall'?0:-.06;
  if(tile==='void')continue;
  mesh.box(x,ground-.12,z,1.01,.13,1.01,tint(base,(h-.5)*.08+.95));
  if(tile==='trees'){if(h>.09)tree(mesh,x+(h-.5)*.3,z+(hash(z,x)-.5)*.3,h);}
  else if(tile==='water'){if(h>.75)mesh.box(x-.15,-.04,z-.20,.29,.017,.034,'#9fd2d5');}
  else if(tile==='brush'){mesh.pyramid(x,.01,z,.30,.40,'#386b48',5);}
  else if(tile==='farm'){for(let j=0;j<3;j++){const a=(j-1)*.2;mesh.box(x+a,.02,z+.12,.055,.28,.055,'#86a352');mesh.box(x+a,.22,z+.12,.20,.08,.09,'#94bb5e');}}
  else if(tile==='road'||tile==='square'){if(h>.82)mesh.box(x+.15,-.012,z-.2,.3,.014,.23,'#b3a48b');}
  else if(tile==='wall')mesh.box(x,0,z,.92,2.0,.92,'#66594d');
  else if(tile==='furniture')mesh.box(x,0,z,.8,.65,.70,'#785e44');
  else if(tile==='well'){mesh.box(x,0,z,.9,.65,.9,'#a09276');mesh.box(x,.66,z,.65,.07,.60,'#3c6464');}
  else if(tile==='door'){} // Door is part of full grouped 3D building.
  if((tile==='grass'||tile==='road')&&h>.982)rock(mesh,x-.2,z+.15,h);
 }
 if(!zone.startsWith('inside:')&&!zone.startsWith('site:')){
  for(const b of houseGroups(map))if(b.maxX>=x0-3&&b.minX<=x1+3&&b.maxZ>=z0-3&&b.minZ<=z1+3)hut(mesh,b);
 }
 staticCount=upload(staticBuffer,mesh);staticZone=zone;staticPX=Math.floor(player.x/3);staticPZ=Math.floor(player.y/3);lastStatic=now;
}
const positions=new Map(),labels=new Map();
function smooth(n,x,z,now,kind){const old=positions.get(n);if(!old||old.zone!==bridge.zone()||Math.hypot(old.goalX-x,old.goalZ-z)>3){const p={x,z,goalX:x,goalZ:z,zone:bridge.zone(),last:now,moving:false};positions.set(n,p);return p;}old.goalX=x;old.goalZ=z;const dt=Math.min(100,now-old.last);old.last=now;const alpha=Math.min(1,dt/(kind==='player'?93:250));const delta=Math.hypot(old.goalX-old.x,old.goalZ-old.z);old.moving=delta>.015;old.x+=(old.goalX-old.x)*alpha;old.z+=(old.goalZ-old.z)*alpha;return old;}
function person(mesh,p,name,isPlayer,time){const c=bridge.actor(name)||{},coat=c.cloth||c.color?.[2]||'#5a7461',hair=c.hair||c.color?.[0]||'#574438',skin=c.skin||c.color?.[1]||'#d0ad91';const isYami=/Yami/.test(name),isAsta=name==='Asta';const height=isYami?1.35:isAsta?.95:1.15;const legCycle=p.moving?Math.sin(time*.013+(isPlayer?0:p.x))*.22:0;const x=p.x,z=p.z;
 mesh.box(x,.01,z,.72,.025,.58,'#304839');
 mesh.box(x-.15,.08,z+legCycle*.12,.23,.43,.26,'#2d3338');mesh.box(x+.15,.08,z-legCycle*.12,.23,.43,.26,'#353d43');
 mesh.box(x,.50,z,.62,height*.48,.40,coat);
 mesh.box(x,.80,z-.24,.66,height*.57,.10,c.cape?'#3f4a48':coat);
 mesh.box(x-.42,.52+legCycle*.4,z,.22,.42,.24,coat);mesh.box(x+.42,.52-legCycle*.4,z,.22,.42,.24,coat);
 mesh.box(x,1.10*height,z,.42,.35,.40,skin);
 mesh.box(x,1.10*height+.27,z,.50,.20,.46,hair);
 if(name==='Sania'){mesh.box(x-.1,.67,z-.29,.15,.15,.08,'#bea675');mesh.box(x+.50,.46,z,.065,.72,.09,'#cdd6cf');mesh.box(x+.49,.40,z,.25,.08,.2,'#796644');}
 if(name==='Asta'){mesh.box(x,.98*height+.39,z,.58,.14,.56,'#cbd4d3');mesh.box(x+.57,.35,z,.2,.85,.20,'#77807f');}
 if(name==='Yuno'){mesh.box(x,.60,z-.30,.78,.42,.12,'#3d2b47');}
 if(isYami){mesh.box(x+.61,.47,z,.12,.94,.12,'#a8b4ba');}
}
function wolf(mesh,x,z){mesh.box(x,.15,z,.75,.54,.45,'#887c66');mesh.box(x+.32,.43,z,.38,.36,.37,'#aea083');mesh.pyramid(x+.32,.77,z+.17,.16,.23,'#aa9a80',4);mesh.pyramid(x+.32,.77,z-.17,.16,.23,'#aa9a80',4);for(const dx of [-.26,.28])for(const dz of [-.12,.12])mesh.box(x+dx,.02,z+dz,.10,.30,.13,'#5e5246');}
function buildActors(actors,player,time){const mesh=new Mesh();person(mesh,player,'Sania',true,time);for(const actor of actors){const p=smooth(actor.name,actor.x,actor.y,time,'npc');person(mesh,p,actor.name,false,time);}const e=bridge.enemy();if(e){wolf(mesh,e.x,e.y);}return mesh;}
function paintLabels(actors,m,w,h,player){if(bridge.isModal()){labelLayer.style.display='none';return;}labelLayer.style.display='block';const visible=new Set();for(const a of actors){const dx=a.x-player.x,dy=a.y-player.y;if(dx*dx+dy*dy>105)continue;const pos=project(a.x,1.65,a.y,m,w,h);if(!pos||pos.x<0||pos.x>w||pos.y<15||pos.y>h)continue;visible.add(a.name);let el=labels.get(a.name);if(!el){el=document.createElement('div');el.style.cssText='position:absolute;transform:translate(-50%,-50%);white-space:nowrap;background:#1b3024d9;border:1px solid #86a17c;border-radius:6px;padding:2px 5px;font:600 11px system-ui;color:#f0e6cb;text-shadow:0 1px 2px #000;pointer-events:none;';el.textContent=a.name;labelLayer.appendChild(el);labels.set(a.name,el);}el.style.left=pos.x+'px';el.style.top=pos.y+'px';}
 for(const [name,el] of labels)if(!visible.has(name)){el.remove();labels.delete(name);}}
function resize(){const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.8),w=Math.max(1,Math.round(rect.width*dpr)),h=Math.max(1,Math.round(rect.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}}
let lastView=null;
function render(now){window.requestAnimationFrame(render);if(document.hidden)return;if(now-prevTime<24)return;prevTime=now;const state=bridge.player();if(!state?.created){return;}resize();const map=bridge.map();if(!map?.length)return;
 const zone=bridge.zone();if(zone!==lastZone){staticZone='';positions.clear();for(const el of labels.values())el.remove();labels.clear();lastZone=zone;}
 const player=smooth('Sania',state.x,state.y,now,'player');const actors=bridge.npcs();
 if(staticZone!==zone||staticPX!==Math.floor(player.x/3)||staticPZ!==Math.floor(player.z/3)||now-lastStatic>45000)rebuild(map,state,zone,now);
 const fac=Math.min(1,(now-(lastView?.time||now))/160),ease=Math.max(.12,fac);
 const eye=[player.x+Math.sin(yaw)*distance*Math.cos(pitch),Math.sin(pitch)*distance,player.z+Math.cos(yaw)*distance*Math.cos(pitch)];const focus=[player.x,.12,player.z];
 for(let i=0;i<3;i++){camPos[i]+=(eye[i]-camPos[i])*ease;lookAt[i]+=(focus[i]-lookAt[i])*ease;}
 lastView={time:now};const night=state.minute<380||state.minute>=1180;const fog=night?[.08,.12,.17]:[.19,.30,.26];const sun=night?[.35,.5,.65]:[.5,1.0,.42];gl.clearColor(...fog,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 const matrix=matMul(perspective(56*Math.PI/180,canvas.width/canvas.height,.1,90),look(camPos,lookAt));gl.uniformMatrix4fv(loc.m,false,matrix);gl.uniform3f(loc.sun,...sun);gl.uniform3f(loc.fog,...fog);
 drawBuffer(staticBuffer,staticCount);
 const dynamic=buildActors(actors,player,now);const dynamicCount=upload(dynamicBuffer,dynamic);drawBuffer(dynamicBuffer,dynamicCount);
 paintLabels(actors,matrix,canvas.clientWidth,canvas.clientHeight,player);
 info.textContent=`3D TEST · ${state.zone==='village'?'Briarford':zone.replace('region:','').replace('site:','')} · Day ${state.day}`;
}
let drag=null;
canvas.addEventListener('pointerdown',e=>{if(e.button&&e.button!==0)return;drag={x:e.clientX,y:e.clientY,prevX:e.clientX,prevY:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);},{passive:false});
canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.prevX,dy=e.clientY-drag.prevY;drag.prevX=e.clientX;drag.prevY=e.clientY;
 if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>8)drag.moved=true;
 if(drag.moved){yaw-=dx*.009;pitch=Math.max(.38,Math.min(1.19,pitch+dy*.008));}}, {passive:false});
canvas.addEventListener('pointerup',e=>{if(!drag)return;const moved=drag.moved;drag=null;if(moved||bridge.isModal())return;const hit=ray(e.clientX,e.clientY,canvas.getBoundingClientRect());if(!hit)return;let tx=Math.round(hit.x),ty=Math.round(hit.z);const p=bridge.player();const actors=bridge.npcs();
 const nearActor=actors.find(a=>Math.hypot(a.x-hit.x,a.y-hit.z)<.7);if(nearActor){tx=nearActor.x;ty=nearActor.y;}
 const map=bridge.map(),tile=map?.[ty]?.[tx];if(tile==='house'){
  let best=null,dist=1e9;for(let y=Math.max(0,ty-8);y<=Math.min(map.length-1,ty+8);y++)for(let x=Math.max(0,tx-8);x<Math.min(map[0].length,tx+9);x++)if(map[y][x]==='door'){const d=Math.abs(x-tx)+Math.abs(y-ty);if(d<dist){dist=d;best=[x,y]}}if(best){tx=best[0];ty=best[1];}
 }
 if(tx<0||ty<0||tx>=map[0].length||ty>=map.length)return;
 if(Math.hypot(tx-p.x,ty-p.y)>20)return setStatus('That is too far away. Move closer first.');
 bridge.tap(tx,ty);setStatus('Move / interact: '+tx+', '+ty+' · Drag to rotate camera');lastClick=performance.now();
},{passive:false});
canvas.addEventListener('pointercancel',()=>{drag=null;});
window.__Briarford3DTest={renderer:gl,canvas,bridge,setView:(newYaw,newPitch)=>{yaw=newYaw;pitch=newPitch},getView:()=>({yaw,pitch,distance}),debug:()=>({staticVertices:staticCount,scene:bridge.zone(),lastZone})};
requestAnimationFrame(render);
})();