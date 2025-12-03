import React from 'react'

export type ColourType = {
  key: string
  title: string
  image: string | null
  video: string | null
  dominant: string
  vibrant: string
  darkVibrant: string
  lightVibrant: string
  lightMuted: string
  bottom1: string
  bottom2: string
}

const ColourContext = React.createContext({
  index: 0,

  colourData: [
    {
      key: 1,
      title: 'units',
      image: require('../assets/images/beach-multi-palm-trees-argh-small.jpg'),
      video: null,
      dominant: '#384d43',
      vibrant: '#56a2bb',
      darkVibrant: '#3389a4',
      lightVibrant: '#ddb583',
      lightMuted: '#aac8d0',
      bottom1: 'rgb(25, 26, 29)',
      bottom2: 'rgb(9, 21, 39)',
    },
    {
      key: 2,
      title: 'gender',
      image: require('../assets/images/beach-footsteps-small.jpg'),
      video: null,
      dominant: '#694a2f',
      vibrant: '#b27f52',
      darkVibrant: '#5b4028',
      lightVibrant: '#e4bc94',
      lightMuted: '#d4beaf',
      bottom1: 'rgb(25, 26, 29)',
      bottom2: 'rgb(9, 21, 39)',
    },
    {
      key: 3,
      title: 'age',
      image: require('../assets/images/beach-solo-running-sand-small.jpg'),
      video: null,
      dominant: '#385a69',
      vibrant: '#16739a',
      darkVibrant: '#166f8c',
      lightVibrant: '#84c4ec',
      lightMuted: '#c4bab9',
      bottom1: 'rgb(25, 26, 29)',
      bottom2: 'rgb(9, 21, 39)',
    },
    {
      key: 4,
      title: 'height',
      video: null,
      image: require('../assets/images/beach-triangle-palms-small.jpg'),
      dominant: '#4a472a',
      vibrant: '#04839c',
      darkVibrant: '#046c81',
      lightVibrant: '#7de6fb',
      lightMuted: '#c6baae',
      bottom1: 'rgb(38, 27, 21)',
      bottom2: 'rgb(25, 26, 29)',
    },
    {
      key: 5,
      title: 'frame',
      image: require('../assets/images/beach-multi-palm-trees-argh-small.jpg'),
      video: null,
      dominant: '#384d43',
      vibrant: '#56a2bb',
      darkVibrant: '#3389a4',
      lightVibrant: '#ddb583',
      lightMuted: '#aac8d0',
      bottom1: 'rgb(25, 26, 29)',
      bottom2: 'rgb(9, 21, 39)',
    },
    {
      key: 6,
      title: 'weight',
      image: require('../assets/images/blue-palm-trees-small.jpg'),
      video: null,
      dominant: '#404239',
      vibrant: '#058db1',
      darkVibrant: '#056478',
      lightVibrant: '#8ac4e4',
      lightMuted: '#9cb7cb',
      bottom1: 'rgb(38, 27, 21)',
      bottom2: 'rgb(25, 26, 29)',
    },
    {
      key: 7,
      title: 'result',
      image: require('../assets/images/beach-white-sands-oh-so-ronery-small.jpg'),
      video: null,
      dominant: '#784b3c',
      vibrant: '#d27e38',
      darkVibrant: '#173f6a',
      lightVibrant: '#efa450',
      lightMuted: '#d0b99f',
      bottom1: 'rgb(38, 27, 21)',
      bottom2: 'rgb(25, 26, 29)',
    },
    {
      key: 8,
      title: 'resultBMI',
      image: require('../assets/images/beach-footsteps-small.jpg'),
      video: null,
      dominant: '#784b3c',
      vibrant: '#d27e38',
      darkVibrant: '#173f6a',
      lightVibrant: '#efa450',
      lightMuted: '#d0b99f',
      bottom1: 'rgb(25, 26, 29)',
      bottom2: 'rgb(9, 21, 39)',
    },
    {
      key: 9,
      title: 'resultAI',
      image: require('../assets/images/beach-white-sands-oh-so-ronery-small.jpg'),
      video: null,
      dominant: '#784b3c',
      vibrant: '#d27e38',
      darkVibrant: '#173f6a',
      lightVibrant: '#efa450',
      lightMuted: '#d0b99f',
      bottom1: 'rgb(25, 26, 29)',
      bottom2: 'rgb(9, 21, 39)',
    },
  ],
})

export const ColourProvider = ColourContext.Provider
export default ColourContext
