import { keyframes } from '@stitches/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, HTMLAttributes, useState } from 'react'
import { styled } from 'stitches.config'
// import  '../../../../public/projects/animated-hover.svg'

const AnimatedHover = () => {
  return (
    <svg
      width="116"
      height="100%"
      viewBox="0 0 116 541"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMinYMin slice"
    >
      <path
        d="M71 1V540.5M114.5 510H1.5M1 507.5L8.25 524L15.5 540.5M1 429L115 494.5M115 403H1M1 351L115 220.5M115 321L1.5 190.5M1.5 137H115M1.5 111.5L115 46.5M115 31.5H1.5M15 1L1.5 32.5"
        stroke="#C4C4C4"
        id="line1"
        strokeOpacity="0.6"
        strokeDasharray="1000 1000"
        strokeDashoffset="449"
      />
      <animate
        xlinkHref="#line1"
        attributeName="stroke-dashoffset"
        dur="1s"
        begin="0s"
        calcMode="linear"
        repeatCount="1"
        values="1000;900;600;400"
      />
    </svg>
  )
}
export type ProjectCardProps = HTMLAttributes<HTMLDivElement> & {
  image: string
  title: string
  phone?: string
  phoneLabel?: string | null
  slideable: boolean
  onLeft: any
  onRight: any
  features?: { title: string; value: string }[]
  link: string
  type?: 'small' | null,
  projectId: number
}

export const ProjectCard: FC<ProjectCardProps> = ({
  image,
  title,
  phone,
  phoneLabel,
  slideable = false,
  onLeft = () => {},
  onRight = () => {},
  features,
  link,
  type = null,
  projectId,
  ...props
}) => {
  const router = useRouter()
  const [clickCoords, setClickCoords] = useState([-1, -1])

  return (
    <Wrapper
      {...props}
      // onClick={({ clientX, clientY }) => {
      //   const [x, y] = clickCoords
      //   console.log(clickCoords, clientX - x, clientY - y)
      //   if (clientX - x == 0 && clientY - y == 0) {
      //     router.push(link)
      //   }
      // }}
      // onMouseDown={({ clientX, clientY }) => {
      //   setClickCoords([clientX, clientY])
      // }}
    >
      {slideable && (
        <FoggyRight
          style={{
            height: '100%',
            position: 'absolute',
            zIndex: 100
          }}
          onClick={() => {
            onLeft()
          }}
        >
          <Mask>
            {AnimatedHover()}
            <ArrowLeft />
          </Mask>
        </FoggyRight>
      )}
      {slideable && (
        <FoggyLeft
          style={{
            height: '100%',
            position: 'absolute',
            right: -30,
            zIndex: 100
          }}
          onClick={() => {
            // console.log('right')
            onRight()
          }}
        >
          <Mask>
            {AnimatedHover()}
            <ArrowRight />
          </Mask>
        </FoggyLeft>
      )}
      <div
        // href={link}
        // passHref={true}
        onClick={({ clientX, clientY }) => {
          const [x, y] = clickCoords
          if (clientX - x == 0 && clientY - y == 0) {
            router.push(link)
          }
        }}
        onMouseDown={({ clientX, clientY }) => {
          setClickCoords([clientX, clientY])
        }}
      >
        <Card
          href={link}
          type={type}
          style={{ position: 'relative' }}
        >
          <Background style={{ backgroundImage: `url(${image})` }} />
          <Content>
            <Title>{title}</Title>
            <Details>
              {features &&
                features.map(({ title, value }) => (
                  <Info key={title}>
                    <InfoTitle>{title}:</InfoTitle>
                    <InfoValue>{value}</InfoValue>
                  </Info>
                ))}
              {phone && (
                <Info>
                  {phoneLabel && <InfoTitle>{phoneLabel}:</InfoTitle>}
                  <InfoValue>{phone}</InfoValue>
                </Info>
              )}
            </Details>
          </Content>
        </Card>
      </div>
    </Wrapper>
  )
}
const pointRight = keyframes({
  '0%': {
    transform: 'translate(0,-50%) rotate(-45deg) skew(-4deg, -4deg)'
  },
  '15%': {
    transform: 'translate(20%,-50%) rotate(-45deg) skew(-4deg, -4deg)'
  },
  '30%': {
    transform: 'translate(0%,-50%) rotate(-45deg) skew(-4deg, -4deg)'
  }
})
const pointLeft = keyframes({
  '0%': {
    transform: 'translate(0,-50%) rotate(135deg) skew(-4deg, -4deg)'
  },
  '15%': {
    transform:
      'translate(-20%,-50%) rotate(135deg) skew(-4deg, -4deg)'
  },
  '30%': {
    transform: 'translate(0%,-50%) rotate(135deg) skew(-4deg, -4deg)'
  }
})
const ArrowRight = styled('div', {
  position: 'absolute',
  top: '50%',
  width: 20,
  height: 20,
  borderBottom: '2px solid white',
  borderRight: '2px solid white',
  right: '32px !important',
  transform: 'translate(0,-50%) rotate(-45deg) skew(-4deg, -4deg)',
  animation: `${pointRight} 1.5s  infinite ease`,
  '@lg': {
    right: '45px !important'
  }
})

const ArrowLeft = styled(ArrowRight, {
  transform: 'translate(0,-50%) rotate(135deg) skew(-4deg, -4deg)',
  animation: `${pointLeft} 1.5s  infinite ease`,
  background: 'transparent !important',
  right: 'unset !important',
  left: '30px !important',
  '@lg': {
    left: '45px !important'
  }
})
const Mask = styled('div', {
  display: 'none',
  objectFit: 'cover',
  height: '100%',
  width: 115,
  position: 'absolute',
  right: 0,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
})

const Wrapper = styled('div', {
  outline: 'none',
  cursor: 'pointer',
  position: 'relative'
})
const draw = keyframes({
  '0%': {
    strokeDashoffset: '1000'
  },
  '80%': {
    strokeDashoffset: '800'
  },
  '100%': {
    strokeDashoffset: '400'
  }
})
const FoggyRight = styled('div', {
  width:'100px',

  '@md': {
    transition: 'all 200ms',
  width:'200px',
    opacity: 0,
    div: {
      background:
        'linear-gradient(-90deg, rgba(255,255,255,0) 50%, rgba(33,32,73,0.5) 100%)'
      // right: 30
    },
    '&:hover': {
      opacity: 1,
      div: {
        display: 'flex',
        left: 0,
        svg: {
          transform: 'scaleX(-1)',
          '-webkit-mask-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          'mask-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          path: {
            animation: `${draw} 0.6s linear 1`
          }
        }
      }
    }
  },
  '@lg': {
display:'none'
  }
})
const FoggyLeft = styled('div', {
  width:'100px',

  '@md': {
  width:'200px',

    opacity: 0,
    transition: 'all 400ms',
    div: {
      background:
        'linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(33,32,73,0.5) 100%)',
      right: 30
    },
    '&:hover': {
      opacity: 1,
      div: {
        display: 'flex',
        svg: {
          '-webkit-mask-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          'mask-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          path: {
            animation: `${draw} 0.6s linear 1`
          }
        }
      }
    }
  },
  '@lg': {
    display:'none'
      }
})

const Background = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 30%'
})

const Card = styled('a', {
  '&:focus': { outline: 'none' },
  outline: 'none',
  height: 540,
  width: '338px !important',
  position: 'relative',
  display: 'block',
  zIndex: 0,
  overflow: 'hidden',
  pointerEvents: 'none',

  '@md': {
    height: 'calc(100vh - 150px)',
    maxHeight: 650,
    minHeight: 300,
    width: '550px !important'
  },

  '@lg': {
    height: 'calc(100vh - 230px)',
    maxHeight: 540,
    minHeight: 300,
    width: '928px !important',
    transition: '150ms transform ease',

    '&:hover': {
      transform: 'scale(.98)'
    }
  },

  variants: {
    type: {
      small: {
        width: '100% !important',
        height: 646,
        maxHeight: 'unset',
        minHeight: 'unset'
      }
    }
  }
})

const Content = styled('div', {
  background: 'rgba(0, 0, 0, 0.53)',
  color: '$projectCard',
  position: 'relative',
  zIndex: '1',
  height: '100%',
  p: '56px 30px 55px',
  display: 'flex',
  flexDirection: 'column',

  '@md': {
    p: '57px 48px 25px'
  },

  '@lg': {
    p: '67px 56px 26px'
  }
})

const Title = styled('div', {
  fontSize: '$lg',
  fontWeight: 300,

  '@md': {
    fontSize: 40,
    fontWeight: 350
  }
})

const Details = styled('div', {
  mt: 'auto',

  '@md': {
    display: 'flex'
  }
})

const Info = styled('div', {
  '&:not(:last-child)': {
    mb: 30
  },

  '@md': {
    mb: 0,

    '&:not(:last-child)': {
      mr: 56
    }
  },

  '@lg': {
    '&:not(:last-child)': {
      mr: 49
    }
  }
})

const InfoTitle = styled('div', {
  fontSize: 15,
  fontWeight: 300,
  mb: 8,

  '@md': {
    fontSize: 16,
    fontWeight: 350
  },

  '@lg': {
    mb: 7
  }
})

const InfoValue = styled('div', {
  fontSize: 24,
  fontWeight: 350
})
