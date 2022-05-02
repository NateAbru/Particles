import './index.css';
import {useEffect, useRef} from 'react';

function App() {
  const canvasRef = useRef(null);
  const particlesList = [];
  function createParticles(x){  //function to create the list of particles
    for(let i = 1; i <= x; i++){
      const randX = Math.floor(Math.random() * window.innerWidth);
      const randY = Math.floor(Math.random() * window.innerHeight);
      const randVelx = Math.floor((Math.random() * 2) + 1);
      const randVely = Math.floor((Math.random() * 2) + 1);
      const particle = {  //particle object creation
        id : i,
        pos : {x:randX, y:randY},
        radius : 3,
        vely : randVelx,
        velx : randVely
      }
      particlesList.push(particle); //pushing next particle into list of particles
    }
  }
  createParticles(100);
  const draw = (ctx, canvas)=>{
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillRect(0,0,canvas.width, canvas.height);
      particlesList.forEach((particle, index)=>{
        ctx.beginPath();
        ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.stroke();
      });
  }
   useEffect(()=>{
    document.title = 'Particles';
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const updateParticles = ()=>{
      particlesList.forEach((particle)=>{
        if(particle.pos.x + particle.velx > canvas.width || particle.pos.x + particle.velx < 0) particle.velx = -particle.velx;
        if(particle.pos.y + particle.vely > canvas.height || particle.pos.y + particle.vely < 0) particle.vely = -particle.vely;
        particle.pos.x += particle.velx;
        particle.pos.y += particle.vely;
      })
    }
    let animationID;
    const renderAnimation = ()=>{
      updateParticles();
      draw(ctx, canvas);
      animationID = requestAnimationFrame(renderAnimation);
    }
    renderAnimation();

    return()=>{
      cancelAnimationFrame(animationID);
    }
  },[]);

  return (
    <canvas id='particles' ref={canvasRef}></canvas>
  );
}
export default App;