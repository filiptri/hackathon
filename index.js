const express = require('express')
const app = express()
const request = require('request')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded())

app.use(cookieParser())

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

// zadatak 2
app.get('/login', (req, res) => {
        res.render('login')
    }
)

app.post('/login', (req, res) => {
        let requestData = {
            "Teamname": req.body.Teamname,
            "Password": req.body.Password
        }

        let urla = 'http://52.233.158.172/change/api/hr/account/login';

        request({
            url: urla,
            method: "POST",
            json: requestData,
            
        }, function (error, response, body) {  
            console.log(r);
            if (r){
                res.cookie('auth', r.AuthorizationToken)
                res.cookie('teamid', r.TeamId)
            }
            res.render('gotov_login', {"err":body.Errors})
        })
    }   
)


app.listen(3000, () => console.log('Aplikacija je pokrenuta na portu 3000!'))