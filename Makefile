install: 
	npm ci

test: 
	npm test

test-coverage: 
	npm test -- --coverage

lint: 
	npx eslint .