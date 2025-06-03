install: 
	npm ci

test: 
	npm test

test-coverage: 
	npm test -- --coverage --watch

lint: 
	npx eslint .