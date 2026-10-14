import React from 'react'
import Image from 'next/image'
import { AdaptiveImage } from '@components/common/AdaptiveImage'
import {
  Block,
  Bordered,
  ChangeFlex,
  ColumnToRow,
  Divider,
  Final,
  FinalDescription,
  FinalImage,
  FinalImageBlue,
  FinalTitle,
  Flex,
  Line,
  More,
  Percent,
  PercentDescription,
  Ribbon,
  RibbonDescription,
  RibbonTitle,
  SimpleText,
  SimpleTextTitle,
  Small,
  Medium,
  Big,
  allnew,
  big,
  borderFlip,
  cropped,
  firstImage,
  flip,
  magic,
  magic2,
  magicNumber,
  magic_3,
  magic_t,
  margined,
  ml,
  moreLeft,
  perish,
  space,
  specialBordered,
  subNumber,
  subText,
  subsmall,
  subsmallTitle,
  withMargin
} from './styles'
import type { InsideCommunityBlock } from '@utils/api/insideCommunity'

const principleImages: Record<string, Parameters<typeof AdaptiveImage>[0]['srcSet']> = {
  prostir: require('@assets/inside_community/prostir.png?srcset'),
  '2': require('@assets/inside_community/2.png?srcset'),
  '3': require('@assets/inside_community/3.png?srcset'),
  '4': require('@assets/inside_community/4.png?srcset'),
  '5': require('@assets/inside_community/5.png?srcset'),
  '6': require('@assets/inside_community/6.png?srcset'),
  '7': require('@assets/inside_community/7.png?srcset'),
  '8b': require('@assets/inside_community/8b.png?srcset'),
  '9': require('@assets/inside_community/9.png?srcset')
}

const PrincipleImage = ({
  block,
  className
}: {
  block: InsideCommunityBlock
  className?: string
}) => {
  if (block.image) {
    return (
      <img
        src={block.image}
        alt={block.imageAlt || block.title || ''}
        className={className || space()}
        style={{ width: '100%', objectFit: 'cover' }}
      />
    )
  }

  if (block.number) {
    const file =
      block.number === 1 ? 'prostir' : block.number === 8 ? '8b' : String(block.number)
    const srcSet = principleImages[file]
    if (!srcSet) return null

    return (
      <AdaptiveImage
        className={className || space()}
        srcSet={srcSet}
        themed={false}
      />
    )
  }

  return null
}

const formatNumber = (number: number | null) => {
  if (!number) return ''
  return String(number).padStart(2, '0')
}

export const BlockRenderer = ({
  block,
  resolvedTheme
}: {
  block: InsideCommunityBlock
  resolvedTheme?: string
}) => {
  const borderColor =
    resolvedTheme === 'dark' ? '#e8e8e814' : '#e8e8e8'

  if (block.type === 'principle') {
    const layout = block.layout || 'full_flip'
    const isCompact = layout.startsWith('compact')
    const layoutClass = [
      layout === 'full_flip_first' && flip(),
      layout === 'full_flip' && `${flip()} ${magic()}`,
      layout === 'full_magic2' && magic2(),
      layout === 'full_magic_offset' && `${flip()} ${magic()} ${ml()} ${magic_3()}`,
      layout === 'full_magic_t' && `${flip()} ${magic()} ${magic_t()}`,
      isCompact && layout === 'compact_flip' && `${allnew()} ${flip()}`,
      isCompact && layout !== 'compact_flip' && allnew()
    ]
      .filter(Boolean)
      .join(' ')
    const trailingBreaks =
      isCompact ||
      layout === 'full_magic_offset' ||
      layout === 'full_magic_t'
        ? 3
        : layout === 'full_flip_first'
          ? 2
          : 0

    return (
      <ChangeFlex className={layoutClass}>
        <PrincipleImage
          block={block}
          className={[space(), layout === 'full_flip_first' ? firstImage() : '']
            .filter(Boolean)
            .join(' ')}
        />
        <Block>
          <SimpleTextTitle
            className={`${margined()} ${!isCompact ? subNumber() : ''} ${isCompact ? subsmallTitle() : ''}`}
          >
            {formatNumber(block.number)}
          </SimpleTextTitle>
          <SimpleTextTitle
            className={`${isCompact ? subText() : big()} ${isCompact ? subsmallTitle() : ''}`}
          >
            {block.title}
          </SimpleTextTitle>
          <SimpleText className={isCompact ? subsmall() : ''}>
            {block.description}
            {Array.from({ length: trailingBreaks }, (_, index) => (
              <br key={index} />
            ))}
          </SimpleText>
        </Block>
      </ChangeFlex>
    )
  }

  if (block.type === 'stat') {
    const layout = block.layout || 'default'

    return (
      <Bordered
        style={{
          marginTop: 24,
          borderColor
        }}
        className={[
          layout === 'default' && block.statValue === '80%' ? withMargin() : '',
          layout === 'special' ? `${borderFlip()} ${specialBordered()}` : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Flex>
          {block.statValue && (
            <Percent
              style={layout === 'special' ? { whiteSpace: 'pre' } : undefined}
            >
              {block.statValue}
            </Percent>
          )}
          {block.statLabel && (
            <PercentDescription
              className={
                layout === 'default' && block.statValue === '80%' ? cropped() : ''
              }
            >
              {block.statLabel}
            </PercentDescription>
          )}
        </Flex>
      </Bordered>
    )
  }

  if (block.type === 'highlight') {
    const layout = block.layout || 'default'

    return (
      <More
        style={{
          marginBottom: layout === 'with_icon' ? 64 : undefined,
          position: layout === 'with_icon' ? 'relative' : undefined
        }}
        className={layout === 'left' ? moreLeft() : ''}
      >
        {layout === 'with_icon' && (
          <FinalImageBlue>
            <Image
              src={`/inside_community/final-${resolvedTheme === 'dark' ? 'bright-white' : 'blue'}.svg`}
              alt="KAN"
              layout="fill"
              objectFit="contain"
              width={100}
            />
          </FinalImageBlue>
        )}
        {block.highlightSmall && <Small>{block.highlightSmall}</Small>}
        {block.highlightBig && <Big>{block.highlightBig}</Big>}
        {block.highlightMedium && <Medium>{block.highlightMedium}</Medium>}
      </More>
    )
  }

  if (block.type === 'ribbon') {
    return (
      <Ribbon>
        <RibbonTitle>{block.title}</RibbonTitle>
        <RibbonDescription>{block.description}</RibbonDescription>
      </Ribbon>
    )
  }

  if (block.type === 'final') {
    return (
      <Final>
        <FinalImage>
          <Image
            src="/inside_community/final.svg"
            alt="KAN"
            layout="fill"
            objectFit="contain"
            width={100}
          />
        </FinalImage>
        <FinalTitle>
          <div className={magicNumber()}>{block.number ?? 10}</div>
          <br />
          <br />
          {block.title}
        </FinalTitle>
        <FinalDescription>{block.description}</FinalDescription>
        <Divider style={{ width: '100%', margin: 0, background: 'AFAFBD' }} />
        {block.ctaText && (
          <FinalDescription style={{ color: '#fff', fontWeight: 500 }}>
            {block.ctaText}
          </FinalDescription>
        )}
      </Final>
    )
  }

  return null
}

export const renderBlocks = (
  blocks: InsideCommunityBlock[],
  resolvedTheme?: string
) => {
  const elements: React.ReactNode[] = []
  let i = 0
  let compactGroupStarted = false

  while (i < blocks.length) {
    const block = blocks[i]
    const isCompact =
      block.type === 'principle' && block.layout?.startsWith('compact')

    if (isCompact) {
      const group: InsideCommunityBlock[] = []
      while (
        i < blocks.length &&
        blocks[i].type === 'principle' &&
        blocks[i].layout?.startsWith('compact')
      ) {
        group.push(blocks[i])
        i++
      }

      elements.push(
        <ColumnToRow key={`compact-${group[0].id}`}>
          {group.map((item) => (
            <BlockRenderer
              key={item.id}
              block={item}
              resolvedTheme={resolvedTheme}
            />
          ))}
        </ColumnToRow>
      )
      elements.push(<Line key={`line-after-${group[0].id}`} />)
      compactGroupStarted = true
      continue
    }

    if (compactGroupStarted && block.type === 'highlight') {
      elements.push(
        <Divider key={`divider-${block.id}`} className={perish()} />
      )
      compactGroupStarted = false
    }

    if (block.type === 'principle' && block.number === 2) {
      elements.push(<Divider key="divider-principle-2" className={perish()} />)
    }

    elements.push(
      <BlockRenderer
        key={block.id}
        block={block}
        resolvedTheme={resolvedTheme}
      />
    )
    i++
  }

  return elements
}
