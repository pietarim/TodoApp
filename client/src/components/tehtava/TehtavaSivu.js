import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import YksiTehtava from './YksiTehtava';


const TehtavaSivu = ({tehtavat, tehtavaPoistaminenKasittelija, kayttaja, muokkaaState}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 900,
      margin: '0 auto'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

  const classes = useStyles();

    return(
      <div className={classes.root}>
        <h1 style={{textAlign: 'center', margin: '60px auto'}}>Tehtävät</h1>
        <hr></hr>
        {tehtavat.map((n, i) => 
          <YksiTehtava 
            key={i}
            muokkaaState={muokkaaState} 
            kayttaja={kayttaja} 
            tehtavaPoistaminenKasittelija={tehtavaPoistaminenKasittelija} 
            tehtava={n} 
          />)}
      </div>
    )
}

export default TehtavaSivu