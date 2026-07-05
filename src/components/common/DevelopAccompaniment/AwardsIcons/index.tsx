import React, { FC } from 'react'
import { styled } from 'stitches.config'

const awardsArray = [
  {
    img: '/develop/awardsIcons/award-1.svg',
    width: 80,
    height: 52
  },
  {
    img: '/develop/awardsIcons/award-2.svg',
    width: 39,
    height: 40
  },
  { img: '/develop/awardsIcons/award-3.svg', width: 70, height: 40 }
]

export const AwardsIcons: FC = () => {
  return (
    <Container>
      {awardsArray.map((item) => (
        <div key={item.width}>
          <ImgContent src={item.img} alt="Award 1" />
        </div>
      ))}
    </Container>
  )
}

const Container = styled('div', {
  display: 'none',
  marginTop: '38px',
  marginLeft: '76px',
  '@lg': {
    display: 'flex',
    alignItems: 'center',
  marginTop: '-60px',
  marginLeft: '93px',


    
  },
  '@xl': {
    marginTop: '38px',
    marginLeft: '76px',
  }
})

const ImgContent = styled('img', {
  paddingLeft: '59px'
})
