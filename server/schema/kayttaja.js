const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose

let kayttajaSchema = new Schema({
    tunnus: {
        type: String,
        unique: true,
    },
    nimi: String,
    salasana: String,
    tehtavat: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tehtava'
        }
    ]
})

kayttajaSchema.plugin(uniqueValidator)

const Kayttaja = mongoose.model('Kayttaja', kayttajaSchema)

module.exports = Kayttaja