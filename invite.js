'use strict';
const scene=document.querySelector('.hero-scene');
const canvas=document.getElementById('celebration');
const context=canvas.getContext('2d');
const motion=true;
let confettiFrame=0,framePending=false,pointerX=0,pointerY=0;
document.body.classList.add('motion-enabled');
document.documentElement.dataset.motion='on';
function celebrate(){if(!motion||!context)return;cancelAnimationFrame(confettiFrame);const width=innerWidth,height=innerHeight,ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;context.setTransform(ratio,0,0,ratio,0,0);const colors=['#0070ff','#22ebbb','#fbb135'];const particles=Array.from({length:35},()=>({x:width*.5,y:height*.4,vx:(Math.random()-.5)*14,vy:-5-Math.random()*9,r:Math.random()*Math.PI,vr:(Math.random()-.5)*.2,size:4+Math.random()*4,color:colors[Math.floor(Math.random()*colors.length)]}));let previous=0,elapsed=0;function draw(time){const step=previous?Math.min((time-previous)/16.67,2):1;elapsed+=previous?time-previous:0;previous=time;context.clearRect(0,0,width,height);particles.forEach(p=>{p.x+=p.vx*step;p.y+=p.vy*step;p.vy+=.25*step;p.r+=p.vr*step;context.save();context.globalAlpha=Math.max(0,Math.min(1,(1800-elapsed)/500));context.translate(p.x,p.y);context.rotate(p.r);context.fillStyle=p.color;context.fillRect(-p.size/2,-p.size/2,p.size,p.size*.55);context.restore();});if(elapsed<1800&&motion)confettiFrame=requestAnimationFrame(draw);else context.clearRect(0,0,width,height);}confettiFrame=requestAnimationFrame(draw);}
document.querySelector('.brand').addEventListener('click',celebrate);
document.querySelector('.rsvp-button').addEventListener('click',event=>{if(event.currentTarget.getAttribute('aria-disabled')==='true'){event.preventDefault();document.querySelector('.rsvp-status').focus({preventScroll:true});}});
function updateScene(){framePending=false;if(!motion)return;scene.style.setProperty('--mx',innerWidth>760?`${pointerX*6}px`:'0px');scene.style.setProperty('--my',innerWidth>760?`${pointerY*4}px`:'0px');}
function scheduleScene(){if(!framePending&&motion){framePending=true;requestAnimationFrame(updateScene);}}
document.querySelector('.compact-invite').addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;pointerX=(event.clientX/innerWidth-.5)*2;pointerY=(event.clientY/innerHeight-.5)*2;scheduleScene();});document.querySelector('.compact-invite').addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;scheduleScene();});window.addEventListener('resize',()=>{pointerX=0;pointerY=0;scheduleScene();},{passive:true});
