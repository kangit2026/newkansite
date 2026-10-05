declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export const getRecaptchaToken = (action = 'contact'): Promise<string> => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    return Promise.resolve('')
  }

  if (typeof window === 'undefined' || !window.grecaptcha) {
    return Promise.reject(new Error('reCAPTCHA is not loaded'))
  }

  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(siteKey, { action })
        .then(resolve)
        .catch(reject)
    })
  })
}
