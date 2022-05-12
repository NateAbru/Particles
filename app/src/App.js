import './index.css';
import {useEffect, useRef, useState} from 'react';
import Menu from './Components/Menu.jsx';
import FpsTracker from './Components/FpsTracker.jsx';

function App() {
  const canvasRef = useRef(null);
  const [numParticles, setNumParticles] = useState(15);
  const [fps, setFps] = useState(0);
  let gradientRef = useRef({
    gradient:null//temp value
  })
  let fpsRef = useRef({
    fps:0,
    lastTime:performance.now(),
    frames:0
  })
  let themeRef = useRef({
    space:{
      colorPreset:true,
      background:'rgb(0,0,0)',
      particles:'rgb(255,255,255)',

    },
    crimson:{
      colorPreset:true,
      background:'rgb(239,28,28)',
      particles:'rgb(180,180,180)',
    },
    monochrome:{
      colorPreset:true,
      background:'rgb(255,255,255)',
      particles:'rgb(0,0,0)',
    },
    rgb:{
      colorPreset:false,
      background:'rgb(0,0,0)',
      particles:(color)=>{return color;}
    },
    teal:{
      colorPreset:true,
      background:'rgb(20,145,178)',
      particles:'rgb(170,0,0)',
    },
    pumpkin:{
      colorPreset:true,
      background:'rgb(228,94,12)',
      particles:'rgb(0,102,0)',
    }
  })
  let currentTheme = themeRef.current.rgb;
  const particlesList = [];
  function createParticles(x){  //function to create the list of particles
    for(let i = 1; i <= x; i++){
      const randX = Math.floor(Math.random() * window.innerWidth);
      const randY = Math.floor(Math.random() * window.innerHeight);
      let randVelx = ((Math.random() * 1) + .3);
      let randVely = ((Math.random() * 1) +.3);
      const randXDir = Math.floor((Math.random() * 2) + 1);
      const randYDir = Math.floor((Math.random() * 2) + 1);
      const randRadius = Math.floor((Math.random() * 3) + 1);
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
      let gradient;
      if(theme.colorPreset) gradient = 'none';
      else gradient = gradientRef.current.gradient;
      let h = canvas.height;
      ctx.fillStyle = theme.background;
      ctx.fillRect(0,0,canvas.width, h);
      particlesList.forEach((particle, index)=>{
        ctx.beginPath();
        ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI);
        (theme.colorPreset) ? ctx.fillStyle = theme.particles : ctx.fillStyle = gradient;
        ctx.fill();
        (theme.colorPreset) ? ctx.strokeStyle = theme.particles : ctx.strokeStyle = gradient;
        ctx.stroke();
        let len = particlesList.length;
        for(let j = index + 1; j < len;j++){ // loop to compare distance between particles
          let xPointDiff = particle.pos.x - particlesList[j].pos.x;
          let yPointDiff = particle.pos.y - particlesList[j].pos.y;
          let distance = Math.sqrt((xPointDiff * xPointDiff) + (yPointDiff * yPointDiff));
          if(distance <= (h * .25)){
            let lineW = (1 - (distance / (h * .25))); //value between 0 and 1 for line width depending on how far particles are. can be used for opacity too.
            ctx.beginPath();
            ctx.moveTo(particle.pos.x, particle.pos.y);
            ctx.lineTo(particlesList[j].pos.x, particlesList[j].pos.y);
            (theme.colorPreset) ? ctx.strokeStyle = theme.particles : ctx.strokeStyle = gradient;
            ctx.lineWidth = lineW;
            ctx.stroke();
          }
        }
      });
  }
  const push = (e)=>{
    e.preventDefault();
    for(let i = 0; i < 3; i++){
      const X = e.offsetX;
      const Y = e.offsetY;
      let randVelx = ((Math.random() * 1) + .3);
      let randVely = ((Math.random() * 1) +.3);
      const randXDir = Math.floor((Math.random() * 2) + 1);
      const randYDir = Math.floor((Math.random() * 2) + 1);
      const randRadius = Math.floor((Math.random() * 3) + 1);
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
  const fpsFunc = ()=>{
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    let grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2,canvas.width/8,canvas.width/2,canvas.height/2,canvas.width/2);
    grd.addColorStop(0, 'rgb(255,0,0)');//red
    grd.addColorStop(.2, 'rgb(255,231,0)'); //yellow
    grd.addColorStop(.4, 'rgb(0,212,3)');//green
    grd.addColorStop(.6, 'rgb(0,255,255)');//cyan
    grd.addColorStop(.8, 'rgb(0,100,212)');//blue
    grd.addColorStop(1, 'rgb(204,0,212)');//magenta
    gradientRef.current.gradient = grd;
    const updateParticles = ()=>{
      particlesList.forEach((particle)=>{
        if(particle.pos.x + particle.velx > canvas.width || particle.pos.x + particle.velx < 0) particle.velx = -particle.velx;
        if(particle.pos.y + particle.vely > canvas.height || particle.pos.y + particle.vely < 0) particle.vely = -particle.vely;
        particle.pos.x += particle.velx;
        particle.pos.y += particle.vely;
      });
    }
    let animationID;
    const renderAnimation = ()=>{
      
      draw(ctx, canvas, currentTheme);
      updateParticles();
      fpsFunc();
      animationID = requestAnimationFrame(renderAnimation);
    }
    renderAnimation();
    const resizeFunc = ()=>{
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    // const mouseMoveFunc = (e)=>{
    //   let x = e.offsetX;
    //   let y = e.offsetY;
    //   particlesList.forEach((particle)=>{
    //     if(particle.pos.x < x + 10 && particle.pos.x > x - 10) particle.velx = -particle.velx;
    //     if(particle.pos.y < y + 10 && particle.pos.y > y - 10) particle.vely = -particle.vely;
    //   })
    // }
    const clickFunc = (e)=>{
      push(e);
    }
    window.addEventListener('resize', resizeFunc);
    // canvas.addEventListener('mousemove',mouseMoveFunc);
    canvas.addEventListener('click', clickFunc);
    return()=>{
      cancelAnimationFrame(animationID);
      window.removeEventListener('resize', resizeFunc);
      // canvas.removeEventListener('mousemove',mouseMoveFunc);
      canvas.removeEventListener('click', clickFunc);
    }
  },[]);
  
  return (
    <>
      <canvas id='particles' ref={canvasRef}></canvas>
      <FpsTracker numParticles={numParticles} fps={fps}/>
      <Menu />
    </>
  );
}

export default App;