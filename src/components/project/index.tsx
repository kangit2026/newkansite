import { Project as ProjectType } from '@utils/api/project'
import React, { FC, useRef } from 'react'
import { css, styled } from 'stitches.config'
import { ProjectContent } from './ProjectContent'
import { ProjectHeader } from './ProjectHeader'

type ProjectProps = { details: ProjectType }

export const Project: FC<ProjectProps> = ({ details }) => {
  const anchorRef = useRef(null)

  return (
    <Wrapper>
      <ProjectHeader anchorRef={anchorRef} details={details} />
      <ProjectContent
        ref={anchorRef}
        details={details}
        className={content()}
      />
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  color: '$accent'
})

const content = css({
  mt: 51,

  '@md': {
    mt: 0
  }
})
