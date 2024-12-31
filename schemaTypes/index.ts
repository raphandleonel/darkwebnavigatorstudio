import {authorType} from './authorTypes'
import {bannerType} from './bannerTypes'
import {categoryType} from './categoryTypes'
import {contactUsSubmission} from './contactUs'
import {getListedApplication} from './getListedApplication'
// import {darkWebMarketType} from './darkWebMarketTypes'
import {postType} from './postType'
import {tagType} from './tagTypes'

export const schemaTypes = [
  postType,
  authorType,
  categoryType,
  tagType,
  bannerType,
  contactUsSubmission,
  getListedApplication,
  // darkWebMarketType,
]
