import fs from 'fs';
import path from 'path';
import test from 'ava';
import badgeGen from '.';

test('code coverage badge', t => {
	t.is(typeof badgeGen, 'function');

	const codeCoverage = {
		title: '100% Code Coverage',
		colorA: '#555555',
		colorB: '#97CA00',
		textColor: '#FFFFFF',
		textA: 'COVERAGE',
		textB: '100%',
		imgData: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj4NCjxwYXRoIGZpbGw9IiNkZGQiIGQ9Ik0yMCAwYzExIDAgMjAgOSAyMCAyMHMtOSAyMC0yMCAyMFMwIDMxIDAgMjAgOSAwIDIwIDB6bTQuOSAyMy45YzIuMi0yLjggMS45LTYuOC0uOS04LjktMi43LTIuMS02LjctMS42LTkgMS4yLTIuMiAyLjgtMS45IDYuOC45IDguOSAyLjggMi4xIDYuOCAxLjYgOS0xLjJ6bS0xMC43IDEzYzEuMi41IDMuOCAxIDUuMSAxTDI4IDI1LjNjMi44LTQuMiAyLjEtOS45LTEuOC0xMy0zLjUtMi44LTguNC0yLjctMTEuOSAwTDIuMiAyMS42Yy4zIDMuMiAxLjIgNC44IDEuMiA0LjlsNi45LTcuNWMtLjUgMy4zLjcgNi43IDMuNSA4LjggMi40IDEuOSA1LjMgMi40IDguMSAxLjhsLTcuNyA3LjN6Ii8+DQo8L3N2Zz4=',
		imgWidth: 128
	};

	const snapshotFile = path.join(__dirname, 'snapshots', 'codeCoverageBadge.svg');
	const result = badgeGen(codeCoverage);
	fs.writeFileSync(snapshotFile, result);

	fs.readFileSync(snapshotFile, 'utf8');
	t.is(snapshotFile, result);
});
