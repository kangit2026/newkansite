import { FC, HTMLAttributes } from 'react'
import { css, styled } from 'stitches.config'
import { ArrowLink } from '@components/common/ArrowLink'
import {
  formatPaginationItems,
  getPaginationItems
} from '@utils/helpers'
import { Spinner } from '@components/Spinner'

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  pagesCount: number
  currentPage: number
  isLoading?: boolean
  setPage: (page: number) => void
  css?: any
}

export const Pagination: FC<PaginationProps> = ({
  pagesCount,
  currentPage,
  isLoading,
  setPage,
  ...props
}) => {
  const items = formatPaginationItems(
    getPaginationItems(currentPage + 1, pagesCount)
  )

  return (
    <StyledPagination loading={isLoading} {...props}>
      <ArrowLinkWrapper
        onClick={() => {
          currentPage > 0 && setPage(currentPage - 1)
        }}
        disabled={currentPage === 0}
      >
        <ArrowLink
          as="div"
          className="smallLeft"
          disabled={currentPage === 0}
        />
      </ArrowLinkWrapper>
      {items.map(({ id, title, page }) => (
        <PageCounter
          key={id}
          role={currentPage === page ? 'active' : 'inactive'}
          onClick={() => {
            page !== null && setPage(page)
          }}
          dots={page === null}
        >
          {currentPage === page && isLoading ? (
            <Spinner className={spinner()} />
          ) : (
            title
          )}
        </PageCounter>
      ))}
      <ArrowLinkWrapper
        onClick={() => {
          if (currentPage + 1 < pagesCount) setPage(currentPage + 1)
        }}
        disabled={currentPage === pagesCount - 1}
      >
        <ArrowLink
          as="div"
          className="smallRight"
          disabled={currentPage === pagesCount - 1}
        />
      </ArrowLinkWrapper>
    </StyledPagination>
  )
}

const spinner = css({
  mb: -3
})

const ArrowLinkWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  variants: {
    disabled: {
      true: {
        cursor: 'default'
      }
    }
  },

  [`& ${ArrowLink}`]: {
    m: '0 12px!important'
  }
})

const PageCounter = styled('div', {
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
  lineHeight: '40px',
  width: 40,
  height: 40,
  transition: 'background 150ms ease, color 150ms ease',

  '&:hover': {
    color: '$contrast'
  },

  variants: {
    role: {
      active: {
        color: '$contrast',
        background: '$pagination',
        flexShrink: 0
      },
      inactive: {
        color: '$disabled'
      }
    },
    dots: {
      true: {
        pointerEvents: 'none',
        cursor: 'default'
      }
    }
  }
})

const StyledPagination = styled('div', {
  display: 'flex',
  justifyContent: 'center',

  variants: {
    loading: {
      true: {
        pointerEvents: 'none'
      }
    }
  }
})
