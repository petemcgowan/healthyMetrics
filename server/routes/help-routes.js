import express from 'express'
// const express = require('express')
const helpRoute = express.Router()
// import { sequelize } from '../server.mjs'
import Sequelize from 'sequelize'
// import db from '../models/index.mjs'
// const db = require('../models')
import { createClient } from 'redis'
// const { createClient } = require('redis')
// const redisClientHelper = require('../models')
import { sequelize, Help, References } from '../server.mjs'

// const helpRouteSequelize = new Sequelize({
//   database: process.env.POSTGRES_DB,
//   username: process.env.POSTGRES_USER,
//   host: process.env.PGHOST,
//   port: 5432,
//   password: process.env.POSTGRES_PASSWORD,
//   dialect: 'postgres',
//   operatorsAliases: 0,
//   freezeTableName: true,
//   timestamps: false,
// })

helpRoute.post('/new', (req, res) => {
  Help.create({
    subHeading: req.body.subHeading,
  }).then((newHelp) => res.send(newHelp))
})

// async function setAllHelpCacheLean(redisClientJSON, allHelp) {
//   await redisClientJSON.json.set('allHelpCache', '.', { allHelp })
// }

// async function getAllHelpCache(res) {
//   let allHelpCache = null
//   try {
//     const redisClientJSON = createClient({
//       url: 'redis://redis-server:6379',
//       port: 6379,
//     })

//     await redisClientJSON.connect()
//     allHelpCache = await redisClientJSON.json.get('allHelpCache')
//     console.log('value of allHelpCache:' + JSON.stringify(allHelpCache))

//     if (!allHelpCache) {
//       Help.findAll({
//         include: [References],
//       }).then((allHelp) => {
//         console.log('Has retrieved all help, now cache it')
//         // console.log('allHelp:' + allHelp)
//         // await redisClientJSON.json.set('allHelpCache', '.', { newHelp })
//         setAllHelpCache(allHelp)
//         // await setAllHelpCacheLean(redisClientJSON, allHelp)
//         res.send(allHelpCache)
//         return allHelp
//       })
//     } else {
//       await res.send(allHelpCache)
//     }
//     await redisClientJSON.quit()
//   } catch (error) {
//     console.error('getAllHelpCache, error:' + error)
//   }
// }

////////// THE GET/////////
////////// THE GET/////////
////////// THE GET/////////
helpRoute.get('/all', (req, res) => {
  console.log('helpRoutes: main')

  // If there's a allHelp value, Json.Get it, then return it.  Otherwise go to the DB
  const allHelpCache = getAllHelpCache(res)
  console.log('getAllHelpCache, allHelpCache:' + allHelpCache)

  // if (!allHelpCache) {
  //   db.Help.findAll({
  //     include: [db.References],
  //   }).then((allHelp) => {
  //     console.log('Has retrieved all help, now cache it')
  //     // console.log('allHelp:' + allHelp)
  //     setAllHelpCache(allHelp)
  //     res.send(allHelp)
  //   })
  // }
})

////////// THE SET/////////
////////// THE SET/////////
////////// THE SET/////////

// TODO Do the Redis set here IF you're making a change to the DB, which you must be if you're here.  Makes no difference if it's different, make the change anyways
helpRoute.post('/fillHelp', (req, res) => {
  // Units / null

  // await db.sync({ force: true });
  // db.Help.Create([
  Help.bulkCreate(
    [
      {
        subHeading: 'Units',
        helpText: `Do you weigh yourself in pounds?  Stones and Pounds?  Kg?  Specify that on this page!\n\n\nDo you measure your height in cm (metric) or feet and inches (imperial)?\n\n\nSpecify here and we'll stick to that unless you change it here...\n`,
        References: [
          {
            shortTitle: null,
            title: null,
            link: null,
          },
        ],
      },
      //   {
      //     include: [db.References],
      //   }
      // ).then((newHelp) => res.send(newHelp))

      // Gender / Sex differences
      // db.Help.create(
      {
        subHeading: 'Gender',
        helpText: `Generally, females weigh less than males even though they naturally have a higher percentage of body fat.\n\n     This is because the male body generally has higher muscle mass, and muscle is heavier than fat.\n\n    * Women generally have lower bone density.\n\n    * Last but not least, males tend to be taller than females\n`,
        References: [
          {
            shortTitle: 'sex differences',
            title:
              'Sex differences in human adipose tissues: the biology of pear shape',
            link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3411490/',
          },
        ],
      },
      //   {
      //     include: [db.References],
      //   }
      // ).then((newHelp) => res.send(newHelp))

      // Age / relationship aging
      // db.Help.create(
      {
        subHeading: 'Age',
        helpText: `In theory, age shouldn't be a large determinant of an ideal body weight past the ages of 14-15 for girls and 16-17 for boys, after which most people stop growing.\n\n      It is actually expected that human males and females to lose 1.5 and 2 inches in height respectively by age 70.\n\n      It is possible to remove the effects of aging by adopting various habits such as monitoring diet, exercise, stress, supplementation and sleep.`,
        References: [
          {
            shortTitle: 'relationship aging',
            title:
              'A Research Agenda: The Changing Relationship Between Body Weight and Health in Aging',
            link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4984841/',
          },
        ],
      },
      //   {
      //     include: [db.References],
      //   }
      // ).then((newHelp) => res.send(newHelp))

      // Height / drug dosage
      // db.Help.create(
      {
        subHeading: 'Height',
        helpText: `The taller the person, the more muscle mass and body fat they have, which results in more weight. A male at a similar height to a female should weigh about 10-20% heavier.`,
        References: [
          {
            shortTitle: 'drug dosage',
            title:
              'Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M, Determination of ideal body weight for drug dosage calculations. Am J Hosp Parm 1983',
            link: 'https://pubmed.ncbi.nlm.nih.gov/6869387/',
          },
        ],
      },
      //   {
      //     include: [db.References],
      //   }
      // ).then((newHelp) => res.send(newHelp))

      // Frame / How to Measure
      // db.Help.create(
      {
        subHeading: 'Frame',
        helpText: `Body frame size is another factor that can have a significant impact on the measurement of ideal weight.\n\n      Body frame size is typically categorized as small, medium, or large boned. It is measured based on the circumference of a person's wrist in relation to their height, as shown below.\n\n      For women:\n\n      Height under 5 ft 2 in\n      Small boned = wrist size less than 5.5 in\n      Medium boned = wrist size 5.5 in to 5.75 in\n      Large boned = wrist size over 5.75 in\n      Height between 5 ft 2 in and 5 ft 5 in\n      Small boned = wrist size less than 6 in\n      Medium boned = wrist size 6 in to 6.25 in\n      Large boned = wrist size over 6.25 in\n      Height over 5 ft 5 in\n      Small boned = wrist size less than 6.25 in\n      Medium boned = wrist size 6.25 in to 6.5 in\n      Large boned = wrist size over 6.5 in\n\n      For men:\n\n      Height over 5 ft 5 in\n      Small boned = wrist size 5.5 in to 6.5 in\n      Medium boned = wrist size 6.5 in to 7.5 in\n      Large boned = wrist size over 7.5 in\n\n      A person who is large boned will naturally weigh more than someone who is small boned, even at the same height, making body frame size a factor that can affect measurements such as IBW and BMI.\n`,
        References: [
          {
            shortTitle: 'How to Measure',
            title: 'How to Measure Your Wrist to Get Your Body Frame Size',
            link: 'https://www.livestrong.com/article/175491-how-to-measure-wrist-size-for-body-frame-measurement/',
          },
        ],
      },
      //   {
      //     include: [db.References],
      //   }
      // ).then((newHelp) => res.send(newHelp))

      // Weight / Ideal Body Weight
      // db.Help.create(
      {
        subHeading: 'Weight',
        helpText: `      Although healthy body weight (HBW) today is sometimes based on perceived visual appeal, HBW was actually introduced to estimate dosages for medical use, and the formulas that calculate it are not at all related to how a person looks at a given weight.\n\n      It has since been determined that the metabolism of certain drugs is more based on HBW than it is total body weight. Today, HBW is also used widely throughout sports, since many sports classify people based on their body weight.\n\n      Note that HBW is not a perfect measurement. It does not consider the percentages of body fat and muscle in a person's body. This means that it is possible for highly fit, healthy athletes to be considered overweight based on their HBW.\n\n      This is why HBW should be considered with the perspective that it is an imperfect measure and not necessarily indicative of health, or a weight that a person should necessarily strive toward; it is possible to be over or under your "HBW" and be perfectly healthy.\n\n      How much a person should weigh is not an exact science. It is highly dependent on each individual. Thus far, there is no measure, be it HBW, body mass index (BMI), or any other that can definitively state how much a person should weigh to be healthy.\n\n      They are only references, and it's more important to adhere to making healthy life choices such as regular exercise, eating a variety of unprocessed foods, getting enough sleep, etc. than it is to chase a specific weight based on a generalized formula.\n\n      That being said, many factors can affect the healthy weight; the major factors are listed below. Other factors include health conditions, fat distribution, progeny, etc.\n`,
        References: [
          {
            shortTitle: 'Ideal Body Weight',
            title: 'Ideal Body Weight',
            link: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/ideal-body-weight',
          },
        ],
      },
    ],
    {
      include: [References],
    }
  ).then((newHelp) => {
    setAllHelpCache(newHelp)
    res.send(newHelp) // set the newly set values in the cache
  })
})

// module.exports = helpRoute

export default helpRoute
