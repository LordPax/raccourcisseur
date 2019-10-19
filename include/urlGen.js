const urlGen = (conn, f, g, taille) => {
	const str = f(taille, g)
	conn.query('SELECT * FROM url WHERE url_court = ?', [str] , (err, res, fields) => {
		if (err) throw err
		return res.length !== 0 ? urlGen(conn, f, g, taille) : true
	})
	return str
}

module.exports = urlGen