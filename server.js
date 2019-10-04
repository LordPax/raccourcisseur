const express = require('express')
const mysql = require('mysql')
const rand = require('./include/random')
const app = express()

const domain = 'http://localhost:8080/'

const conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'url'
})

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
	res.render('pages/index')
})
app.post('/', (req, res) => {
	if (req.body.input_url !== undefined && req.body.input_url !== '') {
		conn.connect()

		let url_long = req.body.input_url, url_court = '', compt = 0
		url_long = url_long.toLowerCase()

		do {
			url_court = rand.str_rand(10)
			conn.query('SELECT * FROM url WHERE url_court = ?',[url_court] , (err, res, fields) => {
				if (err) throw err
				compt = res.length
			})
		} while (compt !== 0)

		sql = {
			user : 0,
			url_long : url_long,
			url_court : url_court
		}
		conn.query('INSERT INTO url SET ?', sql, (err, res, fields) => {if (err) throw err})

		conn.end()
		res.render('pages/index', {lien : domain + 'url/' + url_court})
	}
})
// app.get('/[a-zA-Z]{10}', (req, res) => {
// 	console.log(req.params)
// 	res.render('pages/index')
// })
app.get('/url/:url', (req, res) => {
	res.render('pages/lien', {url : req.params.url})
})
app.listen(8080)