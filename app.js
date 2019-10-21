const express = require('express')
const mysql = require('mysql')
const rand = require('./include/random')
const urlGen = require('./include/urlGen')
const app = express()

const port = 8080
const t_str = 10
const domain = 'http://localhost:' + port + '/'

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

app.get('/', (req, res) => res.render('pages/index'))

app.post('/', (req, res) => {
	if (req.body.input_url !== undefined && req.body.input_url !== '') {
		const url_long = req.body.input_url.toLowerCase()
		const url_court = urlGen(conn, rand.str_rand, rand.rand, t_str)

		sql = {
			user : 0,
			url_long : url_long,
			url_court : url_court
		}

		conn.query('INSERT INTO url SET ?', sql, (err, res, fields) => { if (err) throw err })
		res.render('pages/index', {lien : domain + 'url/' + url_court})
	}
	else
		res.redirect('/')
})

app.get('/url/:url', (req, res) => {
	if (req.params.url.match(/^[a-zA-Z]{10}$/)) {
		const url_court = req.params.url
		conn.query('SELECT * FROM url WHERE url_court = ?', [url_court], (err, res2, fields) => {
			if (err) throw err
			const url_long = res2.length !== 0 ? res2[0].url_long : 'aucune adresse trouvé'
			res.render('pages/lien', {url : url_long})
		})
	}
	else
		res.redirect('/')
})

app.listen(port, () => console.log('Ecoute le port', port, '...'))