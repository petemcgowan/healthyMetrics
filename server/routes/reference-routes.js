import express from 'express'
const helpRoute = express.Router()
// import db from '../models/index.mjs'
import { sequelize, Help, References } from '../server.mjs'
// const db = require('../models')

helpRoute.post('/new', (req, res) => {
  sequelize.References.create({
    shortTitle: req.body.shortTitle,
    title: req.body.title,
    link: req.body.link,
  }).then((newReference) => res.send(newReference))
})

helpRoute.get('/all', (req, res) => {
  sequelize.References.findAll().then((allReference) => res.send(allReference))
})

helpRoute.post('/fillReferences', (req, res) => {
  // sex differences
  sequelize.References.create({
    shortTitle: 'sex differences',
    title:
      'Sex differences in human adipose tissues: the biology of pear shape',
    link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3411490/',
  }).then((newReference) => res.send(newReference))
  // relationship aging
  sequelize.References.create({
    shortTitle: 'relationship aging',
    title:
      'A Research Agenda: The Changing Relationship Between Body Weight and Health in Aging',
    link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4984841/',
  }).then((newReference) => res.send(newReference))
  // drug dosage
  sequelize.References.create({
    shortTitle: 'drug dosage',
    title:
      'Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M, Determination of ideal body weight for drug dosage calculations. Am J Hosp Parm 1983',
    link: 'https://pubmed.ncbi.nlm.nih.gov/6869387/',
  }).then((newReference) => res.send(newReference))
  // How to Measure
  sequelize.References.create({
    shortTitle: 'How to Measure',
    title: 'How to Measure Your Wrist to Get Your Body Frame Size',
    link: 'https://www.livestrong.com/article/175491-how-to-measure-wrist-size-for-body-frame-measurement/',
  }).then((newReference) => res.send(newReference))
  // Ideal Body Weight
  sequelize.References.create({
    shortTitle: 'Ideal Body Weight',
    title: 'Ideal Body Weight',
    link: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/ideal-body-weight',
  }).then((newReference) => res.send(newReference))
})

// module.exports = helpRoute
export default helpRoute
