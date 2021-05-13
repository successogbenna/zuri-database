# zuri-databas
data  base

https://zuri007-app.herokuapp.com/,

https://git.heroku.com/zuri007-app.git,


documentation of my routes. Please note all these will work when you have connected express with your moogodb and you use postman or the console to test the application

// This is to get all persons in the Database 
app.get('/person', (req, res) => {
    person.find({}, (err, person) => {
        if (err) {
            return res.status(500).json({ message: err })
        } else {
            return res.status(200).json({ person })
        }
    })
})

// This is to get a single person in the databse 
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

// This is update person in the database 

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

// This is to delete person in the database 

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
