import React, { FC, useRef, useState, useEffect } from 'react'
import PlayIcon from '@assets/home/play.svg?svgr'
import { styled } from 'stitches.config'

export type ManifestVideoProps = {
  src?: string | null
}

export const ManifestVideo: FC<ManifestVideoProps> = ({ src }) => {
  const [isPaused, setIsPaused] = useState(true)
  const videoRef = useRef(null)

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    if (isPaused != videoRef.current.paused) {
      toggleVideo()
    }
  }, [isPaused])

  return (
    <VideoWrapper
      data-playing={!isPaused ? 'playing' : null}
      onClick={toggleVideo}
    >
      <Video
        onPause={() => {
          setIsPaused(videoRef.current.paused)
        }}
        onPlay={() => {
          setIsPaused(false)
        }}
        ref={videoRef}
        playsInline={true}
        // poster={'/preview_video_update.png'}
        preload="metadata"
        // poster={require('@assets/home/poster.jpg?inline').default}
      >
        <source
          src={`${src || '/home/manifest.mp4'}#t=0.001`}
          type="video/mp4"
        />
      </Video>

      <PlayButton visible={isPaused}>
        <PlayIcon />
      </PlayButton>
    </VideoWrapper>
  )
}

const VideoWrapper = styled('div', {
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
  margin: '168px auto 0',
  width: '100vw',
  left: '50%',
  marginLeft: '-50vw',
  height: '375px',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: '100ms clip-path ease',
  clipPath: `polygon(
    50% 0%,
    calc(50% + 133px) 50%,
    50% 100%,
    50% 100%,
    calc(50% - 132px) 50%,
    50% 0%
  )`,
  '&[data-playing="playing"]': {
    clipPath: `polygon(
      100% 0%,
      100% 50%,
      100% 100%,
      0% 100%,
      0% 50%,
      0% 0%
    )`
  },

  '@md': {
    height: 272,
    mt: 84,
    width: 424,
    left: 'unset',
    ml: -85,
    clipPath:
      'polygon(50% 0%, calc(50% + 96px) 50%, 50% 100%, 50% 100%, calc(50% - 96px) 50%, 50% 0%)'
  },

  '@lg': {
    height: 451,
    width: 697,
    mt: 12,
    ml: -182,
    clipPath:
      'polygon(50% 0%,calc(50% + 146px) 50%, 50% 100%, 50% 100%, calc(50% - 146px) 50%, 50% 0%)'
  },

  '@xl': {
    height: 491,
    width: 753,
    mt: 155,
    ml: -144,
    clipPath:
      'polygon(50% 0%,calc(50% + 173px) 50%, 50% 100%, 50% 100%, calc(50% - 173px) 50%, 50% 0%)'
  },
})

const Video = styled('video', {
  height: '100%',
  marginLeft: '15px',
  background: '$accent',
  objectPosition: '-48px center',

  '@md': { objectPosition: '-28px' },
  '@lg': { objectPosition: '-60px' }
})

const PlayButton = styled('button', {
  color: '#ffffff',
  backgroundColor: '#12113d',
  border: 'none',
  borderRadius: 3,
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  mt: -18,
  width: 60,
  height: 35,
  transition: '75ms ease',
  opacity: 0,
  transform: 'scale(.9)',

  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'none'
      }
    }
  },

  '@md': {
    width: 56,
    height: 32,
    marginTop: -17
  }
})
