import { getMediaQueryHelpers } from '@ui'
const config = require('../../../config/grid.json')

export const gridConfig: any = config

export const { breakPointUp, breakPointDown } =
  getMediaQueryHelpers(config)
