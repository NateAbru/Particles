import './Menu.css';
import {CgArrowsExpandDownRight as Arrow} from 'react-icons/cg';
import {themes} from '../ThemeData';
import {useEffect, useRef} from 'react';

const Menu = ({clickRef,hoverRef,currentTheme})=>{ //props are the variable refs from App.js 
  const optionsRef = useRef(null);
  const themesOptionRef = useRef(null);
  const displayThemesRef = useRef(null);
  const clickOptionsRef = useRef(null);
  const displayClickOptionsRef = useRef(null);
  const hoverOptionsRef = useRef(null);
  const displayHoverOptionsRef = useRef(null);
  const changeClickEffect = (s)=>{
    clickRef.current.effect = s;
  }
  const changeHoverEffect = (s)=>{
    hoverRef.current.effect = s;
  }
  const changeTheme = (s)=>{
    if(s === 'monochrome') currentTheme.current.theme = themes.monochrome;
    if(s === 'tennis') currentTheme.current.theme = themes.tennis;
    if(s === 'spectrum') currentTheme.current.theme = themes.spectrum;
    if(s === 'crimson') currentTheme.current.theme = themes.crimson;
    if(s === 'space') currentTheme.current.theme = themes.space;
    if(s === 'pumpkin') currentTheme.current.theme = themes.pumpkin;
    if(s === 'blue') currentTheme.current.theme = themes.blue;
     if(s === 'fuchsia') currentTheme.current.theme = themes.fuchsia;
  }
  useEffect(()=>{
    const options = optionsRef.current;
    const themesOption = themesOptionRef.current;
    const displayThemes = displayThemesRef.current;
    const clickOptions = clickOptionsRef.current;
    const displayClickOptions = displayClickOptionsRef.current;
    const hoverOptions = hoverOptionsRef.current;
    const displayHoverOptions = displayHoverOptionsRef.current;

    //functions
    const themeIndicatorFunc = (i, length)=>{
      for(let x = 0; x < length; x++){
        if(themesOption.childNodes[x].childNodes[0].classList.contains('active')){
          themesOption.childNodes[x].childNodes[0].classList.remove('active');
        }
      }
      themesOption.childNodes[i].childNodes[0].classList.add('active');
    }
    const clickIndicatorFunc = (i, length)=>{
      for(let x = 0; x < length; x++){
        if(clickOptions.childNodes[x].childNodes[0].classList.contains('active')){
          clickOptions.childNodes[x].childNodes[0].classList.remove('active');
        }
      }
      clickOptions.childNodes[i].childNodes[0].classList.add('active');
    }
    const hoverIndicatorFunc = (i, length)=>{
      for(let x = 0; x < length; x++){
        if(hoverOptions.childNodes[x].childNodes[0].classList.contains('active')){
          hoverOptions.childNodes[x].childNodes[0].classList.remove('active');
        }
      }
      hoverOptions.childNodes[i].childNodes[0].classList.add('active');
    }

    //Themes sections
    const displayThemesFunc = ()=>{
      if(displayThemes.nextSibling.classList.contains('no-show')) displayThemes.nextSibling.classList.remove('no-show');
      else displayThemes.nextSibling.classList.add('no-show');
    }
    displayThemes.addEventListener('click', displayThemesFunc);  //event to show options for theme selection
    let len = themesOption.childNodes.length;
    for(let i = 0; i < len; i++){
      themesOption.childNodes[i].addEventListener('click', ()=>{themeIndicatorFunc(i, len)});
    }

    //click section
    const displayClickEventsFunc = ()=>{
      if(displayClickOptions.nextSibling.classList.contains('no-show')) displayClickOptions.nextSibling.classList.remove('no-show');
      else displayClickOptions.nextSibling.classList.add('no-show');
    }
    displayClickOptions.addEventListener('click', displayClickEventsFunc);  //event to show options for theme selection
    let len2 = clickOptions.childNodes.length;
    for(let i = 0; i < len2; i++){
      clickOptions.childNodes[i].addEventListener('click', ()=>{clickIndicatorFunc(i, len2)});
    }

    //hover section
    const displayHoverEventsFunc = ()=>{
      if(displayHoverOptions.nextSibling.classList.contains('no-show')) displayHoverOptions.nextSibling.classList.remove('no-show');
      else displayHoverOptions.nextSibling.classList.add('no-show');
    }
    displayHoverOptions.addEventListener('click', displayHoverEventsFunc);  //event to show options for theme selection
    let len3 = hoverOptions.childNodes.length;
    for(let i = 0; i < len3; i++){
      hoverOptions.childNodes[i].addEventListener('click', ()=>{hoverIndicatorFunc(i, len3)});
    }
    return (()=>{
      for(let i = 0; i < len; i++) themesOption.childNodes[i].removeEventListener('click', ()=>{themeIndicatorFunc(i, len)});
      for(let i = 0; i < len2; i++) clickOptions.childNodes[i].removeEventListener('click', ()=>{clickIndicatorFunc(i, len2)});
      for(let i = 0; i < len3; i++) hoverOptions.childNodes[i].removeEventListener('click', ()=>{hoverIndicatorFunc(i, len3)});
      displayThemes.removeEventListener('click', displayThemesFunc);
      displayClickOptions.removeEventListener('click', displayClickEventsFunc);
      displayHoverOptions.removeEventListener('click', displayHoverEventsFunc);
    });
  },[]);
  return (
    <>
      <nav className='menu' ref={optionsRef}>
        <h4 style={{color:'white'}} ref={displayThemesRef}><Arrow className='icon'/> Theme</h4>
        <div ref={themesOptionRef} className='no-show'>
          <section className='option-container themes' onClick={()=>{changeTheme('space')}}>
            <div className='indicator active'></div>
            <div className='option'><h5>Space</h5></div>
          </section>
          <section className='option-container themes' onClick={()=>{changeTheme('monochrome')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Monochrome</h5></div>
          </section>
          <section className='option-container themes' onClick={()=>{changeTheme('crimson')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Crimson</h5></div>
          </section>
          <section className='option-container themes' onClick={()=>{changeTheme('tennis')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Tennis</h5></div>
          </section>
          <section className='option-container themes' onClick={()=>{changeTheme('fuchsia')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Fuchsia</h5></div>
          </section>
          <section className='option-container themes' onClick={()=>{changeTheme('spectrum')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Spectrum</h5></div>
          </section>
          <section className='option-container themes' onClick={()=>{changeTheme('blue')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Blue</h5></div>
          </section>
        </div>
        <h4 style={{color:'white'}} ref={displayClickOptionsRef}><Arrow className='icon'/> Click Effect</h4>
        <div ref={clickOptionsRef} className='no-show'>
          <section className='option-container click-effects' onClick={()=>{changeClickEffect('none')}}>
            <div className='indicator'></div>
            <div className='option'><h5>None</h5></div>
          </section>
          <section className='option-container click-effects' onClick={()=>{changeClickEffect('add')}}>
            <div className='indicator active'></div>
            <div className='option'><h5>Add</h5></div>
          </section>
          <section className='option-container click-effects' onClick={()=>changeClickEffect('remove')}>
            <div className='indicator'></div>
            <div className='option'><h5>Remove</h5></div>
          </section>
        </div>
        <h4 style={{color:'white'}} ref={displayHoverOptionsRef}><Arrow className='icon'/> Hover Effect</h4>
        <div ref={hoverOptionsRef} className='no-show'>
          <section className='option-container hover-effects' onClick={()=>{changeHoverEffect('none')}}>
            <div className='indicator active'></div>
            <div className='option'><h5>None</h5></div>
          </section> 
          <section className='option-container hover-effects' onClick={()=>{changeHoverEffect('grab')}}>
            <div className='indicator'></div>
            <div className='option'><h5>Grab</h5></div>
          </section>
        </div>
      </nav>
    </>
  )
}

export default Menu;