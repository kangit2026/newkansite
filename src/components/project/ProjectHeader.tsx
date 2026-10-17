import { Col, Grid } from '@ui'
import { Project } from '@utils/api/project'
import React, { FC, RefObject, useRef, useState } from 'react'
import { css, styled } from 'stitches.config'
import { default as SlickSlider } from 'react-slick'
import { SliderPagination } from '@components/common/Slider/Pagination'
import Arrow from '@assets/home/arrow.svg?svgr'
import { scrollToElement } from '@utils/helpers/animations'

type ProjectHeaderProps = {
  details: Project
  anchorRef: RefObject<HTMLDivElement>
}

const ImageSlide = ({
  src,
  alt,
  priority = false
}: {
  src: string
  alt: string
  priority?: boolean
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Slide>
      <MainImage
        src={src}
        alt={alt}
        loaded={priority || loaded}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'auto' : 'async'}
        onLoad={() => setLoaded(true)}
      />
    </Slide>
  )
};

const Gallery: FC<{
  title: string
  images: { url: string; alt?: string | null }[]
  anchorRef: RefObject<HTMLDivElement>
}> = ({ title, images, anchorRef = { current: null } }) => {
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickPrev()
  }

  const nextSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickNext()
  }

  return (
    <>
      {images.length > 0 && (
        <SlickSlider 
          ref={(r) => {
            sliderRef.current = r
          }}
          beforeChange={(_, n) => setCurrentSlide(n)}>
        {images.map((picture, index) => (
          <div key={`${picture.url}-${index}`}>
            <ImageSlide
              src={picture.url}
              alt={picture.alt || title}
              priority={index === 0}
            />
          </div>
        ))}
      </SlickSlider>
      )}
      <Controls>
        <Grid className={undefined}  style={{ height: '100%' }}>
          <Col className={undefined} 
            xs={{ span: 10, start: 2 }}
            style={{ height: '100%', display: 'flex' }}
          >
            <HeaderContent>
              <TitleWrapper>
                <Title>{title}</Title>
                <Arrow
                  onClick={() => {
                    scrollToElement(anchorRef.current)
                  }}
                  className={arrow()}
                />
              </TitleWrapper>
              <SliderWrapper>
                {images.length > 0 && (
                  <SliderPagination
                    css={{
                      height: 47,
                      fontSize: 16,
                      width: 119,
                      justifyContent: 'space-between',

                      '.pagination-arrow': {
                        height: 15,
                        mb: -1
                      },

                      '@md': {
                        height: 51,
                        fontSize: 15,
                        width: 128,
                        p: '10px 20px 9px'
                      },

                      '@lg': {
                        height: 64,
                        width: 180,
                        p: '10px 23px 9px',

                        '.pagination-arrow': {
                          height: 20,
                          mb: -4,
                          width: 12
                        }
                      }
                    }}
                    infinite={true}
                    current={currentSlide}
                    total={images.length}
                    onNextSlide={nextSlide}
                    onPrevSlide={prevSlide}
                  />
                )}
              </SliderWrapper>
            </HeaderContent>
          </Col>
        </Grid>
      </Controls>
    </>
  )
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({
  details: { gallery, image, imageAlt, title },
  anchorRef
}) => {
  return (
    <Header>
      {gallery.length == 0 && image && (
        <ImageSlide src={image} alt={imageAlt || title} />
      )}
      <Gallery title={title} anchorRef={anchorRef} images={gallery} />
    </Header>
  )
}

const Header = styled('div', {
  position: 'relative',
  overflow: 'hidden',
  mb: -5,

  '&:before': {
    content: '',
    background:
      'linear-gradient(180deg, rgba(29, 29, 33, 0) 0%, #141416 100%)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 240,
    maxHeight: '100%',
    zIndex: 1,

    '@md': {
      height: 213
    },

    '@lg': {
      height: 400
    }
  }
})

const Slide = styled("div", {
  backgroundColor: "#141416",
  width: "100vw",
  height: "calc(100vh + 1px)",
  maxHeight: 700,
  minHeight: 500,
  position: "relative",
  overflow: "hidden",

  "@md": {
    maxHeight: 458,
    minHeight: 400,
    backgroundPosition: "center center",
  },

  "@lg": {
    minHeight: 600,
    maxHeight: 862,
  },
});

const MainImage = styled("img", {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  transition: "opacity 0.6s ease-in-out",
  opacity: 0,

  variants: {
    loaded: {
      true: { opacity: 1 }, // Fade in when loaded
    },
  },
});

const Controls = styled('div', {
  position: 'absolute',
  zIndex: 2,
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
})

const SliderWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  ml: 'auto'
})

const HeaderContent = styled('div', {
  display: 'flex',
  mt: 'auto',
  width: '100%',
  pb: 44,

  '@md': {
    pb: 62
  },

  '@lg': {
    pb: 96
  }
})

const TitleWrapper = styled('div', {
  color: '#ffffff',
  ml: -5,
  mt: -24,
  display: 'none',

  '@lg': {
    display: 'flex',
    flexDirection: 'column'
  }
})

const Title = styled('h1', {
  fontSize: 88,
  fontWeight: 300
})

const arrow = css({
  ml: 13,
  mt: 9,
  cursor: 'pointer'
})
