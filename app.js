const express = require('express')

const app = express()

app.use(express.json())

const mongoose = require('mongoose')

const clientConneted = "mongodb://localhost:27017/assignment"

mongoose.connect(clientConneted, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log({ message: err })
    } else {
        console.log({ message: "request success" }, {
            data: "connected to database"
        })
    }
})

const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String
})

const person = mongoose.model('persons', personSchema)
    // person.create({
    //     name: "zuri",
    //     email: "zuri@yahoo.com",
    //     country: "Nigeria"
    // }, (err, peron) => {
    //     if (err) {
    //         throw err
    //     } else {
    //         console.log({
    //             message: "date captured",
    //             data: person
    //         })
    //     }
    // })

app.get('/', (req, res) => {
    res.send(`welcome to my first app`)
})
app.get('/person', (req, res) => {
    person.find({}, (err, person) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else {
            return res.status(200).json({ person })
        }
    })
})
app.get('/person/:id', (req, res) => {
    person.findById(req.params.id, (err, person) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!person) {
            return res.status(404).json({ message: "person not found" })
        } else {
            return res.status(200).json({ person })
        }
    })
})

app.put('/peron/:id', (req, res) => {
    person.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, person) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!person) {
            return res.status(404).json({ message: "person not found" })
        } else {
            person.save((err, saveperson) => {
                if (err) {
                    return res.status(500).json({ message: err })
                } else {
                    return res.status(200).json({ message: "person saved successfully" })
                }
            })
        }
    })
})

app.delete('/person/:id', (req, res) => {
    person.findByIdAndDelete(req.params.id, (err, person) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else if (!person) {
            return res.status(404).json({ message: "person not found" })
        } else {
            return res.status(200).json({ message: "person deleted successfully" })
        }
    })
})
const port = 5000
app.listen(port, () => {
    console.log(`we are live a heroku`)
})