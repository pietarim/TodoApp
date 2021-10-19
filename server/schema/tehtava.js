const mongoose = require('mongoose')
const { Schema } = mongoose;

const tehtavaSchema = new mongoose.Schema({
    otsikko: String,
    kommentti: String,
    tekija:
        {
            type: String,
            ref: 'Kayttaja'
        }
})

const Tehtava = mongoose.model('Tehtava', tehtavaSchema)

module.exports = Tehtava