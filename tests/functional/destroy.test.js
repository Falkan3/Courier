import html from '../fixtures/html'
import { query } from '../fixtures/query';

import defaults from '@src/defaults';
import Courier from '../../entry/entry-complete';

describe('After destroying an instance', () => {
	beforeEach(() => {
		document.body.innerHTML = html
	})

	test('`classes.root` should not be applied on the root element', () => {
		let {root} = query(document)

		new Courier(root.body).mount().destroy()

		expect(root.classList.contains(defaults.classes.root)).toBe(false)
	})
})
