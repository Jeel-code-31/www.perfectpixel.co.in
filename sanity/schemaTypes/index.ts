// sanity/schemaTypes/index.ts (or similar path)

import project from './projectType'
import post from './postType'
import { authorType } from './authorType'
import category from './Objects/category'
import blockContent from './blockContentType'
import imageWithAlt from './imageWithalt'
import timelineItem from './Objects/timelineItem'
import awardItem from './Objects/awardItem'
import pressItem from './Objects/pressItem'
import download from './Objects/Download'
import seo from './Objects/seo'
import Client from './Client'

export const schema = {
  // Every type mentioned in your error MUST be in this list
  types: [
    project,
    post,
    authorType,
    category, 
    blockContent, 
   imageWithAlt,
    timelineItem, 
    awardItem, 
    pressItem, 
    download, 
    seo,
    Client
  ],
}