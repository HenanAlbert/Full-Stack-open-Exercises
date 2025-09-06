const express = require('express');
const app = express();
const morgan = require('morgan');
const Person = require('./models/Person');

app.use(express.json());
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    }
    )
})

app.get('/info', (request, response) => {
    const now = new Date();
    Person.find({}).then(result => {
        response.send(`
        <p>Phonebook has info for ${result.length} people</p>
        <p>${now}</p>
        `);
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(result => {
        if (result) {
            response.send(result)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        if (result) {
            response.status(204).end();
        } else {
            response.status(404).end()
        }
    })
})

app.post('/api/persons', (request, response, next) => {
    const newPerson = new Person({
        name: request.body.name,
        number: request.body.number
    })

    newPerson.save()
        .then(result => response.json(result))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response) => {
    const { name, number } = request.body
    Person.findByIdAndUpdate(request.params.id, { name, number }, { runValidators: true }).then(updated => response.status(200).json(updated))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: 'validation failed' })
    } else {
        return response.status(500).send({ error: 'unknownerror' })
    }
}

app.use(errorHandler)