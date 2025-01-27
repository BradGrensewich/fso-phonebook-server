require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());

morgan.token('dataRecieved', (req, res) => {
	if (req.body) {
		return JSON.stringify(req.body);
	} else {
		return;
	}
});

app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			tokens.dataRecieved(req, res),
		].join(' ');
	})
);
app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => {
		return res.status(200).json(persons);
	});
});
app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	const person = persons.find((p) => p.id === id);
	if (!person) {
		return res.status(404).end();
	}
	return res.status(200).json(person);
});
app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	persons = persons.filter((p) => p.id !== id);
	res.status(204).end();
});
app.post('/api/persons', (req, res) => {
	const body = req.body;
	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'request must include a name and number',
		});
	}
	const person = new Person({
		name: body.name,
		number: body.number,
	});
	person.save(person).then((result) => {
		res.status(201).json(result);
	});
});

app.get('/api/info', (req, res) => {
	const personCount = persons.length;
	const time = new Date();
	const info = `
        <p>Phone has info for ${personCount} people</p>
        <p>${time}</p>`;
	res.status(200).send(info);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
