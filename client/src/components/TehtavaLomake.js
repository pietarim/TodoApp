import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { lisaa } from '../server/tehtavaService'

function TehtavaLomake({tehtava, setTehtava}) {

  const [otsikko, setOtsikko] = useState('')
  const [kommentti, setKommentti] = useState('')

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
    textField: {
      marginTop: '25px',
    }
  }));

  const lisaaminen = async event => {
    console.log('lisaaminen')
    event.preventDefault();
    const lisatty = await lisaa({
      otsikko: otsikko,
      kommentti: kommentti
    })
    setTehtava(tehtava.concat(lisatty))

    setOtsikko('')
    setKommentti('')
  }

  function handleOtsikkoChange(e) {
    setOtsikko(e.target.value)
  }

  function handleKommentti(e) {
    setKommentti(e.target.value)
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form onSubmit={lisaaminen}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
          <h1>Lisää tehtävä</h1>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <TextField 
            xs={6}
            className={classes.input}
            label="Otsikko"
            onChange={handleOtsikkoChange}
            value={otsikko}
          />
        </Grid>
        <TextField fullWidth
            className={classes.textFiled}
            id="outlined-multiline-static"
            label="Kommentti"
            multiline
            rows={5}
            defaultValue="Kuvaus"
            variant="outlined"
            style={{ margin: '25px 0' }}
            onChange={handleKommentti}
            value={kommentti}
          />
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Button type="submit" variant="contained" color="primary" style={{ margin: '25px 15px' }}>
              Lähetä
            </Button>
          </Grid>
      </Paper>
      </form>
    </div>
  )
}

export default TehtavaLomake