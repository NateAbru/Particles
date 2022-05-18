import './index.css';
import {useEffect, useRef, useState} from 'react';
import Menu from './Components/Menu.jsx';
import FpsTracker from './Components/FpsTracker.jsx';
import {themes} from './ThemeData';

function App() {
  const canvasRef = useRef(null);
  const[numParticles, setNumParticles] = useState(15);
  const[fps, setFps] = useState(0);
  let mouseMoveRef = useRef({
    active:false,
    pos:{x:null,y:null}
  })
  let gradientRef = useRef({
    gradient:null//temp value
  })
  let fpsRef = useRef({
    fps:0,
    lastTime:performance.now(),
    frames:0
  })
  let clickRef = useRef({
    effect:'add'
  })
  let hoverRef = useRef({
    effect:'none'
  });
  let currentTheme = useRef({
    theme: themes.space
  });
  let isLinkingRef = useRef({
    value:true
  })
  const particlesList = [];
  function createParticles(x){  //function to create the list of particles
    for(let i = 1; i <= x; i++){
      const randX = Math.floor(Math.random() * window.innerWidth);
      const randY = Math.floor(Math.random() * window.innerHeight);
      let randVelx = ((Math.random() * 1) * 2 + .3);
      let randVely = ((Math.random() * 1) +.3);
      const randXDir = Math.floor((Math.random() * 2) + 1);
      const randYDir = Math.floor((Math.random() * 2) + 1);
      const randRadius = Math.floor((Math.random() * 10) + 1);
      if(randXDir === 1) randVelx = - randVelx; //random change of X direction
      if(randYDir === 1) randVely = - randVely; //random change of Y direction
      const particle = {  //particle object creation
        id : i,
        pos : {x:randX, y:randY},
        radius : randRadius,
        vely : randVely,
        velx : randVelx
      }
      particlesList.push(particle); //pushing next particle into list of particles
    }
  }
  createParticles(15);
  const draw = (ctx, canvas, theme)=>{
    const dpi = window.devicePixelRatio;
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    ctx.scale(dpi,dpi);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
      let gradient;
      if(theme.colorPreset) gradient = 'none';
      else gradient = gradientRef.current.gradient;
      let linkLen;
      if(window.innerWidth >= 680) linkLen = window.innerHeight;
      else linkLen = window.innerWidth;
      ctx.fillStyle = theme.background;
      ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
      particlesList.forEach((particle, index)=>{
        ctx.beginPath();
        ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI);
        (theme.colorPreset) ? ctx.fillStyle = theme.particles : ctx.fillStyle = gradient;
        ctx.fill();
        (theme.colorPreset) ? ctx.strokeStyle = theme.particles : ctx.strokeStyle = gradient;
        ctx.stroke();
        let len = particlesList.length;
        if(isLinkingRef.current.value){
          for(let j = index + 1; j < len;j++){ // loop to compare distance between particles
            let xPointDiff = particle.pos.x - particlesList[j].pos.x;
            let yPointDiff = particle.pos.y - particlesList[j].pos.y;
            let distance = Math.sqrt((xPointDiff * xPointDiff) + (yPointDiff * yPointDiff));
            if(distance <= (linkLen * .25)){
              let lineW = (1 - (distance / (linkLen * .25))); //value between 0 and 1 for line width depending on how far particles are. can be used for opacity too.
              ctx.beginPath();
              ctx.moveTo(particle.pos.x, particle.pos.y);
              ctx.lineTo(particlesList[j].pos.x, particlesList[j].pos.y);
              (theme.colorPreset) ? ctx.strokeStyle = theme.lines : ctx.strokeStyle = gradient;
              ctx.lineWidth = lineW;
              ctx.stroke();
            }
          }
        }
      });
  }
  const push = (e)=>{ //add particles to screen
    e.preventDefault();
    for(let i = 0; i < 3; i++){
      const X = e.offsetX;
      const Y = e.offsetY;
      let randVelx = ((Math.random() * 1) + .3);
      let randVely = ((Math.random() * 1) +.3);
      const randXDir = Math.floor((Math.random() * 2) + 1);
      const randYDir = Math.floor((Math.random() * 2) + 1);
      const randRadius = Math.floor((Math.random() * 10) + 1);
      if(randXDir === 1) randVelx = - randVelx; //random change of X direction
      if(randYDir === 1) randVely = - randVely; //random change of Y direction
      const particle = {  //particle object creation
        id : i,
        pos : {x:X, y:Y},
        radius : randRadius,
        vely : randVely,
        velx : randVelx
      }
      particlesList.push(particle);
    }
    setNumParticles(particlesList.length);
  }
  const grab = (canvas, ctx, theme)=>{ //grab nearby particles
    if(mouseMoveRef.current.active)
    {
      let gradient;
      if(theme.colorPreset) gradient = 'none';
      else gradient = gradientRef.current.gradient;
      let linkLen
      if(window.innerWidth >= 680) linkLen = window.innerHeight;
      else linkLen = window.innerWidth;
      let x = mouseMoveRef.current.pos.x;
      let y = mouseMoveRef.current.pos.y;
      particlesList.forEach((particle)=>{
        let xPointDiff = particle.pos.x - x;
        let yPointDiff = particle.pos.y - y;
        let distance = Math.sqrt((xPointDiff * xPointDiff) + (yPointDiff * yPointDiff));
        if(distance <= (linkLen * .6)){
          let lineW = (1 - (distance / (linkLen * .6))); //value between 0 and 1 for line width depending on how far particles are. can be used for opacity too.
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(particle.pos.x, particle.pos.y);
          (theme.colorPreset) ? ctx.strokeStyle = theme.particles : ctx.strokeStyle = gradient;
          ctx.lineWidth = lineW;
          ctx.stroke();
        }
      })
    }
  }
  const pop = ()=>{ //remove particles from screen
    for(let i = 0; i < 3; i++){
      particlesList.shift();
    }
    setNumParticles(particlesList.length);
  }
  const fpsFunc = ()=>{ //calculate fps of canvas painting
    let t = performance.now();
    let delta = t - fpsRef.current.lastTime;
    if(delta > 1000){
      fpsRef.current.fps = fpsRef.current.frames * 1000 / delta;
      fpsRef.current.frames = 0;
      fpsRef.current.lastTime = t;
    }
    fpsRef.current.frames++;
    setFps(Math.floor(fpsRef.current.fps));
  }
   useEffect(()=>{
    document.title = 'Particles';
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpi = window.devicePixelRatio;
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    ctx.scale(dpi,dpi);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    let grd = ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2,window.innerWidth/8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2);
    grd.addColorStop(0, 'rgba(255,0,0,.45)');//red
    grd.addColorStop(.2, 'rgba(255,231,0,.45)'); //yellow
    grd.addColorStop(.4, 'rgba(0,212,3,.45)');//green
    grd.addColorStop(.6, 'rgba(0,255,255,.45)');//cyan
    grd.addColorStop(.8, 'rgba(0,100,212,.45)');//blue
    grd.addColorStop(1, 'rgba(204,0,212,.45)');//magenta
    gradientRef.current.gradient = grd;
    const updateParticles = ()=>{
      particlesList.forEach((particle)=>{
        if(particle.pos.x + particle.velx > window.innerWidth || particle.pos.x + particle.velx < 0) particle.velx = -particle.velx;
        if(particle.pos.y + particle.vely > window.innerHeight || particle.pos.y + particle.vely < 0) particle.vely = -particle.vely;
        particle.pos.x += particle.velx;
        particle.pos.y += particle.vely;
      });
    }
    
    let animationID;
    const renderAnimation = ()=>{
      draw(ctx, canvas, currentTheme.current.theme);
      updateParticles();
      grab(canvas,ctx,currentTheme.current.theme);
      fpsFunc();
      animationID = requestAnimationFrame(renderAnimation);
    }
    renderAnimation();
    const resizeFunc = ()=>{
      const dpi = window.devicePixelRatio;
      canvas.width = window.innerWidth * dpi;
      canvas.height = window.innerHeight * dpi;
      ctx.scale(dpi,dpi);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      grd = ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2,window.innerWidth/8,window.innerWidth/2,window.innerHeight/2,window.innerWidth/2);
      grd.addColorStop(0, 'rgba(255,0,0,.45)');//red
      grd.addColorStop(.2, 'rgba(255,231,0,.45)'); //yellow
      grd.addColorStop(.4, 'rgba(0,212,3,.45)');//green
      grd.addColorStop(.6, 'rgba(0,255,255,.45)');//cyan
      grd.addColorStop(.8, 'rgba(0,100,212,.45)');//blue
      grd.addColorStop(1, 'rgba(204,0,212,.45)');//magenta
      gradientRef.current.gradient = grd;
    }
    const clickFunc = (e)=>{
      if(clickRef.current.effect === 'add') push(e);
      if(clickRef.current.effect === 'remove') pop();
    }
    const mouseMove = (e)=>{
      if(hoverRef.current.effect === 'grab'){
        mouseMoveRef.current.active = true;
        mouseMoveRef.current.pos.x = e.offsetX;
        mouseMoveRef.current.pos.y = e.offsetY;
      }
      else{
        mouseMoveRef.current.active = false;
      }
    }
    window.addEventListener('resize', resizeFunc);
    canvas.addEventListener('mousemove',mouseMove);
    canvas.addEventListener('click', clickFunc);
    return()=>{
      cancelAnimationFrame(animationID);
      window.removeEventListener('resize', resizeFunc);
      canvas.removeEventListener('mousemove',mouseMove);
      canvas.removeEventListener('click', clickFunc);
    }
  },[]);
  return (
    <>
      <canvas id='particles' ref={canvasRef}></canvas>
      <FpsTracker numParticles={numParticles} fps={fps}/>
      <Menu clickRef={clickRef} hoverRef={hoverRef} currentTheme={currentTheme} isLinkingRef={isLinkingRef}/>
    </>
  );
}

export default App;