/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import redis from 'redis'
import { createClient } from 'redis'
import helpRoute from './routes/help-routes.js'
import referenceRoute from './routes/reference-routes.js'

import Sequelize from 'sequelize'
import connection from './connection.json' assert { type: 'json' }

async function setAllHelpCache(newHelp) {
  try {
    console.log('****setAllHelpCache:Creating client')
    const redisClientJSON = createClient({
      url: 'redis://redis-server:6379',
      port: 6379,
    })

    console.log('****setAllHelpCache:Connecting')
    await redisClientJSON.connect()
    console.log(
      '****setAllHelpCache, Setting the cache with newHelp' +
        JSON.stringify(newHelp)
    )
    await redisClientJSON.json.set('allHelpCache', '.', newHelp)
    await redisClientJSON.quit()
  } catch (error) {
    console.error('setAllHelpCache, error:' + error)
  }
}

async function getAllHelpCache() {
  let allHelpCache = null
  try {
    const redisClientJSON = createClient({
      url: 'redis://redis-server:6379',
      port: 6379,
    })

    await redisClientJSON.connect()
    allHelpCache = await redisClientJSON.json.get('allHelpCache')
    console.log('****value of allHelpCache:' + JSON.stringify(allHelpCache))

    if (!allHelpCache) {
      Help.findAll({
        include: [References],
      }).then((allHelp) => {
        console.log(
          '****Has retrieved all help, now cache it' + JSON.stringify(allHelp)
        )
        setAllHelpCache(allHelp)
        return allHelp
      })
    } else {
      console.log(
        "****We're return allHelpCache from the cache:" +
          JSON.stringify(allHelpCache)
      )
      return allHelpCache
    }
    /*await*/ redisClientJSON.quit()
  } catch (error) {
    console.error('getAllHelpCache, error:' + error)
  }
}

async function fillHelp() {
  let allHelpCache = null
  try {
    // In case the tables have been deleted, sync will create them
    await sequelize.sync()

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
      console
      setAllHelpCache(newHelp)
      return newHelp
    })
    return newHelp
  } catch (error) {
    console.error('fillHelp, error:' + error)
  }
}

// Construct a schema, using GraphQL schema language aka typedefs
var schema = buildSchema(`
type References {
  id: Int
  shortTitle: String
  title: String
  link: String
  HelpId: Int
}

type Help {
  id: Int
  subHeading: String
  helpText: String
  References: [References]
}

type Mutation {
  fillHelp: [Help]
}

  type Query {
    hello: String
    allHelp: [Help]
    allReferences: String
  }
`)

// The resolvers provides a resolver function for each API endpoint
var resolvers = {
  hello: () => {
    return 'Hello world!'
  },
  fillHelp: () => {
    console.log('resolvers fillHelp')
    return fillHelp()
  },
  allHelp: () => {
    return getAllHelpCache()
  },
  allReferences: () => {
    return 'allReferences return!'
  },
}

///////////////GRAPHQL/////////////////////////////////////////

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
}

const { DataTypes } = Sequelize
export const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  host: process.env.PGHOST,
  port: connection.port,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  operatorsAliases: 0,
  freezeTableName: true,
  timestamps: false,
})

export const Help = sequelize.define(
  'Help',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subHeading: { type: DataTypes.STRING, allowNull: false },
    helpText: { type: DataTypes.TEXT, allowNull: false },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)

export const References = sequelize.define(
  'References',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    shortTitle: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
  },
  DISABLE_SEQUELIZE_DEFAULTS
)

Help.hasMany(References, {
  onDelete: 'cascade',
})

References.belongsTo(Help, {
  foreignKey: {
    allowNull: false,
  },
})

await sequelize.sync()

//////////////STANDARD REST/////////
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/api/help', helpRoute)
app.use('/api/reference', referenceRoute)

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

///////////////GRAPHQL/////////////////////////////////////////

const graphQLApp = express()
graphQLApp.use(express.json())
graphQLApp.use(cors())
graphQLApp.use(express.urlencoded({ extended: true }))
graphQLApp.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
)
graphQLApp.listen(4000)
console.log('Running a GraphQL API server at $server$:4000/graphql')

///////////////GRAPHQL/////////////////////////////////////////

//////////////////////REDIS START

console.log('before createClient')
const redisClient = await redis.createClient({
  // host: 'redis-server',
  url: 'redis://redis-server:6379',
  port: 6379,
})

//////////////////////REDIS END

async function redisTest() {
  const key = 'cat'
  try {
    await redisClient.set(key, 'Bongo')
    const result = await redisClient.get(key)
    console.log('redisClient.get:' + result)
  } catch (error) {
    console.error(error)
  }
  redisClient.disconnect()
}

// Used as a diagnostic tool
redisClient.connect(() => console.log('Connected to Redis server'))

redisTest()

// REST app listen
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` /*.yellow.bold*/
  )
)
