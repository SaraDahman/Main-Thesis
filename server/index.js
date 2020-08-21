require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const keys = require('../config/keys');
const links = require('./../middleware/router');
const Nexmo = require('nexmo');

app.use(express.json());

// connect to database
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Database is connected to digital Page');
	})
	.catch((error) => {
		console.log('Error In Database Connection');
	});

const nexmo = new Nexmo({
	apiKey: '14f4ccbf',
	apiSecret: 'fK6BCU9FA8M3dLbu',
});

app.post('/message', (req, res) => {
	const { message, number } = req.body;

	nexmo.message.sendSms(
		'Nexmo',
		Number(number),
		message,
		{
			type: 'unicode',
		},
		(err, responseData) => {
			if (err) {
				console.log(err);
			} else {
				if (responseData.messages[0]['status'] === '0') {
					console.log('Message sent successfully.');
				} else {
					console.log(
						`Message failed with error: ${responseData.messages[0]['error-text']}`
					);
				}
			}
		}
	);
});

app.use('/', links);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
