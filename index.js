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
const app = express();

app.get('/persons', (req, res) => {
	res.status(200).json(persons);
});
app.get('/persons/:id', (req, res) => {
	const id = req.params.id;
	const person = persons.find((p) => p.id === id);
	if (!person) {
		return res.status(404).end();
	}
	return res.status(200).json(person);
});
app.delete('/persons/:id', (req, res) => {
	const id = req.params.id;
	persons = persons.filter((p) => p.id !== id);
	res.status(204).end();
});

app.get('/info', (req, res) => {
	const personCount = persons.length;
	const time = new Date();
	const info = `
        <p>Phone has info for ${personCount} people</p>
        <p>${time}</p>`;
	res.status(200).send(info);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`app running on port ${3001}`);
});
