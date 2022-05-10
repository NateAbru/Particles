import './index.css';
import {useEffect, useRef} from 'react';

function App() {
  const canvasRef = useRef(null);
  let gradientRef = useRef({
    gradient:'white'//temp value
  })
  let themeRef = useRef({
    space:{
      colorPreset:true,
      background:'rgb(0,0,0)',
      particles:'rgb(255,255,255)',

    },
    crimson:{
      colorPreset:true,
      background:'rgb(230,28,28)',
      particles:'rgb(255,255,255)',
    },
    monochrome:{
      colorPreset:true,
      background:'rgb(255,255,255)',
      particles:'rgb(0,0,0)',
    },
    whiteRGB:{
      colorPreset:false,
      background:'rgb(255,255,255)',
      particles:(color)=>{return color;}
    },
    blackRGB:{
      colorPreset:false,
      background:'rgb(0,0,0)',
      particles:(color)=>{return color;}
    },
    cottonCandy:{
      colorPreset:true,
      background:'rgb(20,166,255)',
      particles:'rgb(255,59,175)',
    }
  })
  let currentTheme = themeRef.current.monochrome;
  const particlesList = [];
  function createParticles(x){  //function to create the list of particles
    for(let i = 1; i <= x; i++){
      const randX = Math.floor(Math.random() * window.innerWidth);
      const randY = Math.floor(Math.random() * window.innerHeight);
      let randVelx = Math.floor((Math.random() * 3) + 1);
      let randVely = Math.floor((Math.random() * 3) + 1);
      const randXDir = Math.floor((Math.random() * 2) + 1);
      const randYDir = Math.floor((Math.random() * 2) + 1);
      const randRadius = Math.floor((Math.random() * 3) + 3);
      if(randXDir === 1) randVelx = - randVelx; //random change of X direction
      if(randYDir === 1) randVely = - randVely; //random change of Y direction
      const particle = {  //particle object creation
        id : i,
        pos : {x:randX, y:randY},
        radius : randRadius,
        vely : randVelx,
        velx : randVely
      }
      particlesList.push(particle); //pushing next particle into list of particles
    }
  }
  createParticles(200);
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
          if(distance <= (h * .3)){
            let lineW = (1 - (distance / (h * .3))); //value between 0 and 1 for line width depending on how far particles are. can be used for opacity too.
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
      animationID = requestAnimationFrame(renderAnimation);
    }
    renderAnimation();
    const resizeFunc = ()=>{
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const mouseMoveFunc = (e)=>{
      let x = e.offsetX;
      let y = e.offsetY;
      particlesList.forEach((particle)=>{
        if(particle.pos.x < x + 10 && particle.pos.x > x - 10) particle.velx = -particle.velx;
        if(particle.pos.y < y + 10 && particle.pos.y > y - 10) particle.vely = -particle.vely;
      })
    }
    window.addEventListener('resize', resizeFunc);
    canvas.addEventListener('mousemove',mouseMoveFunc);
    return()=>{
      cancelAnimationFrame(animationID);
      window.removeEventListener('resize', resizeFunc);
      canvas.removeEventListener('mousemove',mouseMoveFunc);
    }
  },[]);

  return (
    <canvas id='particles' ref={canvasRef}></canvas>
  );
}
export default App;