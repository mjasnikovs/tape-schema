# tape-schema
tap-producing test harness schema validation for node

## install
```
npm install --save-dev tape-schema
```

## example
```JS
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
```JS
const schemaObject = {
 	name: schema.string
}
```

### number
Specifies that the input is number.
```JS
const schemaObject = {
 	discount: schema.number
}
```

### naturalNumber
Specifies that the input is natural number. (including 0)
```JS
const schemaObject = {
 	age: schema.naturalNumber
}
```

### boolean
Specifies that the input is boolean.
```JS
const schemaObject = {
 	isOnline: schema.boolean
}
```

### any
Specifies that the input is any value in array.
```JS
const schemaObject = {
 	task: schema.any([null, schema.string, 'assigned'])
}
```

### latitude
Specifies that the input is latitude.
```JS
const schemaObject = {
 	latitude: schema.latitude
}
```

### longitude
Specifies that the input is longitude.
```JS
const schemaObject = {
 	longitude: schema.longitude
}
```

### func
Specifies that the input is typeof function.
```JS
const schemaObject = {
 	foo: schema.func
}
```

### regexTest
Specifies that the input shoud be validated by regex test
```JS
const schemaObject = {
 	string: schema.regexTest(/^Edgars$/)
}
```
