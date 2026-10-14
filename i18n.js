module.exports = {
  locales: ['en', 'uk'],
  defaultLocale: 'uk',
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/project/[slug]': ['project', 'projects'],
    '/about': ['about'],
    '/areas': ['areas'],
    '/career': ['career'],
    '/develop': ['develop', 'about'],
    '/general': ['general'],
    '/platform': ['platform'],
    '/rentcommercial': ['platform'],
    '/projects': ['projects'],
    '/services': ['services'],
    '/contacts': ['contacts'],
    '/inside_community': ['inside'],
    '/rent': ['contacts', 'rent'],
    '/news': ['news'],
    '/market': ['market']
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./public/locales/${lang}/${ns}.json`).then(
      (m) => m.default
    )
}
