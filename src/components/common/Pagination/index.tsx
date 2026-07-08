import { cloneElement, FC, HTMLAttributes, ReactElement } from 'react'
import Link from 'next/link'
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
  setPage?: (page: number) => void
  // when provided, pagination items render as real crawlable <a href>
  // links (via next/link) instead of plain clickable divs
  getHref?: (page: number) => string
  css?: any
}

export const Pagination: FC<PaginationProps> = ({
  pagesCount,
  currentPage,
  isLoading,
  setPage,
  getHref,
  ...props
}) => {
  const items = formatPaginationItems(
    getPaginationItems(currentPage + 1, pagesCount)
  )

  const withLink = (
    page: number,
    disabled: boolean,
    child: ReactElement,
    key?: string
  ) => {
    if (!getHref || disabled) return cloneElement(child, { key })

    return (
      <Link href={getHref(page)} passHref key={key}>
        {child}
      </Link>
    )
  }

  const isPrevDisabled = currentPage === 0
  const isNextDisabled = currentPage === pagesCount - 1

  return (
    <StyledPagination loading={isLoading} {...props}>
      {withLink(
        currentPage - 1,
        isPrevDisabled,
        <ArrowLinkWrapper
          as={getHref ? 'a' : 'div'}
          onClick={() => {
            currentPage > 0 && setPage?.(currentPage - 1)
          }}
          disabled={isPrevDisabled}
        >
          <ArrowLink
            as="div"
            className="smallLeft"
            disabled={isPrevDisabled}
          />
        </ArrowLinkWrapper>
      )}
      {items.map(({ id, title, page }) => {
        const disabled = page === null

        return withLink(
          page,
          disabled,
          <PageCounter
            as={getHref && !disabled ? 'a' : 'div'}
            role={currentPage === page ? 'active' : 'inactive'}
            onClick={() => {
              !disabled && setPage?.(page)
            }}
            dots={disabled}
          >
            {currentPage === page && isLoading ? (
              <Spinner className={spinner()} />
            ) : (
              title
            )}
          </PageCounter>,
          id
        )
      })}
      {withLink(
        currentPage + 1,
        isNextDisabled,
        <ArrowLinkWrapper
          as={getHref ? 'a' : 'div'}
          onClick={() => {
            if (currentPage + 1 < pagesCount) setPage?.(currentPage + 1)
          }}
          disabled={isNextDisabled}
        >
          <ArrowLink
            as="div"
            className="smallRight"
            disabled={isNextDisabled}
          />
        </ArrowLinkWrapper>
      )}
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
