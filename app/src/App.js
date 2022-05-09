import './index.css';
import {useEffect, useRef} from 'react';

function App() {
  const canvasRef = useRef(null);
  const particlesList = [];
  function createParticles(x){  //function to create the list of particles
    for(let i = 1; i <= x; i++){
      const randX = Math.floor(Math.random() * window.innerWidth);
      const randY = Math.floor(Math.random() * window.innerHeight);
      let randVelx = Math.floor((Math.random() * 2) + 1);
      let randVely = Math.floor((Math.random() * 2) + 1);
      const randXDir = Math.floor((Math.random() * 2) + 1);
      const randYDir = Math.floor((Math.random() * 2) + 1);
      if(randXDir === 1) randVelx = - randVelx; //random change of X direction
      if(randYDir === 1) randVely = - randVely; //random change of Y direction
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
  createParticles(200);
  const draw = (ctx, canvas)=>{
      let h = canvas.height;
      ctx.fillStyle = 'rgb(0,0,0)';
      ctx.fillRect(0,0,canvas.width, h);
      particlesList.forEach((particle, index)=>{
        ctx.beginPath();
        ctx.arc(particle.pos.x, particle.pos.y, particle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.stroke();
        let len = particlesList.length;
        for(let j = index + 1; j < len;j++){ // loop to compare distance between particles
          let xPointDiff = particle.pos.x - particlesList[j].pos.x;
          let yPointDiff = particle.pos.y - particlesList[j].pos.y;
          let distance = Math.sqrt((xPointDiff * xPointDiff) + (yPointDiff * yPointDiff));
          if(distance <= (h * .3)){
            let opac = (1 - (distance / (h * .3)));
            ctx.beginPath();
            ctx.moveTo(particle.pos.x, particle.pos.y);
            ctx.lineTo(particlesList[j].pos.x, particlesList[j].pos.y);
            ctx.strokeStyle = `rgba(255,255,255,${opac})`;
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
      draw(ctx, canvas);
      updateParticles();
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