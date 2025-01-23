let persons = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

app.use(cors())
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
	res.status(200).json(persons);
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
	} else if (persons.find((p) => p.name === body.name)) {
		return res.status(400).json({
			error: 'person already exists in phonebook',
		});
	}
	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * 9000),
	};
	persons = persons.concat(person);
	res.json(person);
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
	console.log(`app running on port ${3001}`);
});
