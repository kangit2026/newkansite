/* eslint-disable @next/next/no-sync-scripts */
import { preloadFonts } from '@styles/fonts'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'stitches.config'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* сайт ще в розробці — знімемо, коли будемо готові до індексації */}
          <meta name="robots" content="noindex, nofollow" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />

          <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" />
          <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" />
          <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-18059136-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-18059136-1');`
            }}
          ></script>
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <script
              src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              async
              defer
            />
          )}
          {preloadFonts.map((font) => (
            <link
              key={font}
              rel="preload"
              href={font}
              as="font"
              type="font/woff2"
              crossOrigin=""
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
