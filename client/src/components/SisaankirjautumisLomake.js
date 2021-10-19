import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import kirjaudu from '../server/kayttajaService'
import {setToken} from '../server/tehtavaService'

function SisaankirjautumisLomake({setKayttaja}) {
  const [kayttajaTunnus, setTunnus] = useState('')
  const [kayttajaSalasana, setSalasana] = useState('')
  const timeId = useRef()
  const [ilmoitus, setIlmoitus] = useState('none')


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: '#dce2e8',
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: '25px',
    maxWidth: 500,
  },
  input: {
    margin: '10px'
  },
  image: {
    width: 128,
    height: 128,
  },
}));


function kasitteleTunnus(event) {
  event.preventDefault()
  const nimi = event.target.value
  setTunnus(nimi)
}

function salasanaTunnus(event) {
  event.preventDefault()
  const salaus = event.target.value
  setSalasana(salaus)
}

const kirjautuminen = async (event) => {
  event.preventDefault()
  const tunnuksetKirjautumiselle = {tunnus: kayttajaTunnus, salasana: kayttajaSalasana}
  try {
    const vastaanotettu = await kirjaudu(tunnuksetKirjautumiselle)
    window.localStorage.setItem("kirjautunutTunnus", JSON.stringify(vastaanotettu))
    setKayttaja(vastaanotettu)
    setToken.setToken(vastaanotettu.token)
  } catch {
    setIlmoitus('wrap')
    clearTimeout(timeId.current)
    timeId.current = setTimeout( () => {
      setIlmoitus('none')
    }, 1000)
  }
  }
  


const classes = useStyles();

  return (
    <div className={classes.root}>
      <form onSubmit={kirjautuminen}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            <h1>Tehtävälista</h1>
          </Grid>
          <Alert style={{display: ilmoitus }} severity="warning">Väärä salasana tai käyttäjätunnus</Alert>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <TextField 
              xs={6}
              className={classes.input}
              label="Käyttäjätunnus"
              value={kayttajaTunnus}
              error={false}
              onChange={kasitteleTunnus}
            />
            <TextField
              xs={6}
              className={classes.input}
              label="Salasana"
              value={kayttajaSalasana}
              onChange={salasanaTunnus}
              type="password"
            />
        </Grid>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Button type="submit" variant="contained" color="primary" style={{ margin: '25px 0' }}>
              Kijaudu
            </Button>
          </Grid>
      </Paper>
    </form>
    </div>
  )
}

export default SisaankirjautumisLomake