const ROOT_SELECTOR = '.courier'

export function query (document) {
	const root = document.querySelector(ROOT_SELECTOR)

	return {
		root,
	}
}
