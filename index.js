const persons = [
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
	console.log('route reached');
	res.status(200).json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`app running on port ${3001}`);
});
