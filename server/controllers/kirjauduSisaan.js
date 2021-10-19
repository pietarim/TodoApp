const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const kirjautuminenRouter = express.Router()
const Kayttaja = require('../schema/kayttaja')

const salaus = process.env.SALAUS

kirjautuminenRouter.post('/', async (req, res) => {
  
  const body = req.body

  const kayttaja = await Kayttaja.findOne({ tunnus: body.tunnus })
  if (!kayttaja) {
    return res.status(401).json({
      error: 'väärä tunnus tai salasana'
    })
  }

  const salasanaOikein = await bcrypt.compare(body.salasana, kayttaja.salasana)
    const kayttajaOikein = (kayttaja.tunnus === body.tunnus) ?
    false
    : true

  if (!(kayttaja && salasanaOikein && !kayttajaOikein)) {
    return res.status(401).json({
      error: 'väärä tunnus tai salasana'
    })
  }

  const userForToken = {
    id: kayttaja._id,
  }

  const token = jwt.sign(userForToken, salaus)

  res
    .status(200)
    .send({ token, tunnus: kayttaja.tunnus, nimi: kayttaja.nimi })
})

module.exports = kirjautuminenRouter