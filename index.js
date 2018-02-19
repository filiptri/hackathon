const express = require('express')
const app = express()
const request = require('request')
const ejs = require('ejs')
const bodyParser = require('body-parser')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded())


// zadatak 1
app.get('/', (req, res) => {
        res.render('index')
    }
)

app.post('/', (req, res) => {
        let requestData = {
            "Teamname": req.body.Teamname,
            "Password": req.body.Password,
            "members":[
                {"name":req.body.Name1,"surname": req.body.Surname1,"mail":req.body.Email1},
                {"name":req.body.Name2,"surname": req.body.Surname2,"mail":req.body.Email2},
                {"name":req.body.Name3,"surname": req.body.Surname3,"mail":req.body.Email3},
                {"name":req.body.Name4,"surname": req.body.Surname4,"mail":req.body.Email4}
            ]
        }
        
        let urla = 'http://52.233.158.172/change/api/hr/account/register';
    
            request({
                url: urla,
                method: "POST",
                json: requestData,           
            }, function (error, response, body) {
                res.render('gotovo', {"err":body.Errors, "sc":response.statusCode})
        })
    }
)


app.listen(3000, () => console.log('Aplikacija je pokrenuta na portu 3000!'))