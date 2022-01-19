const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

const Employee = mongoose.model('employee')

app.use(bodyParser.json())

//password:HOzyWuq0FTLexVFS
const mongoUri = "mongodb+srv://cnq:suhaspodey@cluster0.ldxko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongo")
})

mongoose.connection.on("error", (error) => {
    console.log("error", error)
})



app.get('/', (req, res) => {
    Employee.find({}).then(data=> {
        res.send(data)
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
})

// app.post('/send', (req, res) => {
//     console.log(req.body)
//     res.send("posted")
// })

app.post('/send', (req, res) => {
    const eemployee = new Employee({//creating const for storing and accesing data
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture,
        phone: req.body.phone,
        position: req.body.position,
        salary: req.body.salary

    })
    eemployee.save()//to save the upper data
        .then(data => {
           // console.log(data)
            res.send("postedsuccess")
        }).catch(err => {
            console.log(err)
        })

})

app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send("deleted")
        }).catch(err => {
            console.log(err)
        })
})

app.post('/upt', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture,
        phone: req.body.phone,
        position: req.body.position,
        salary: req.body.salary
    })
        .then(data => {
            console.log(data)
            res.send("updated")
        }).catch(err => {
            console.log(err)
        })
})



app.listen(3001, () => {
    console.log("server running")
})