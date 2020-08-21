import React, { useEffect, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import 'react-multi-carousel/lib/styles.css';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		maxWidth: 240,
		background: '	#f64f0f',
		height: 430,
	},
	media: {
		height: 380,
	},
	text: {
		textAlign: 'center',
		fontSize: '28px',
		color: 'White',
		fontFamily: 'Open Sans',
		marginTop: '-10px',
	},
});

function Meals() {
	const [meals, setMeals] = useState([]);
	useEffect(() => {
		axios
			.get('/business')
			.then((res) => {
				var arr = [];
				var arrRest = res.data;
				for (var i = 0; i < arrRest.length; i++) {
					if (arrRest[i].meal !== []) {
						for (var j = 0; j < arrRest[i].meal.length; j++) {
							arr.push(arrRest[i].meal[j]);
						}
					}
				}
				setMeals(arr);
			})
			.catch((err) => {
				console.log(err, 'err catching data');
			});
	}, []);

	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const chevronWidth = 10;
	const classes = useStyles();
	return (
		<section id='services'>
			<section id='features'>
				<div className='meals'>
					<div>Top Meals</div>
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
						{meals
							.slice(0, 6)
							.reverse()
							.map((elem) => {
								return (
									<Card className={classes.root}>
										<CardActionArea>
											<CardMedia className={classes.media} image={elem.image} />
											<CardContent>
												<Typography
													className={classes.text}
													gutterBottom
													variant='h5'
												>
													{elem.mealName}
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
		</section>
	);
}

export default Meals;
