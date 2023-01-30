import React from 'react';

export type ColourType = {
  key: string;
  title: string;
  image: string | null;
  video: string | null;
  dominant: string;
  vibrant: string;
  darkVibrant: string;
  lightVibrant: string;
  lightMuted: string;
};

const ColourContext = React.createContext({
  index: 0,

  colourData: [
    // {
    //   key: 0,
    //   title: "intro",
    //   image: null,
    //   video: require("../../assets/beach-umbrella-colony-small.jpg"),
    //   dominant: "#345b5d",
    //   vibrant: "#b48143",
    //   darkVibrant: "#197773",
    //   lightVibrant: "#83cace",
    //   lightMuted: "#d0bbac",
    // },
    {
      key: 1,
      title: 'units',
      image: require('../../assets/beach-multi-palm-trees-argh-small.jpg'),
      video: null,
      dominant: '#384d43',
      vibrant: '#56a2bb',
      darkVibrant: '#3389a4',
      lightVibrant: '#ddb583',
      lightMuted: '#aac8d0',
    },
    {
      key: 2,
      title: 'gender',
      image: require('../../assets/beach-footsteps-small.jpg'),
      video: null,
      dominant: '#694a2f',
      vibrant: '#b27f52',
      darkVibrant: '#5b4028',
      lightVibrant: '#e4bc94',
      lightMuted: '#d4beaf',
    },
    {
      key: 3,
      title: 'age',
      image: require('../../assets/beach-solo-running-sand-small.jpg'),
      video: null,
      dominant: '#385a69',
      vibrant: '#16739a',
      darkVibrant: '#166f8c',
      lightVibrant: '#84c4ec',
      lightMuted: '#c4bab9',
    },
    {
      key: 4,
      title: 'height',
      video: null,
      image: require('../../assets/beach-triangle-palms-small.jpg'),
      dominant: '#4a472a',
      vibrant: '#04839c',
      darkVibrant: '#046c81',
      lightVibrant: '#7de6fb',
      lightMuted: '#c6baae',
    },
    {
      key: 5,
      title: 'frame',
      image: require('../../assets/beach-multi-palm-trees-argh-small.jpg'),
      video: null,
      dominant: '#384d43',
      vibrant: '#56a2bb',
      darkVibrant: '#3389a4',
      lightVibrant: '#ddb583',
      lightMuted: '#aac8d0',
    },
    {
      key: 6,
      title: 'weight',
      image: require('../../assets/blue-palm-trees-small.jpg'),
      video: null,
      dominant: '#404239',
      vibrant: '#058db1',
      darkVibrant: '#056478',
      lightVibrant: '#8ac4e4',
      lightMuted: '#9cb7cb',
    },
    {
      key: 7,
      title: 'result',
      image: require('../../assets/beach-white-sands-oh-so-ronery-small.jpg'),
      video: null,
      dominant: '#784b3c',
      vibrant: '#d27e38',
      darkVibrant: '#173f6a',
      lightVibrant: '#efa450',
      lightMuted: '#d0b99f',
    },
  ],
});

export const ColourProvider = ColourContext.Provider;
export default ColourContext;
