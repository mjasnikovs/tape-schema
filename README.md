# tape-schema [![Build Status](https://travis-ci.org/mjasnikovs/tape-schema.svg?branch=master)](https://travis-ci.org/mjasnikovs/tape-schema)
tap-producing test harness schema validation for node

## install
```
npm install --save-dev tape-schema
```

## example
```javascript
const test = require('tape')
const schema = require('tape-schema')

const schemaObject = {
	id: schema.number,
	name: schema.string,
	age: schema.any([null, schema.naturalNumber]),
	friendList: [
		{
			id: schema.number,
			name: schema.string
		}
	]
}

const object = {
	id: 1,
	name: 'Edgars',
	age: null,
	friendList: [
		{
			id: 2,
			name: 'Joe'
		},
		{
			id: 3,
			name: 'Kate'
		}
	]
}

test('Readme test', t => {
	schema.test(t, schemaObject, object)
	t.end()
})
```

## API

### schema.test([tape], [schema], [object])
Validate schema agains given object

### string
Specifies that the input is an typeof string.
```javascript
const schemaObject = {
 	name: schema.string
}
```

### number
Specifies that the input is number.
```javascript
const schemaObject = {
 	discount: schema.number
}
```

### naturalNumber
Specifies that the input is natural number. (including 0)
```javascript
const schemaObject = {
 	age: schema.naturalNumber
}
```

### boolean
Specifies that the input is boolean.
```javascript
const schemaObject = {
 	isOnline: schema.boolean
}
```

### any([values])
Specifies that the input is any value in array.
```javascript
const schemaObject = {
 	task: schema.any([null, schema.string, 'assigned'])
}
```

### latitude
Specifies that the input is latitude.
```javascript
const schemaObject = {
 	latitude: schema.latitude
}
```

### longitude
Specifies that the input is longitude.
```javascript
const schemaObject = {
 	longitude: schema.longitude
}
```

### func
Specifies that the input is typeof function.
```javascript
const schemaObject = {
 	foo: schema.func
}
```

### regexTest
Specifies that the input shoud be validated by regex test
```javascript
const schemaObject = {
 	string: schema.regexTest(/^Edgars$/)
}
```

### undef
Specifies that the input shoud be typeof undefined
```javascript
const schemaObject = {
 	string: schema.undef
}
```
