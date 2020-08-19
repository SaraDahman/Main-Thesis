import React from 'react';
import img from '../Pictures/0.jpg';
import img2 from '../Pictures/la.jpg';
import img3 from '../Pictures/pic.png';

function Carousel(props) {
	const mealsData = props.mealsData;
	return (
		<div className='wrapper noselect'>
			<div className='strip-carousel' id='mostviewed'>
				<div className='arrow-left'>&lsaquo;</div>
				<div className='arrow-right'>&rsaquo;</div>

				<div className='frames'>
					{mealsData
						.slice()
						.reverse()
						.map((element, index) => {
							return (
								<div className='frame' key={index}>
									<label>
										{element.mealName}
										<br></br>
										Resturant
									</label>
									<br></br>
									<img src={element.image} className='caro' />
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default Carousel;
