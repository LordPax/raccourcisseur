const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const str_rand = (taille) => {
	let str = '', tmp = ''

	for(let i = 0; i < taille; i++){
		if (rand(0, 1) == 1)
			tmp = String.fromCharCode(rand(65, 90))
		else
			tmp = String.fromCharCode(rand(97, 122))

		str += tmp
	}

	return str
}

module.exports = {
	rand : rand,
	str_rand : str_rand
}