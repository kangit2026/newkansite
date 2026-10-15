const SECTIONS = [
  ['/projects', 'Проєкти', 'усі обʼєкти компанії'],
  ['/about', 'Про компанію', 'хто така KAN Development'],
  ['/services', 'Послуги', 'продаж і супровід'],
  ['/inside_community', 'Inside Community', 'життя в кварталах'],
  ['/market', 'KAN Market', 'комерційна нерухомість'],
  ['/career', 'Карʼєра', 'вакансії'],
  ['/news', 'Новини', 'публікації компанії'],
  ['/contacts', 'Контакти', 'форма заявки']
]

function headerValue(value) {
  if (!value) return ''
  const raw = Array.isArray(value) ? value[0] : value
  return raw.split(',')[0].trim()
}

function originFrom(req) {
  const proto = headerValue(req.headers['x-forwarded-proto']) || 'https'
  const host = headerValue(
    req.headers['x-forwarded-host'] || req.headers.host
  ).replace(/^www\./i, '')

  if (!host) return 'https://kandevelopment.com'
  return `${proto}://${host}`
}

async function readJson(url) {
  const response = await fetch(url, {
    headers: { 'Accept-Language': 'uk' }
  })
  if (!response.ok) return null
  return response.json()
}

export default async function llms(req, res) {
  const origin = originFrom(req)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || `${origin}/api`
  let phone = '+38 (044) 247 57 48'
  let email = 'office@kandevelopment.com'
  let projects = []

  try {
    const [settings, projectList] = await Promise.all([
      readJson(`${apiUrl}/settings`),
      readJson(`${apiUrl}/project?count=1000`)
    ])
    phone = settings?.data?.phone || phone
    email = settings?.data?.email || email
    projects = (projectList?.data || [])
      .filter((item) => item.slug && item.name)
      .map((item) => ({
        name: String(item.name).replace(/\s+/g, ' ').trim(),
        path: `/project/${item.slug}`,
        address: item.address ? String(item.address).replace(/\s+/g, ' ').trim() : '',
        featured: Boolean(item.isFeatured)
      }))
  } catch (error) {
    console.error(error)
  }

  const featured = projects.filter((item) => item.featured)
  const listed = featured.length ? featured : projects

  const lines = [
    '# KAN Development',
    '',
    `> Девелоперська компанія KAN Development, Київ. Будує житлові квартали, комерційні обʼєкти, школи і дитячі садки. Офіс: 01014, вул. Болсуновська, 13-15, IQ Бізнес-центр. Телефон: ${phone}. Пошта: ${email}.`,
    '',
    'Українська версія відкривається без префікса. Англійська версія тієї ж сторінки: додати `/en` перед шляхом. Наприклад, головна англійською — `/en`.',
    '',
    '## Розділи',
    '',
    ...SECTIONS.map(
      ([path, title, note]) => `- [${title}](${origin}${path}): ${note}`
    ),
    '',
    '## Проєкти',
    '',
    ...listed.map((item) => {
      const detail = item.address ? `: ${item.address}` : ''
      return `- [${item.name}](${origin}${item.path})${detail}`
    }),
    ''
  ]

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.status(200).send(lines.join('\n'))
}
