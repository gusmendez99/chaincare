import React from 'react';
import { Box, Divider, Card, CardMedia, Typography, CardContent, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const FACES = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
]

const useStyles = makeStyles(() => ({
  cardItem: {
    transition: "0.3s",
    margin: "auto",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
  },
  cardItemMedia: {
    paddingTop: "56.25%"
  },
  cardItemContent: {
    textAlign: "left",
    padding: '1rem'
  },
  cardItemDivider: {
    margin: '1rem 0'
  },
  cardItemHeading: {
    fontWeight: "bold",
    fontSize: '12pt',
  },
  cardItemSubHeading: {
    lineHeight: 1.8,
    fontSize: '9pt',
  },
  cardItemBottomText: {
    color: 'grey',
    lineHeight: 3,
    fontSize: '8pt',
  },
  cardItemAvatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: '-1rem'
    }
  }
}));

const DummyCardItem = ({ title, content, imageUrl }) => {
  const styles = useStyles();

  return (
    <Card className={styles.cardItem}>
      <CardMedia
        className={styles.cardItemMedia}
        image={imageUrl}
      />
      <CardContent>
        <Typography
          className={styles.cardItemHeading}
          variant={"h6"}
          gutterBottom
        >
          { title }
        </Typography>
        <Typography
          className={styles.cardItemSubHeading}
          variant={"caption"}
        >
          { content }
        </Typography>
        <Divider
          className={styles.cardItemDivider}
          light
        />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography
            className={styles.cardItemBottomText}
            variant={"caption"}
          >
            Pacientes
          </Typography>
          <Box>
            {FACES.map(face => (
              <Avatar
                className={styles.cardItemAvatar}
                key={face}
                src={face}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DummyCardItem;