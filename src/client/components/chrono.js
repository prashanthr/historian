import React from 'react'
import { Chrono } from 'react-chrono'
import SAMPLE_DATA from '../../data/history.json'
const Chronoo = ({ items, slideshow , mode, scrollable }) => (
  <Chrono 
    items={items} 
    slideShow={slideshow}
    mode={mode}
    scrollable={scrollable}
  />
)

Chronoo.defaultProps = {
  mode: 'VERTICAL_ALTERNATING',
  scrollable: true,
  slideshow: false,
  items: SAMPLE_DATA.map(i => ({
    title: i.year,
    cardTitle: i.links && i.links.length > 0 ? i.links[0].title : `${i.text.substr(0, 50)}...`,
    cardSubtitle: i.text,
    media: {
      type: "IMAGE",
      source: {
        url: i.unfurlData && i.unfurlData.media.imageUrls && i.unfurlData.media.imageUrls.length > 0 ? i.unfurlData.media.imageUrls[0] : ''
      }
    }
  }))
  // items: [{
  //   title: "May 1940",
  //   cardTitle: "Dunkirk",
  //   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  //   media: {
  //     type: "IMAGE",
  //     source: {
  //       url: "http://someurl/image.jpg"
  //     }
  //   }
  // }]
}

export default Chronoo
