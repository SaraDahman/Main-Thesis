import Carousel from '../carousel/carousel';
import axios from 'axios';
import img from '../Pictures/0.jpg';
import img2 from '../Pictures/la.jpg';
import img3 from '../Pictures/images.jpg';
import img4 from '../Pictures/pic.png';
import img5 from '../Pictures/restaurant.jpg';
import NotificationDropdown from '../notificationDropdown/notificationDropdown';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import React from 'react';
import Footer from '../footer/footer.js';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//----------------- cards ------------//
//--------------------------------------------
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		marginTop: 8,
	},
});

function ImgMediaCard(props) {
	const classes = useStyles();
	const { BusinessName, BusinessImage } = props;
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component='img'
					alt={BusinessName}
					height='140'
					image={BusinessImage}
					title={BusinessName}
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						<b>{BusinessName}</b>
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

//--------------------- cards -------------//

var resMockData = [
	{ BusinessName: 'Resturant Name', BusinessImage: img },
	{ BusinessName: 'Resturant Name', BusinessImage: img2 },
	{ BusinessName: 'Resturant Name', BusinessImage: img3 },
];
var mealsMockData = [
	{ mealName: 'mealName', image: img },
	{ mealName: 'mealName', image: img2 },
	{ mealName: 'mealName', image: img3 },
	{ mealName: 'mealName', image: img4 },
	{ mealName: 'mealName', image: img5 },
];
class Landing extends React.Component {
	state = {
		resturants: [],
		meals: [],
		seeMore: false,
		redirect: null,
	};
	componentDidMount() {
		axios
			.get('/business')
			.then((result) => {
				this.setState({ resturants: result.data });
			})
			.then(() => {
				var arr = [];
				for (var i = 0; i < this.state.resturants.length; i++) {
					if (this.state.resturants[i].meal !== []) {
						for (var j = 0; j < this.state.resturants[i].meal.length; j++) {
							arr.push(this.state.resturants[i].meal[j]);
						}
					}
				}
				this.setState({ meals: arr });
				console.log('Meals data', this.state.meals);
			})
			.catch((err) => {
				console.log('Error in getting data ', err);
			});
	}
	handleClick() {
		this.setState({ redirect: '/sign-in' });
	}
	seeMoreFunc() {
		var curr = !this.state.seeMore;
		this.setState({ seeMore: curr });
	}
	render() {
		var resData = this.state.resturants;
		var mealsData = this.state.meals;
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<div>
				<div className='slider'>
					<h2>Our latest Meals</h2>
					<Carousel mealsData={mealsData} />
				</div>
				<br />
				<div className='landingparagraph'>
					<p>Life is too short to buy expensive food</p>
				</div>
				<div className='buttons'>
					<Button
						variant='contained'
						color='secondary'
						href='/sign-upBusiness'
						id='btn'
					>
						Join Us as business
					</Button>
					{'   '}
					<Button
						variant='contained'
						color='secondary'
						href='/sign-upClient'
						id='btn'
					>
						Join Us as client
					</Button>
					{'   '}
					<Button variant='contained' color='primary' href='/sign-in' id='btn'>
						Sign In
					</Button>
				</div>
				<NotificationDropdown />
				<br />
				<div id='seeMore'>
					<h2>Our latest Business Partners</h2>
					<p onClick={this.seeMoreFunc.bind(this)}>
						{this.state.seeMore ? 'see Less <<' : 'see More >> '}
					</p>
				</div>
				<br></br>
				<div>
					<div id='res-div'>
						{resData
							.slice()
							.reverse()
							.map((element, index) => {
								if (this.state.seeMore === true) {
									while (index < 9) {
										return (
											<div onClick={this.handleClick.bind(this)}>
												<ImgMediaCard
													BusinessName={element.BusinessName}
													BusinessImage={element.BusinessImage}
												/>
											</div>
										);
									}
								} else {
									while (index < 4) {
										return (
											<div onClick={this.handleClick.bind(this)}>
												<ImgMediaCard
													BusinessName={element.BusinessName}
													BusinessImage={element.BusinessImage}
												/>
											</div>
										);
									}
								}
							})}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Landing;
