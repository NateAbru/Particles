import './Menu.css';
import {CgArrowsExpandDownRight as Arrow} from 'react-icons/cg';

const Menu = ()=>{
  return (
    <>
      <nav className='menu'>
        <h4 style={{color:'white'}}><Arrow className='icon'/> Theme</h4>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Space</h5></div>
        </section>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>MonoChrome</h5></div>
        </section>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Crimson</h5></div>
        </section>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Teal</h5></div>
        </section>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Pumpkin</h5></div>
        </section>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Spectrum</h5></div>
        </section>
        <h4 style={{color:'white'}}><Arrow className='icon'/> Click Effect</h4>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Add</h5></div>
        </section>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Remove</h5></div>
        </section>
        <h4 style={{color:'white'}}><Arrow className='icon'/> Hover Effect</h4>
        <section className='option-container'>
          <div className='indicator'></div>
          <div className='option'><h5>Grab</h5></div>
        </section> 
      </nav>
    </>
  )
}

export default Menu;