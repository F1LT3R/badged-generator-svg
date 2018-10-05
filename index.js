const fs = require('fs');
const path = require('path');

const verdana = require(path.join(__dirname, 'verdana.json'));

const badgeTemplatePath = path.join(__dirname, 'badge-template.svg');
const badgeTemplate = String(fs.readFileSync(badgeTemplatePath));

const iconTemplatePath = path.join(__dirname, 'icon-template.svg');
const iconTemplate = String(fs.readFileSync(iconTemplatePath));

const textWidth = (text, size, weight) => {
	let totalWidth = 0;

	for (let i = 0; i < text.length; i += 1) {
		const char = text[i];
		const charWidth = verdana[char][weight === 'normal' ? 0 : 1];
		totalWidth += (charWidth / 100 * size);
	}

	return totalWidth;
};

// [padding | textLengthA * kerning | padding]

module.exports = (data, outputFile) => {
	const fontSize = 98;
	const kerningA = 1.2;
	const kerningB = 1.1;

	const padding = verdana.height;
	const textWidthA = textWidth(data.textA, fontSize, 'normal');
	const textWidthKernedA = textWidthA * kerningA;
	const textWidthB = textWidth(data.textB, fontSize, 'bold');
	const textWidthKernedB = textWidthB * kerningB;

	data.blockWidthA = padding + textWidthKernedA + padding;
	data.blockWidthB = padding + textWidthKernedB + padding;
	data.totalWidth = data.blockWidthA + data.blockWidthB;
	data.textLengthA = textWidthKernedA;
	data.textLengthB = textWidthKernedB;
	data.height = 256;
	data.fontSize = fontSize;
	data.textXA = data.blockWidthA / 2;
	data.textY = 164;
	data.textXB = data.blockWidthA + (data.blockWidthB / 2);

	if (Reflect.has(data, 'imgData')) {
		data.img = iconTemplate.replace(/{{imgData}}/g, data.imgData)
			.replace(/{{imgWidth}}/g, data.imgWidth) || '';

		const imgShiftX = data.imgWidth + 32;
		data.blockWidthA += imgShiftX;
		data.totalWidth += imgShiftX;
		data.textXB += imgShiftX;
		data.textXA += imgShiftX;
	}

	let result = badgeTemplate;
	Reflect.ownKeys(data).forEach(key => {
		const replace = new RegExp(`{{${key}}}`, 'g');
		result = result.replace(replace, data[key]);
	});

	return result;
};
