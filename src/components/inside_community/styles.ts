import { css, styled } from 'stitches.config'

export const subsmall = css({
  '@lg':{
    marginTop:40,
  }
})

export const subsmallTitle = css({
  '@lg':{
      fontSize:'24px !important'
  },
  '@xl':{
    fontSize:'32px !important'
}

})

export const big = css({
  '@md':{
    paddingRight:32
  }
})

export const fontHelp = css({
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  'font-smooth': 'never'
})

export const bgRombusDark = css({
objectFit:'cover',
objectPosition:'left'
})

export const Video = styled('video', {
  // height: '100%',
  // marginLeft: '15px',
  // background: '$accent',
  // objectPosition: '-48px center',

  // '@md': { objectPosition: '-28px' },
  // '@lg': { objectPosition: '-60px' }
})


export const firstImage = css({
  '@lg':{
  width: '400px',

},
'@xl':{
  width: '580px',

},
})

export const magicNumber = css({
  '@lg':{ 
marginBottom:-117,
marginLeft:'auto',
// marginRight:'10px',
width:'fit-content'
    }
    
})
export const magic_3  = css({
  '@lg':{ 
    mt:'-470px !important',

    },
    '@xl':{ 
      marginTop:'-400px !important',

          }
    
})

export const magic_t  = css({
  '@lg':{ 
    mt:'200px !important',
    width: 400,
    'img':{
      width: 400,

    }

    },
    '@xl':{ 
      marginTop:'-100px !important',
      width: 500,
      'img':{
        width: 500,
  
      }

          }
    
})

export const ml  = css({
  '@lg':{ 
marginLeft:"auto",
width:'45%',
maxWidth:580,
"img":{
  width:'100%'
}
    },
    '@xl':{ 
      mt:-400
          }
    
})

export const moreLeft  = css({
  '@lg':{ 
marginLeft:"0 !important",
width:'50%',
"div":{
  width:'100%',
  paddingRight:'30px'
}
    }
    
})

export const ColumnToRow = styled('div',{
display:'flex',
flexWrap:'wrap',
justifyContent:'space-between',
"@lg":{
  marginTop:'40px'
}
    })

export const subNumber = css({
      padding:'0 !important',
      '@lg':{ 
marginBottom:-48
        }
        
    })

export const subText = css({
      '@lg':{ 
width:'100%%',
mr:'32px',
height:70
        },
        '@xl':{ 
          width:'90%',
          height:70,
          mr:0
                  }
        
    })

export const allnew = css({
  '@lg':{ 
    flexDirection:'column !important',
    width: '32%',
    gap:40,
    'img':{
      width:'100%'
    }
    },
    '@xl':{ 
      flexDirection:'column !important',
      width: '30%',
      gap:40,
      'img':{
        width:'100%'
      }
      }
})

export const perish = css({
  '@lg':{ 
    display:'none'
    }
})

export const specialBordered = css({
  '@lg':{ 
    width:'40% !important'
    }
})

export const magic = css({
  '@lg':{ 
    flexDirection:'column !important',
    width: '50%',
    marginTop: -572,
    gap:'40px !important'
    },
    '@xl':{ 
      flexDirection:'column !important',
      width: '50%',
      marginTop: -532
      }
})

export const magic2 = css({
  '@lg':{ 
    flexDirection:'column !important',
    width: '384px',
    marginTop: -102,
    marginLeft:'auto',
    gap:40,
    'img':{
      width:'380px !important'
    }
    },
    '@xl':{ 
    marginTop: -152,

      flexDirection:'column !important',
      width: '40%',
      'img':{
      width:'462px !important'
    }
      // marginTop: -532
      }
})

export const cropped = css({
  '@md':{ 
    width:233
    }
})

export const FinalImageBlue = styled('div',{
  position: 'absolute',
  top:-100,
  right:-60,
  height: 150,
  width:150,

  '@md':{
  width:320,
  height: 320,
  right:-120,
  top:-160,
  zIndex:1
},
'@lg':{
  width:195,
  height: 195,
  top:-170,
  right:-80,

}
    })


export const FinalImage = styled('div',{
  position: 'absolute',
  top:0,
  right:0,
  height: 188,
  width:180
    })

export const FinalDescription = styled('div',{
fontSize:16,
fontWeight:400,
color:'#AFAFBD',
lineHeight:'24px',
marginTop:24,
marginBottom:24,
'@md':{
  width:514


}
  })

export const FinalTitle = styled('div',{
  fontSize:24,
  color:'#fff',
  position:'relative',
  fontWeight: 400,
  '@lg':{
fontSize: '32px',
lineHeight: '38px',

  }
  })

export const Final = styled('div',{
width:'calc(100vw - 16px)',
position:'relative',
marginLeft:-30,
borderRadius:8,
background:'#212049',
padding:'181px 30px 30px 30px',
overflow:'hidden',
'@md':{
  width:'720px',
  marginLeft:-14,


},
'@lg':{
mt:-600,

ml:'auto',
mr:-100,
maxWidth:'60%',
'div':{
maxWidth:'90%',

}


},
'@xl':{
  maxWidth:696,
  mt:-450,


}
})

export const Ribbon = styled('div',{
  background:'#212049',
  width:'calc(100vw - 8px)',
  marginLeft:'-30px',
  padding:'28px 63px 36px 30px',
  borderRadius:'8px 0 0 8px',
  color:'#fff',
  display:'flex',
  flexDirection:'column',
  gap:'16px',
  marginBottom:'48px',
  '@md':{
    padding:'40px 63px',

},

'@lg':{
  width:'50%',
  marginLeft:'auto',
  marginRight:'-140px',
  marginTop:'-220px'

},
'@xl':{
  width:'60%',
  marginLeft:'auto',
  marginRight:'calc((100vw - 1160px) / -2)'

}
  
})

export const RibbonTitle = styled('div',{
fontSize:32,
fontWeight:400

  
})

export const RibbonDescription = styled('div',{

fontSize:16,
opacity:0.64,
fontWeight:400,
'@md':{
  maxWidth:'calc(768px - 64px - 240px)',
  lineHeight:'24px'
},
  
})


export const withMargin = css({
marginBottom:'136px !important',
"@lg":{
  marginTop:'0px !important'
},
"@xl":{
  marginTop:'-90px !important'
}
})

export const Divider = styled('div',{
  width:'100vw',

  height:1,
  background:"#E8E8E8",
  margin:'40px 0 40px -38px'
})

export const Small = styled('div', {
fontSize:16,
color:'$accent',
marginBottom:8,
})

export const Medium = styled('div', {
  fontSize:16,
  color:'$accent',

'@md':{
width:'50%'


},
"@lg":{
fontWeight: 500,
lineHeight: '19px',
letterSpacing: '0%'

}

})

export const Big = styled('div', {
  fontSize:60,
  color:'$accent',
marginBottom:16,
lineHeight:'50px',
fontWeight:350,
'@md':{
  fontSize:80,
  marginTop:12,
lineHeight:'80px',
  marginBottom:30,
  "whiteSpace":"pre-wrap"


},
'@lg':{
  fontSize:62,
  lineHeight:'68px',
  letterSpacing: '-0.8%',
  
}

})

export const More = styled('div', {
  display:'flex',
  // gap:'44px',
  flexDirection:'column',
  '@lg':{
width:'40%',
marginLeft:'auto'
  }
})

export const Flex = styled('div', {
  display:'flex',
  gap:'44px'
})

export const Percent = styled('div', {
fontSize:24,
whiteSpace:'nowrap',
fontWeight: 400,
letterSpacing: '0%',
'@lg':{
  fontSize: '32px',



},
  })

export const PercentDescription = styled('div', {
    fontSize:16,
fontWeight: 500,
lineHeight: '19px',
letterSpacing: '0%',

    })

export const Bordered = styled('div', {
  borderTop:'1px solid',
  borderBottom:'1px solid',
  borderColor:'#E8E8E8',
padding:'16px 0',
marginBottom:48,
color:'$accent',
'@md':{
  width:'calc(100% - 256px - 64px)',
  marginTop:'-93px !important'

},
'@lg':{
  width:'50%',
  marginTop:'40px !important',
marginBottom:'96px !important',


},
'@xl':{
  width:'50%',
  marginTop:'40px !important',


}
  })

export const borderFlip = css({
  '@md':{
    marginLeft:'auto'
  }
  })

export const Block = styled('div', {
  display:'flex',
  flexDirection:'column',
  gap:'16px',
  marginTop:24
  })

export const SimpleTextTitle = styled('div', {
  fontSize:24,
  lineHeight:"30px",
  whiteSpace:'pre-wrap',
  color:'$accent',
  fontWeight:400,
  '@md':{
    fontSize:32,
  lineHeight:"38px",

},
'@xl':{

whiteSpace:'pre-wrap',


}
  })

export const SimpleText = styled('div', {
    fontSize:16,
    lineHeight:"30px",
  fontWeight:400,
  color:'$descriptionNew',

  '@md':{
    lineHeight:"24px",
fontWeight: 400,
letterSpacing: '0%'



}
    })

export const space = css({
  display: 'flex',
  width: '100%',
'@md':{
  width: '256px',
  position:'relative',
  zIndex:10
},
'@lg':{
  maxWidth: '492px',
  width: '100%',

},
'@xl':{
  maxWidth: '580px',

  width: '580px',
}
})

export const flip = css({
'@md':{
 flexDirection:'row-reverse !important'
}
})

export const margined = css({
  '@md':{
   marginLeft:'auto'
  }
  })


export const ChangeFlex= styled('div', {
display:'flex',
flexDirection:'column',
'@md':{
  flexDirection:'row',
gap:'64px'

}
  
  })

export const PhilosophyTitle = styled('div', {
  fontSize:32,
  lineHeight:"40px",
  color:'$accent',
  marginTop:'24px',
  marginBottom:'8px',
  fontWeight:350,

  '@md':{
    fontSize:64,
    lineHeight:'60px',
  marginBottom:'16px',
  width:768,
  margin:'24px auto',
  },

  '@lg':{
  width:800,
  lineHeight:'68px',

  },
  '@xl':{

    width:1300,
  
  
    }
  
  })

export const Principles = styled('div', {
   display:'flex',
   flexDirection:'column',
   padding:'40px 38px',

   '@md':{
width:768,
margin:'0 auto',
  },
  '@lg':{
    width:'calc(100vw - 280px)',
maxWidth:'1160px',
padding:'40px 0',

      }
  
    
    })

export const Philosophy = styled('div', {
borderTop:'1px solid',
borderBottom:'1px solid',
borderColor:'#E8E8E8',
textAlign:'center',
fontWeight:400,
})

export const PhilosophyDescription = styled('div', {
  fontSize:16,
  color:'$accent',
  lineHeight:'22px',
  marginBottom:'32px'
})

export const LiveBe = styled('div', {
  width:'360px',
  position:'relative',
  margin:'-64px auto 0 auto',
  background:'#fff',
  borderRadius:'8px',
  padding:30,
  display:'flex',
  flexDirection:'column',
  overflow:'hidden',
  '@md':{
    width:'640px',
    flexDirection:'row',
    alignSelf:'center',
    padding:'48px 64px 0 80px',
  },
  '@lg':{
    width:'1169px',
    minHeight:492,
    maxWidth:'calc(100vw - 280px)',
    flexDirection:'row',
    alignSelf:'center',
    padding:'48px 64px 0 80px',
  }

})

export const LiveBeTitle = styled('div', {
  fontSize:56,
  zIndex:'10',
  whiteSpace: 'pre',
  width:"fit-content",
  margin:'180px auto 92px auto',
  color:'$accent',
  lineHeight:'48px',
  fontWeight:400,
  '@md':{
    fontSize:48,
    margin:'120px 72px 0 0',

  },
  '@lg':{
    margin:'70px 72px 0 0',
  lineHeight:'64px',
  fontWeight:400,
  fontSize:68,




  },
  '@xl':{
    fontSize:88,
  lineHeight:'72px',
    margin:'70px 96px 0 80px',
  }
})

export const LiveBeSubTitle = styled('div', {
  whiteSpace:'pre',
  fontSize:24,
  zIndex:'10',
  color:'$accent',
  lineHeight:'30px',
  marginBottom:'24px',
  fontWeight: 400,
  '@lg':{
fontSize: '32px',
lineHeight: '34px',
letterSpacing: '0%'

  }

})

export const LiveBeOther = styled('div', {
display:'flex',
flexDirection:'column',
zIndex:'10',

})

export const LiveBeDescription = styled('div', {
  fontSize:16,
  color:'$descriptionNew',
  lineHeight:'22px',
  marginBottom:'64px',
  '@md':{
    maxWidth:'256px'

  },
  '@lg':{
    maxWidth:'464px',

  }
})

export const Line = styled('div', {
  width:1,
  height:80,
  background:'$background',
  fontWeight:400

})

export const Complexes = styled('div', {
position:'absolute',
display:"flex",
justifyContent:'space-between',
width: '100vw',
top: '65vh',
"@md":{
  width:"330px",
    top:'unset',
  bottom:'calc(30vh - 20px)',
  right:64
    },
    "@lg":{
  width:"380px",
    top:'unset',
  bottom:'calc(30vh - 20px)',
  right:64
    }
})

export const ContentImg = styled('div', {
  position: 'relative',
  width: '50%',
  height: 135,
  marginTop: -45,

  '@lg': {
    height: 192,
    mt:-77
  }
})

export const VideoWrapper = styled('div', {
  position: 'relative',
  "&:before":{
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
    pointerEvents: 'none',
  }
})

export const bgImage = css({
  display: 'flex',
  minWidth: '100vw',
  height: '100vh',
  // maxHeight:'760px',
  objectFit:'cover',


})

export const bgRombus = css({
  display: 'flex',
  width: '100%',
  height: '100%',
  position:'absolute',
  inset:0,
  objectFit:'fill',
  "@md":{
    objectFit: 'contain',
    objectPosition: 'top'
    },
    "@lg":{
      objectFit: 'contain',
      objectPosition: 'top'
      }



})



export const community = css({
  display: 'flex',
  position:'absolute',
  top:'43vh',
  width:"350px",
  left:'50%',
  transform:"translateX(-50%)",
"@md":{
  width:"330px",
  left:64,
  transform:"translateX(0)",
  top:'unset',
  bottom:'30vh'

    },
    "@lg":{
  width:"570px",
  left:64,
  transform:"translateX(0)",
  top:'unset',
  bottom:'30vh'

    }

})

export const Wrapper = styled('div', {
display:'flex',
flexDirection:'column',
overflow:'hidden',


})