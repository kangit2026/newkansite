import { FC, HTMLAttributes } from 'react'
import { styled } from 'stitches.config'
import LightTheme from '@assets/menu/light-theme.svg?svgr'
import DarkTheme from '@assets/menu/dark-theme.svg?svgr'
import { useTheme } from 'next-themes'

export type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement> & {
  onChange?: () => void
  css?: any
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  ...props
}) => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <StyledSwitcher {...props}>
      <Buttons>
        <Button
          onClick={() => {
            setTheme('light')
          }}
          active={resolvedTheme == 'light'}
        >
          <LightTheme />
        </Button>
        <Button
          onClick={() => {
            setTheme('dark')
          }}
          active={resolvedTheme == 'dark'}
        >
          <DarkTheme />
        </Button>
        <State theme={resolvedTheme as 'light' | 'dark'} />
      </Buttons>
    </StyledSwitcher>
  )
}

const borderRadius = 50

const StyledSwitcher = styled('div', {
  width: 138,
  height: 56,
  border: '1px solid $navBlock',
  p: 1,
  borderRadius: borderRadius
})

const Buttons = styled('div', {
  display: 'flex',
  borderRadius,
  height: '100%',
  overflow: 'hidden',
  position: 'relative'
})

const Button = styled('button', {
  border: 'none',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$accent',
  cursor: 'pointer',
  background: 'transparent',
  transition: '125ms opacity ease, 125ms color ease',

  '&:hover': {
    opacity: 0.8
  },

  variants: {
    active: {
      true: {
        opacity: 1
      },
      false: {
        opacity: 0.4
      }
    }
  }
})

const State = styled('div', {
  width: 68,
  height: 53,
  borderRadius,
  position: 'absolute',
  background: '$navBlock',
  left: 0,
  top: 0,
  transition: '125ms transform ease-in-out',
  zIndex: -1,

  variants: {
    theme: {
      light: {
        transform: 'none'
      },
      dark: {
        transform: 'translateX(100%)'
      }
    }
  }
})
