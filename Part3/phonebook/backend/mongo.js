const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit()
}

const password = process.argv[2]
const url = `mongodb+srv://yanghenan9866_db_user:${password}@cluster1.gjngflj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const inputName = process.argv[3]
  const inputNumber = process.argv[4]
  const person = new Person({
    name: inputName,
    number: inputNumber
  })
  person.save().then(() => {
    console.log(`added ${inputName} number ${inputNumber} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}