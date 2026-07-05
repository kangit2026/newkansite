import React, { useState, useEffect, useRef } from 'react'
import { Col, Grid } from '@ui'
import { styled, css } from 'stitches.config'
import { SelectBox } from '@components/common/SelectBox'
import { Pagination } from '@components/common/Pagination'
import useTranslation from 'next-translate/useTranslation'
import {
  getVacancies,
  getVacanciesCategories,
  vacanciesCount,
  Vacancy
} from '@utils/api/vacancies'
import { Table } from '@components/common/Table'
import { useQuery } from 'react-query'
import { ScrollAnchor } from '@components/common/ScrollAnchor'
import { scrollToElement } from '@utils/helpers/animations'

export default function Career({
  vacancies: initialData,
  categories = []
}) {
  const [selectedCategories, setSelectedCategories] = useState<
    string[]
  >([])
  const [currentPage, setCurrentPage] = useState(0)
  const headingRef = useRef(null)
  const [canFetch, setCanFetch] = useState(false)
  const { t } = useTranslation('career')

  useEffect(() => {
    if (currentPage > 0) {
      setCanFetch(true)
    }
  }, [currentPage])

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setCanFetch(true)
    }
    setCurrentPage(0)
  }, [selectedCategories])

  const { isFetching, data } = useQuery<{
    data: Vacancy[]
    total: number
  }>(
    ['projects', currentPage, selectedCategories, canFetch],
    () =>
      getVacancies({
        page: currentPage,
        category: selectedCategories[0]
      }),
    {
      enabled: canFetch,
      initialData,
      onSuccess() {
        scrollToElement(headingRef.current)
      },
      cacheTime: 0
    }
  )

  const { data: vacancies, total } = data

  const pagesCount = Math.ceil(total / vacanciesCount)

  return (
    <div className={outer()}>
      <Wrapper>
        <Grid className={undefined} >
          <Col className={undefined} xs={{ span: 10, start: 2 }}>
            <Heading>
              <ScrollAnchor ref={headingRef} />
              <Title>{t('heading')}</Title>

              <Filters>
                <FiltersCity>{t('city')}</FiltersCity>
                <SelectBox
                  items={categories}
                  selectedItems={selectedCategories}
                  placeholder={t('all_categories')}
                  setItems={(items: string[]) =>
                    setSelectedCategories(items)
                  }
                  css={{
                    width: 203,

                    '@md': {
                      width: 248,
                      ml: 8
                    },

                    '@lg': {
                      width: '390px',
                      ml: 40
                    }
                  }}
                />
              </Filters>
            </Heading>
          </Col>
        </Grid>
        <FiltersMobile>
          {/* <Filters style={{ display: 'flex' }}> */}
          <Grid className={undefined}>
            <Col className={undefined}  xs={{ span: 10, start: 2 }}>
              <Heading>
                <Filters style={{ display: 'flex', marginTop: 0 }}>
                  <FiltersCity>{t('city')}</FiltersCity>
                  <SelectBox
                    items={categories}
                    selectedItems={selectedCategories}
                    placeholder={t('all_categories')}
                    setItems={(items: string[]) =>
                      setSelectedCategories(items)
                    }
                    css={{
                      width: 203,

                      '@md': {
                        width: 248,
                        ml: 8
                      },

                      '@lg': {
                        width: '390px',
                        ml: 40
                      }
                    }}
                  />
                </Filters>
              </Heading>
            </Col>
          </Grid>
          {/* </Filters> */}
        </FiltersMobile>
      </Wrapper>
      <Grid className={undefined}>
        <Col className={undefined}  xs={12} md={{ span: 10, start: 2 }}>
          <CareerText>{t('text')}</CareerText>
          <Table
            items={vacancies}
            external={true}
            options={{
              title: { style: 'default' },
              date: { style: 'description', optional: true }
            }}
            loading={isFetching}
          />
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            isLoading={isFetching}
            setPage={(page: number) => setCurrentPage(page)}
          />
        </Col>
      </Grid>
    </div>
  )
}

export async function getServerSideProps() {
  const [vacancies, categories] = await Promise.all([
    getVacancies({}),
    getVacanciesCategories()
  ])

  return {
    props: {
      vacancies: vacancies ?? { data: [], total: 0 },
      categories: categories ?? []
    }
  }
}
const CareerText = styled('div', {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '20px',
  whiteSpace: 'break-spaces',
  '@lg': {
    fontSize: '16px',
    lineHeight: '24px'
  }
})
const Wrapper = styled('div', {
  mt: 180,

  '@md': {
    background: '$ads',
    mt: 0,
    mb: 24,
    top: '0',
    zIndex: '10'
  },

  '@lg': {
    // mt: 231,
    mb: 35
  }
})
const outer = css({
  mt: 148,
  '@lg': {
    mt: 231
  }
})
const Heading = styled('div', {
  zIndex: '$career',
  color: '$accent',
  position: 'relative',

  '@md': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100
  },

  '@lg': { height: 116 }
})
const FiltersMobile = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  margin: 'unset',
  alignItems: 'center',
  height: 80,
  background: '$ads',
  // mx: -37,
  mt: 24,
  mb: -1,
  px: 14,
  '@md': {
    display: 'none'
  }
})
const Filters = styled('div', {
  display: 'none',

  justifyContent: 'space-between',
  margin: 'unset',
  alignItems: 'center',
  height: 80,
  background: '$ads',
  mx: -37,
  mt: 24,
  mb: -1,
  px: 14,
  // alignItems: 'center',
  // justifyContent: 'space-between',

  '@md': {
    display: 'flex',
    height: 'auto',
    ml: 'auto',
    mr: 'unset',
    my: 0,
    px: 0
  }
})

const FiltersCity = styled('span', {})

const Title = styled('div', {
  display: 'inline',
  fontSize: 24,
  fontWeight: 350,
  lineHeight: '36px',
  position: 'relative',

  '&:before': {
    content: '',
    background: 'rgba(0, 0, 0, 0.08)',
    position: 'absolute',
    width: '100vw',
    height: 1,
    top: 14,
    zIndex: -2,
    left: 'calc(78% - 50vw)'
  },

  '&:after': {
    content: '',
    display: 'block',
    background: '$background',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: -1,
    left: -16,
    right: -16
  },

  '@md': {
    background: '$ads',

    '&:before, &:after': {
      display: 'none'
    }
  },

  '@lg': {
    fontSize: 40,
    fontWeight: 300
  }
})
