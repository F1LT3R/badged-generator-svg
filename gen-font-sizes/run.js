const results = {};

chars.forEach(char => {
	const charElem = document.createElement('span');
	charElem.innerHTML = char;
	stage.appendChild(charElem);
	const dimensionsNormal = charElem.getBoundingClientRect();

	const charElemBold = document.createElement('span');
	charElemBold.setAttribute('class', 'bold');
	charElemBold.innerHTML = char;
	stage.appendChild(charElemBold);
	const dimensionsBold = charElemBold.getBoundingClientRect();

	results[char] = [
		Math.round(dimensionsNormal.width * 100) / 100,
		Math.round(dimensionsBold.width * 100) / 100
	];

	console.log(results[char]);
});

console.log(JSON.stringify(results));
console.log(Reflect.ownKeys(results).length, chars.length);
