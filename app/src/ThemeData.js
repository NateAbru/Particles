 export const themes = {
    space:{
      colorPreset:true,
      background:'rgb(0,0,0)',
      particles:'rgba(255,255,255,.5)',
      lines:'rgba(255,255,255,.4)',

    },
    crimson:{
      colorPreset:true,
      background:'rgb(200,22,37)',
      particles:'rgba(255,255,255,.5)',
      line:'rgba(255,255,255,.4)',
    },
    monochrome:{
      colorPreset:true,
      background:'rgb(255,255,255)',
      particles:'rgba(0,0,0,.5)',
      lines:'rgba(0,0,0,.4)',
    },
    spectrum:{
      colorPreset:false,
      background:'rgb(0,0,0)',
      particles:(color)=>{return color;},
      lines:(color)=>{return color;},
    },
    tennis:{
      colorPreset:true,
      background:'rgb(161,214,16)',
      particles:'rgba(0,0,0,.5)',
      lines:'rgba(255,255,255,.4)',
    },
    fuchsia:{
      colorPreset:true,
      background:'rgb(0,0,0)',
      particles:'rgba(255,4,192,.5)',
      lines:'rgba(255,4,192,.4)',
    },
    blue:{
      colorPreset:true,
      background:'rgb(0,111,250)',
      particles:'rgba(2,19,119,.5)',
      lines:'rgba(2,19,119,.4)',
    }
  }