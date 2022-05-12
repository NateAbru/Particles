import './FpsTracker.css';

const FpsTracker = ({numParticles, fps})=>{
  return (
    <div className='num-particles'>
      <h4>Particles: {numParticles}</h4>
      <h5>FPS {fps}</h5>
    </div>
  )
}

export default FpsTracker;