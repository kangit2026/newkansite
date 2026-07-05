import React, { FC, useRef, useEffect } from 'react'
import { styled } from 'stitches.config'

export type VideoProps = {
  video: string
  className?: any
}

export const VideoContent: FC<VideoProps> = ({ video, ...props }) => {
  const videoWrapperRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const top = () => {
      if (
        videoWrapperRef.current &&
        videoRef.current &&
        videoRef.current.duration
      ) {
        const fps = 24
        const ratio = 3
        const topPos =
          videoWrapperRef.current.getBoundingClientRect().top
        const videoHeight = videoRef.current.clientHeight

        const framesCount = Math.floor(
          fps * videoRef.current.duration * ratio
        )

        let progress =
          (window.innerHeight - topPos - videoHeight) %
          (framesCount * 2)

        if (progress >= framesCount) {
          progress = framesCount * 2 - progress
        }

        const nextTime = progress / fps / ratio

        videoRef.current.currentTime = nextTime
      }

      return requestAnimationFrame(top)
    }

    const requestId = top()

    return () => cancelAnimationFrame(requestId)
  }, [])

  return (
    <VideoWrapper {...props} ref={videoWrapperRef}>
      <Video ref={videoRef}>
        <source src={video} type="video/mp4" />
      </Video>
    </VideoWrapper>
  )
}

const VideoWrapper = styled('div', {})
const Video = styled('video', {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})
