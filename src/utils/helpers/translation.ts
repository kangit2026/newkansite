export const pluralize = (t, { key, amount }) => {
  const getPlural = (amount) => {
    if (amount == 0) return 'zero'

    const lastNumber = amount % 10
    if (lastNumber == 1) {
      if (amount % 100 == 11) return 'many'
      return 'one'
    } else if ([2, 3, 4].includes(lastNumber)) {
      if ([12, 13, 14].includes(amount % 100)) return 'many'
      return 'few'
    }

    return 'many'
  }

  const plural = getPlural(amount)
  return t(`${key}.${plural}`, { amount })
}
