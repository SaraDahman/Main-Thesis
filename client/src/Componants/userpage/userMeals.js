import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;
  const classes = useStyles();

  const arrMealsRestaurants = [];
  const arrMealsForOne = [];
  // const arrMeals = [];
  for (var i = 0; i < props.meals.length; i++) {
    if (props.meals[i].length > 0) {
      arrMealsRestaurants.push(props.meals[i]);
    }
  }
  console.log("arrMealsRestaurants", arrMealsRestaurants);
  arrMealsRestaurants.map((elem) => {
    for (var i = 0; i < elem.length; i++) {
      arrMealsForOne.push(elem[i]);
    }
  });
  console.log("firstone", arrMealsForOne);

  function comparePrice(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }

  arrMealsForOne.sort(comparePrice);

  return (
    <div
      style={{
        padding: `0 ${chevronWidth}px`,
        marginLeft: "28%",
        width: "70%",
      }}
    >
      <h2> low meals price</h2>
      {/* <br /> */}
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={10}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {arrMealsForOne.map((elem) => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={elem.image}
                  title={elem.mealName}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {elem.mealName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {elem.discription}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Price : {elem.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </ItemsCarousel>
    </div>
  );
};
