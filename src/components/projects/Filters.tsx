import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import { styled } from 'stitches.config'
import { Col, Grid } from '@ui'
import { SelectBox } from '@components/common/SelectBox'
import { ProjectItemTypes, FilterItemType } from './ProjectsList'
import useTranslation from 'next-translate/useTranslation'
import { pluralize } from '@utils/helpers/translation'
import { ProjectCategory } from '@utils/api/projects'

export type FiltersProps = HTMLAttributes<HTMLDivElement> & {
  amount: number
  selectedType: ProjectItemTypes
  selectedProjectType: number
  onItemTypeChange: (t: ProjectItemTypes) => void
  onProjectTypeChange: (t: number) => void
  itemTypes: FilterItemType[]
  categories: ProjectCategory[]
}

type ItemTypesStyleProperties = CSSProperties & {
  '--cursor-pos': string
}

export const Filters: FC<FiltersProps> = ({
  itemTypes,
  selectedType,
  selectedProjectType,
  categories,
  onItemTypeChange,
  onProjectTypeChange,
  amount
}) => {
  const { t } = useTranslation('projects')
  const selectedItems =
    selectedProjectType !== null ? [selectedProjectType] : []

  return (
    <Grid className={undefined} >
      <Col className={undefined}  xs={12} md={{ span: 10, start: 2 }}>
        <Wrapper>
          <Header>
            {pluralize(t, { key: 'projects_amount', amount })}
          </Header>
          <ItemTypes
            css={{ '@md': { order: 3, ml: 8 } }}
            style={
              {
                '--cursor-pos': `${
                  itemTypes.findIndex(
                    ({ type }) => type == selectedType
                  ) * 100
                }%`
              } as ItemTypesStyleProperties
            }
          >
            {itemTypes.map(({ type, icon: Icon }) => (
              <ItemType
                key={type}
                active={type == selectedType}
                onClick={() => onItemTypeChange(type)}
              >
                <Icon />
              </ItemType>
            ))}
          </ItemTypes>
          <SelectBox
            items={categories.map(({ id, name }) => ({
              id,
              label: name
            }))}
            selectedItems={selectedItems}
            placeholder={t('all_categories')}
            setItems={(items: number[]) =>
              onProjectTypeChange(items[0] || null)
            }
            multiple={false}
            css={{
              width: '100%',
              mt: 18,

              '@md': {
                width: 230,
                order: 2,
                mt: 0,
                ml: 'auto'
              },

              '@lg': {
                width: 370
              }
            }}
            canBeEmpty={true}
            type="small"
          />
        </Wrapper>
      </Col>
    </Grid>
  )
}

const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  px: 8,

  '@md': {
    px: 0,
    justifyContent: 'flex-start'
  }
})

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  color: '$projectsHeader',
  fontWeight: 350,
  fontSize: 14,
  letterSpacing: '-0.01em',
  ml: 22,

  '@md': {
    ml: 0,
    fontSize: 16,
  },

  '@lg': {
    fontSize: 18
  }
})

const ItemTypes = styled('div', {
  br: 40,
  height: 48,
  padding: 1,
  display: 'flex',
  flexWrap: 'nowrap',
  border: '1px solid $nav',
  color: '$splitter',
  position: 'relative',

  '@md': {
    height: 52
  },

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    br: 40,
    background: '$nav',
    top: 1,
    bottom: 1,
    left: 1,
    width: '33%',
    transform: 'translateX(var(--cursor-pos))',
    transition: '150ms transform ease-out',
    zIndex: -1
  }
})

const ItemType = styled('div', {
  flexGrow: 1,
  height: 44,
  width: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'color 150ms ease',

  '@md': {
    svg: {
      mt: 4
    }
  },

  '&:first-child': {
    br: '40px 0 0 40px'
  },

  '&:last-child': {
    br: '0 40px 40px 0'
  },

  '&:hover': {
    color: '$accent'
  },

  variants: {
    active: {
      true: {
        color: '$accent'
      }
    }
  }
})
