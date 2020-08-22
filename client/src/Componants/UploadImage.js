import React from 'react';
import Axios from 'axios';

class Image extends React.Component {
	state = {
		imageUrl: '',
		imageAlt: '',
	};
	handleImageUpload = () => {
		const { files } = document.querySelector('input[type="file"]');
		const formData = new FormData();
		formData.append('file', files[0]);
		formData.append('upload_preset', 'ml_default');
		const options = {
			method: 'POST',
			body: formData,
		};

		return fetch(
			'https://api.Cloudinary.com/v1_1/teamrocket123465/image/upload',
			options
		)
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					imageUrl: res.secure_url,
					imageAlt: `An image of ${res.original_filename}`,
				});
				alert('image saved');
				this.props.imgurl(this.state.imageUrl);
			})
			.then(() => {
				Axios.post('/image', { url: this.state.imageUrl }).then(
					(err, result) => {
						console.log(result);
					}
				);
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<main className='Image'>
				<section className='left-side'>
					<form>
						<div className='form-group'>
							<input type='file' />
						</div>
						<button
							type='button'
							className='btn'
							onClick={this.handleImageUpload}
						>
							Submit
						</button>
					</form>
				</section>
			</main>
		);
	}
}

export default Image;
