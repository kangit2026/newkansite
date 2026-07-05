import { FC } from 'react'
import { styled } from 'stitches.config'

export type SocialButtonProps = {
  title: string
  icon: FC
  link: string
}

export const SocialButton: FC<SocialButtonProps> = ({
  title,
  link,
  icon: Icon
}) => {
  return (
    <StyledSocialButton
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="social-button"
    >
      <Text>{title}</Text>
      <IconWrapper>
        <Icon />
      </IconWrapper>
    </StyledSocialButton>
  )
}

SocialButton.toString = () => '.social-button'

const StyledSocialButton = styled('a', {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '56px',
  backgroundColor: '$nav',
  transition: '150ms background-color ease, 150ms transform ease',

  '&:hover': {
    backgroundColor: '$navHover'
  },

  '&:active': {
    backgroundColor: '$navActive',
    transform: 'scale(.96)'
  },

  '@md': {
    width: '139px',
    height: '52px',
    borderRadius: '40px',
    justifyContent: 'space-between',
    pr: 18,
    pl: 24
  },

  '@lg': {
    pl: 22,
    width: 139,
    flexShrink: 0
  }
})

const Text = styled('h4', {
  display: 'none',
  color: '$accent',
  fontSize: '13px',
  lineHeight: '16px',
  fontWeight: 'normal',

  '@md': {
    display: 'flex',
    mb: -1
  },

  '@lg': {
    display: 'flex',
    mb: 0
  }
})

const IconWrapper = styled('div', {
  width: '24px',
  height: '24px',
  backgroundSize: '24px',
  color: '$social',
  display: 'flex',
  alignItems: 'center'
})
