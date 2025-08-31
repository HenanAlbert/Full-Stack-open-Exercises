const express = require('express');
const app = express();
const morgan = require('morgan');
const file = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.use(express.json());
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    response.json(file);
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send(`
        <p>Phonebook has info for ${file.length} people</p>
        <p>${now}</p>
        `);
})

app.get('/api/persons/:id', (request, response) => {
    const result = file.find(f => f.id === request.params.id);
    if (result) {
        response.send(result)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const index = file.findIndex(f => f.id === request.params.id);
    if (index !== -1) {
        file.splice(index, 1)
        response.status(204).end();
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 1000);
    const newPerson = {
        "id": id,
        "name": request.body.name,
        "number": request.body.number
    }

    const validName = newPerson.name && !file.some(f => f.name === newPerson.name)

    if (newPerson.id && validName) {
        file.push(newPerson)
        response.json(file)
    } else {
        response.status(400).json({
            error: 'content missing'
        })
    }
})

app.listen(3001, () => {
    console.log("Server running on port 3001");
})