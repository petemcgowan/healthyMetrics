'use strict'

// import fs from 'fs'
import { readdirSync } from 'fs'
import path from 'path'
import { basename, dirname } from 'path'
// import Sequelize from 'sequelize'
import Sequelize from 'sequelize'
import DataTypes from 'sequelize'
import process from 'process'

import { fileURLToPath } from 'url'
// import redis from 'redis'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// const __dirname = path.dirname(__filename)
// const basename = path.basename(__filename)

// const env = process.env.NODE_ENV || 'test'
const env = process.env.NODE_ENV || 'development'
// import config from  (__dirname + '/../config/config.json')[env]
console.log('__dirname:' + __dirname)
console.log(
  "(__dirname + '/../config/config.json')[env]:" +
    (__dirname + '/../config/config.json')[env]
)
import config from '../config/config.json' assert { type: 'json' }
console.log('config:' + JSON.stringify(config[env]))
// const config = import(__dirname + '/../config/config.json')[env]

// Redis
// const redisClientHelper = {}
// const { createClient } = require('redis')

// console.log('ModelsIndex: createClient')
// const redisClientHelper = redis.createClient({
//   // host: 'redis-server',
//   url: 'redis://redis-server:6379',
//   port: 6379,
// })

// // Used as a diagnostic tool
// console.log('ModelsIndex: connect')
// redisClientHelper.connect(() => console.log('Connected to Redis server'))

console.log('ModelsIndex: sequelize')
let sequelize
if (config[env].use_env_variable) {
  sequelize = await new Sequelize(
    process.env[config[env].use_env_variable],
    config
  )
} else {
  console.log(
    'sequelize config setup, database:' +
      config[env].database +
      ', username:' +
      config[env].username +
      ', password:' +
      config[env].password
  )

  console.log(
    'sequelize process setup, PGDATABASE:' +
      process.env.PGDATABASE +
      ', PGUSER:' +
      process.env.PGUSER +
      ', PGPASSWORD:' +
      process.env.PGPASSWORD
  )
  console.log(
    'sequelize process setup, POSTGRES_DB:' +
      process.env.POSTGRES_DB +
      ', POSTGRES_USER:' +
      process.env.POSTGRES_USER +
      ', POSTGRES_PASSWORD:' +
      process.env.POSTGRES_PASSWORD
  )

  // This is for Docker connection, which should be the standard now
  sequelize = await new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.PGHOST,
      dialect: 'postgres',
    }
  )
}

const db = {}
export default (async () => {
  const files = await readdirSync(__dirname).filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename(__filename) &&
      file.slice(-3) === '.js'
  )
  console.log('files:' + JSON.stringify(files))
  for await (const file of files) {
    console.log('path.join(__dirname, file):' + path.join(__dirname, file))
    // const model = sequelize.import(path.join(__dirname, file))
    const model = await import(path.join(__dirname, file))
    console.log('model:' + JSON.stringify(model))
    // const model = await import(`./${file}`)
    const namedModel = model.default(sequelize, DataTypes)
    console.log('namedModel:' + JSON.stringify(namedModel))
    db[namedModel.name] = namedModel
    console.log('namedModel.name' + namedModel.name)
  }
  console.log('db:' + JSON.stringify(db))

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  console.log('models: db before return' + JSON.stringify(db))

  return db
})()

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     )
//   })
//   .forEach((file) => {
//     // const model = require(path.join(__dirname, file))(
//     //   sequelize,
//     //   Sequelize.DataTypes
//     // )
//     const model = sequelize.import(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     )
//     db[model.name] = model
//   })

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

// console.log('Syncing sequelize now')
// // sequelize.sync({ force: false })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// // module.exports = { db, redisClientHelper }
// export default db
