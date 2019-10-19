const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const str_rand = (taille, f, char = '') => {
	const char_rand = f(0, 1) === 1 ? f(65, 90) : f(97, 122)
	const tmp = String.fromCharCode(char_rand)

	return taille > 0 ? str_rand(taille - 1, f, char + tmp) : char
}

//console.log(str_rand(5, rand))

module.exports = {
	rand : rand,
	str_rand : str_rand
}