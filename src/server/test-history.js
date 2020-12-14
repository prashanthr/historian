// import { unfurl } from 'unfurl.js'
import u from 'unfurled'
import axios from 'axios'
import { sortBy } from 'lodash'
const unfurly = async ({ url }) => {
  console.log(`Unfurling ${url}...`)
  const result = await u(url, { oembed: true }) //unfurl({ url })
  // console.log('Unfurl result', result, JSON.stringify(result), result.ogp && JSON.stringify(result.ogp))
  return result
}

const unfurlHistoryItem = async ({ type, links, year, text, html, no_year_html }) => {
  // console.log('item', type, links, year, text, html, no_year_html)
  const unfurlHistoryLink = async ({ links }) => {
    if (links && links.length > 0) {
      const unfurledResult = await unfurly({ url: links[0].link })
      const { title, canonical, license } = unfurledResult.other || {}
      const { ogImage } = unfurledResult.ogp || {}
      return {
        title,
        license,
        canonical,
        media: {
          imageUrls: ogImage ? ogImage.map(i => i.url) : []
        }
      }
    } else {
      return null
    }
  }
  const data = {
    type,
    year,
    text,
    links,
    unfurlData: await unfurlHistoryLink({ links })
  }
  console.log('Item data', JSON.stringify(data), '\n')
  return data
}

const history = async ({ month, day }) => {
  console.log(`Getting history for ${month}/${day}`)
  const result = await axios.get(`http://history.muffinlabs.com/date/${month}/${day}`)
  // console.log('History result', result.data)
  return result.data
}

const combineHistoryByDate = ({ data, date, url }) => {
  const { Events, Births, Deaths } = data
  const combined = [ 
    ...Events.map(i => ({ ...i, type: 'event' })), 
    ...Births.map(i => ({ ...i, type: 'birth' })), 
    ...Deaths.map(i => ({ ...i, type: 'death' }))
  ]
  return {
    date,
    url,
    items: sortBy(combined, item => item.year)
  }
}

const test = async () => {
  const date = new Date()
  // const historyUrl = 'https://wikipedia.org/wiki/December_13'
  const historyData = await history({ month: date.getMonth() + 1, day: date.getDate() })
  const combinedHistory = combineHistoryByDate(historyData)
  const items = combinedHistory.items//.slice(0, 10)
  for (const item of items) {
    await unfurlHistoryItem(item)
  }
}

test().catch(err => console.log('Error running test', err))
