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
    title: 'Electronic Medical Records (EHR) with Blockchain',
    description:
      "Our aim is give patients authority over their medical information by allowing them to share the most complete version of their record with all of the organizations involved in their medical network.",
    imageUrl: process.env.PUBLIC_URL + '/assets/digital-x-rays.jpeg',
    time: 1500,
  },
  {
    title: 'Data Science in Healthcare',
    description:
      'Also, medical datasets may help in the attempt to make chronic respiratory and cardiovascular diseases prediction at very early stage.',
    imageUrl: process.env.PUBLIC_URL + '/assets/data-scientist.jpeg',
    time: 1500,
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
