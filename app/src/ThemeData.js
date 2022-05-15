 export const themes = {
    space:{
      colorPreset:true,
      background:'rgb(0,0,0)',
      particles:'rgb(255,255,255)',

    },
    crimson:{
      colorPreset:true,
      background:'rgb(200,22,37)',
      particles:'rgb(255,255,255)',
    },
    monochrome:{
      colorPreset:true,
      background:'rgb(255,255,255)',
      particles:'rgb(0,0,0)',
    },
    spectrum:{
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
  }