import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from '../ImageCard';
import useWindowPosition from '../../hooks/useWindowPosition';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const FEATURES = [
  {
    title: 'Registro médico electrónico (EHR) con Blockchain',
    description:
      "Nuestro objetivo es otorgar a los pacientes autoridad sobre su información médica al permitirles compartir la versión más completa de su registro con todas las organizaciones involucradas en su red médica.",
    imageUrl: process.env.PUBLIC_URL + '/assets/digital-x-rays.jpeg',
    time: 1500,
    alt: 'EHR con Blockchain'
  },
  {
    title: 'Data Science en favor de la salud',
    description:
      'Además, los conjuntos de datos médicos pueden ayudar en el intento de hacer una predicción de enfermedades respiratorias y cardiovasculares crónicas en una etapa muy temprana, y contribuir a la comunidad científica en la búsqueda hallazgos.',
    imageUrl: process.env.PUBLIC_URL + '/assets/data-scientist.jpeg',
    time: 1500,
    alt: 'Data Science en favor de la salud'
  },
];

const Features = () => {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="features">
      {
        FEATURES.map((item, idx) => (
          <ImageCard key={idx} item={item} checked={checked} />
        ))
      }
    </div>
  );
}

export default Features;
