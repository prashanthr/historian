import React from 'react'
import { Chrono } from 'react-chrono'

const Chronoo = ({ items, slideshow , mode }) => (
  <Chrono 
    items={items} 
    slideShow={slideshow}
    mode={mode}
  />
)

Chronoo.defaultProps = {
  mode: 'VERTICAL_ALTERNATING',
  slideshow: false,
  items: [{
    title: "May 1940",
    cardTitle: "Dunkirk",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "http://someurl/image.jpg"
      }
    }
  }]
}

export default Chronoo
