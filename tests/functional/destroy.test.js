import html from '../fixtures/html'
import { query } from '../fixtures/query';

// import defaults from '@src/defaults';
import Courier from '../../entry/entry-complete';

describe('After destroying an instance', () => {
	beforeEach(() => {
		document.body.innerHTML = html
	})

	test('`root element` should not exist', () => {
		let {root} = query(document)

		const instance = new Courier(root.body).mount().destroy();

		expect(instance.rootElement.querySelector(`.${instance._settings.classes.root}`)).toBe(null)
	})
})
