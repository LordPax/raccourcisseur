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
conn.connect()

app.set('view engine', 'ejs')

app.use('/assets', express.static('public'))
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
	res.render('pages/index')
})
app.post('/', (req, res) => {
	if (req.body.input_url !== undefined && req.body.input_url !== '') {

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
		
		res.render('pages/index', {lien : domain + 'url/' + url_court})
	}
})
app.get('/url/:url', (req, res) => {
	if (req.params.url !== undefined && req.params.url !== '') {
		let url_court = req.params.url, url_long2 = '', compt = 0
		conn.query('SELECT * FROM url WHERE url_court = ?', [url_court], (err, res2, fields) => {
			if (err) throw err
			if (res2.lenght !== 0)
				url_long2 = res2[0].url_long
			else
				url_long2 = 'aucune adresse trouvé'
			
			res.render('pages/lien', {url : url_long2})
		})
	}
})
app.listen(8080)