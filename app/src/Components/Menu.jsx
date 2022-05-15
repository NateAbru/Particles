import './Menu.css';
import {CgArrowsExpandDownRight as Arrow} from 'react-icons/cg';
import {themes} from '../ThemeData';

const Menu = ({clickRef,hoverRef,currentTheme})=>{ //props are the variable refs from App.js 
 
  const changeClickEffect = (s)=>{
    clickRef.current.effect = s;
  }
  const changeHoverEffect = (s)=>{
    hoverRef.current.effect = s;
  }
  const changeTheme = (s)=>{
    if(s === 'monochrome') currentTheme.current.theme = themes.monochrome;
    if(s === 'teal') currentTheme.current.theme = themes.teal;
    if(s === 'spectrum') currentTheme.current.theme = themes.spectrum;
    if(s === 'crimson') currentTheme.current.theme = themes.crimson;
    if(s === 'space') currentTheme.current.theme = themes.space;
    if(s === 'pumpkin') currentTheme.current.theme = themes.pumpkin;
  }
  return (
    <>
      <nav className='menu'>
        <h4 style={{color:'white'}}><Arrow className='icon'/> Theme</h4>
        <section className='option-container' onClick={()=>{changeTheme('space')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Space</h5></div>
        </section>
        <section className='option-container' onClick={()=>{changeTheme('monochrome')}}>
          <div className='indicator'></div>
          <div className='option'><h5>MonoChrome</h5></div>
        </section>
        <section className='option-container' onClick={()=>{changeTheme('crimson')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Crimson</h5></div>
        </section>
        <section className='option-container' onClick={()=>{changeTheme('teal')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Teal</h5></div>
        </section>
        <section className='option-container' onClick={()=>{changeTheme('pumpkin')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Pumpkin</h5></div>
        </section>
        <section className='option-container' onClick={()=>{changeTheme('spectrum')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Spectrum</h5></div>
        </section>
        <h4 style={{color:'white'}}><Arrow className='icon'/> Click Effect</h4>
        <section className='option-container' onClick={()=>{changeClickEffect('none')}}>
          <div className='indicator'></div>
          <div className='option'><h5>None</h5></div>
        </section>
        <section className='option-container' onClick={()=>{changeClickEffect('add')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Add</h5></div>
        </section>
        <section className='option-container' onClick={()=>changeClickEffect('remove')}>
          <div className='indicator'></div>
          <div className='option'><h5>Remove</h5></div>
        </section>
        <h4 style={{color:'white'}}><Arrow className='icon'/> Hover Effect</h4>
        <section className='option-container' onClick={()=>{changeHoverEffect('none')}}>
          <div className='indicator'></div>
          <div className='option'><h5>None</h5></div>
        </section> 
        <section className='option-container' onClick={()=>{changeHoverEffect('grab')}}>
          <div className='indicator'></div>
          <div className='option'><h5>Grab</h5></div>
        </section> 
      </nav>
    </>
  )
}

export default Menu;