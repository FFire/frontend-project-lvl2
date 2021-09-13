install: install-deps

install-deps:
	npm ci

run:
	node bin/gendiff.js

publish:
	npm link --dry-run

lint:
	npx eslint .

test:
	npm run test-win

test-coverage:
	npm test -- --coverage --coverageProvider=v8