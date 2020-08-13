import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
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

  var sortRestaurants = [];
  var userLocation = JSON.parse(localStorage.getItem("userLocation"));
  const arrRestaurants = props["restaurants"];
  var obj = {
    lat: Number(userLocation.lat),
    lng: Number(userLocation.lng),
  };
  console.log("location", obj);
  var maxlat = obj.lat + 0.01;
  var maxlng = obj.lng + 0.01;
  var minlat = obj.lat - 0.01;
  var minlng = obj.lng - 0.01;

  var sortRestaurants = [];
  for (var i = 0; i < arrRestaurants.length; i++) {
    // console.log(arrRestaurants[i].location[0].lat);
    if (
      minlat < arrRestaurants[i].location[0].lat &&
      maxlat > arrRestaurants[i].location[0].lat &&
      minlng < arrRestaurants[i].location[0].lng &&
      maxlng > arrRestaurants[i].location[0].lng
    ) {
      console.log("in if");
      sortRestaurants.push([arrRestaurants[i]]);
    }
    // sortRestaurants = temp;
    // return temp;
  }

  console.log("temp", sortRestaurants);
  //   console.log("restaurants", props["restaurants"][0]);

  return (
    <div
      style={{
        padding: `0 ${chevronWidth}px`,
        marginLeft: "25%",
        marginTop: "5%",
        width: "70%",
      }}
    >
      <h2> Near Restaurants</h2>
      {/* <br /> */}
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {sortRestaurants.map((elem) => {
          console.log(elem);
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={elem[0].photo}
                  title={elem[0].name}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {elem[0].name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  ></Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  ></Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </ItemsCarousel>
    </div>
  );
};

// id: "2251134"
// location: {_id: "5f324b4926d775215cb61da6", lat: 31.545753599999998, lng: 34.455552}
// name: "sarsar"
// photo: "https://www.ahstatic.com/photos/b3g8_rsr001_00_p_1024x768.jpg"

//{lat: 31.50944460314229, lng: 34.468638216684326}
