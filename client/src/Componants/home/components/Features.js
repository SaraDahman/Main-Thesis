import React, { useEffect, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import 'react-multi-carousel/lib/styles.css';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    // width: 240,
    maxWidth: 240,
    background: '	#f64f0f',
    // height: 240,
  },
  media: {
    height: 240,
  },
  text: {
    textAlign: 'center',
    fontSize: '28px',
    color: 'White',
    fontFamily: 'Open Sans',
    marginTop: '-10px',
  },
});

function Features() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios
      .get('/business')
      .then((res) => {
        if (res.data.length) {
          setRestaurants(res.data);
        }
      })
      .catch((err) => {
        console.log(err, 'err catching data');
      });
  }, []);

  function comparePrice(a, b) {
    var aDoneLength = a.Done.length;
    var bDoneLength = b.Done.length;
    if (aDoneLength < bDoneLength) {
      return 1;
    }
    if (aDoneLength > bDoneLength) {
      return -1;
    }
    return 0;
  }

  restaurants.sort(comparePrice);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;
  const classes = useStyles();
  return (
    <section id='features'>
      <div className='mealslist'>Top Restaurants</div>
      <div className='carousel'>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={6}
          gutter={4}
          leftChevron={<button>{'<'}</button>}
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {restaurants.slice(0, 6).map((elem) => {
            return (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={elem.BusinessImage}
                  />
                  <CardContent>
                    <Typography
                      className={classes.text}
                      gutterBottom
                      variant='h5'
                    >
                      {elem.BusinessName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            );
          })}
        </ItemsCarousel>
      </div>
    </section>
  );
}

export default Features;
