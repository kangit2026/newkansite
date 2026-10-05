import { AdaptiveImage, ThemingMode } from '@components/common/AdaptiveImage'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
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
  const { t } = useTranslation('inside')
  const locale = usePersistLocale()
  const { resolvedTheme } = useTheme()

  const heroTitle = content?.hero?.title || t('2')
  const heroSubtitle = content?.hero?.subtitle || t('3')
  const paragraphs =
    content?.hero?.paragraphs?.length > 0
      ? content.hero.paragraphs
      : [t('4'), t('5'), t('6')]
  const philosophyTitle = content?.philosophy?.title || t('7')
  const philosophySubtitle = content?.philosophy?.subtitle || t('8')

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
          <img src={heroImage} className={community()} alt="" />
        ) : (
          <AdaptiveImage
            className={community()}
            srcSet={require(`@assets/inside_community/community.${locale === 'uk' ? 'png' : 'svg'}?srcset`)}
            themed={false}
          />
        )}

        <Complexes>
          <ContentImg>
            <Image
              src={complexLogos[0]}
              alt="KAN"
              layout="fill"
              objectFit="contain"
              width={100}
            />
          </ContentImg>
          <Line />
          <ContentImg>
            <Image
              src={complexLogos[1]}
              alt="KAN"
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
