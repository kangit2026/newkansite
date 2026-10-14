import { AdaptiveImage, ThemingMode } from '@components/common/AdaptiveImage'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { usePersistLocale } from '@utils/hooks/use-persist-locale'
import type { InsideCommunityContent } from '@utils/api/insideCommunity'
import { renderBlocks } from './BlockRenderer'
import {
  bgImage,
  bgRombus,
  bgRombusDark,
  community,
  Complexes,
  ContentImg,
  fontHelp,
  LiveBe,
  LiveBeDescription,
  LiveBeOther,
  LiveBeSubTitle,
  LiveBeTitle,
  Line,
  Philosophy,
  PhilosophyDescription,
  PhilosophyTitle,
  Principles,
  Video,
  VideoWrapper,
  Wrapper
} from './styles'

type Props = {
  content?: InsideCommunityContent
}

export const InsideCommunity = ({ content }: Props) => {
  const locale = usePersistLocale()
  const { resolvedTheme } = useTheme()

  const heroTitle = content?.hero?.title || ''
  const heroSubtitle = content?.hero?.subtitle || ''
  const paragraphs = (content?.hero?.paragraphs || []).filter(Boolean)
  const philosophyTitle = content?.philosophy?.title || ''
  const philosophySubtitle = content?.philosophy?.subtitle || ''

  const heroVideo = content?.hero?.video || '/inside_community/kan_inside.mp4'
  const heroImage =
    locale === 'uk'
      ? content?.hero?.imageUk
      : content?.hero?.imageEn

  const complexLogos =
    content?.complexLogos?.length >= 2
      ? content.complexLogos
      : ['/inside_community/respublica.svg', '/inside_community/faina.svg']

  const blocks = content?.blocks?.length ? content.blocks : null

  return (
    <div className={fontHelp()}>
      <Wrapper>
        <VideoWrapper>
          <Video className={bgImage()} autoPlay loop muted>
            <source src={heroVideo} type="video/mp4" />
          </Video>
        </VideoWrapper>

        {heroImage ? (
          <img src={heroImage} className={community()} alt={content?.hero?.imageAlt || heroTitle} />
        ) : (
          <AdaptiveImage
            className={community()}
            srcSet={
              locale === 'uk'
                ? require('@assets/inside_community/community.png?srcset')
                : require('@assets/inside_community/community.svg?srcset')
            }
            themed={false}
          />
        )}

        <Complexes>
          <ContentImg>
            <Image
              src={complexLogos[0]}
              alt={content?.complexLogoAlts?.[0] || 'KAN'}
              layout="fill"
              objectFit="contain"
              width={100}
            />
          </ContentImg>
          <Line />
          <ContentImg>
            <Image
              src={complexLogos[1]}
              alt={content?.complexLogoAlts?.[1] || 'KAN'}
              layout="fill"
              objectFit="contain"
              width={100}
            />
          </ContentImg>
        </Complexes>

        <LiveBe style={{ ...(resolvedTheme === 'dark' && { background: 'none' }) }}>
          <AdaptiveImage
            className={`${bgRombus()} ${resolvedTheme === 'dark' && bgRombusDark()}`}
            srcSet={require('@assets/inside_community/rombus.png?srcset&themed')}
            themed={true}
            themingMode={ThemingMode.File}
          />
          <LiveBeTitle>{heroTitle}</LiveBeTitle>
          <LiveBeOther>
            <LiveBeSubTitle>{heroSubtitle}</LiveBeSubTitle>
            <LiveBeDescription>
              {paragraphs.map((paragraph, index) => (
                <span key={index}>
                  {index > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {paragraph}
                </span>
              ))}
            </LiveBeDescription>
          </LiveBeOther>
        </LiveBe>

        <Philosophy
          style={{
            ...(resolvedTheme === 'dark' && { border: '1px solid #ffffff14' })
          }}
        >
          <PhilosophyTitle>{philosophyTitle}</PhilosophyTitle>
          <PhilosophyDescription>{philosophySubtitle}</PhilosophyDescription>
        </Philosophy>

        <Principles>
          {blocks ? renderBlocks(blocks, resolvedTheme) : null}
        </Principles>
      </Wrapper>
    </div>
  )
}
