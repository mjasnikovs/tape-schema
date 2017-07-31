const colors = require('ansicolors')

const $TAPE_SCHEMA = '$TAPE_SCHEMA'

const STRING = '$STRING'
const NUMBER = '$NUMBER'
const ANY = '$ANY'

const isDirectValue = val => ['boolean', 'number', 'string'].indexOf(typeof val) !== -1 || val === null

const showObject = val => {
	const value = isDirectValue(val) ? val : JSON.stringify(val, null, 2)

	if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
		return colors.yellow(value)
	}

	return colors.green(`"${value}"`)
}

const validAny = object => {
	if (Array.isArray(object)) {
		return object
			.map(val => validAny(val))
			.indexOf(false) === -1
	}
	const {value, target} = object
	return value === target
}

const invalidAny = object => {
	return object.reduce((all, val) => {
		if (Array.isArray(val)) {
			return [...all, ...invalidAny(val)]
		}
		const {value, target} = val
		if (value !== target) {
			return [...all, val]
		}
		return all
	}, [])
}

const validator = (schema, object, prefix = '') => {
	if (isDirectValue(schema)) {
		return {
			value: schema,
			target: object,
			msg: `${colors.white(prefix)} = ${showObject(object)} ${colors.brightBlack(`value "${schema}"`)}`
		}
	}

	if (schema.$TAPE_SCHEMA === $TAPE_SCHEMA) {
		if (schema.$type === STRING) {
			return {
				value: typeof object,
				target: 'string',
				msg: `${colors.white(prefix)} = ${showObject(object)} ${colors.brightBlack('schema.string')}`
			}
		} else if (schema.$type === NUMBER) {
			return {
				value: typeof object,
				target: 'number',
				msg: `${colors.white(prefix)} = ${showObject(object)} ${colors.brightBlack('schema.number')}`
			}
		} else if (schema.$type === ANY) {
			const result = schema.$values.map(anySchema => validator(anySchema, object, prefix))
			const validResult = result.find(anyObject => validAny(anyObject))

			if (typeof validResult === 'undefined') {
				return invalidAny(result)
			}

			return {
				value: true,
				target: true,
				msg: `${colors.white(prefix)} = ${showObject(object)} ${colors.brightBlack('schema.any')}`
			}
		}
	}

	if (Array.isArray(schema)) {
		if (Array.isArray(object)) {
			return object.map((val, num) => {
				return validator(...schema, val, `.. ${prefix}[${num}]`)
			})
		}

		return {
			value: false,
			target: true,
			msg: `${colors.white(prefix)} = ${showObject(object)} ${colors.brightBlack('required typeof Array for further validation')}`
		}
	}

	return Object.keys(schema).map(key => {
		if (object) {
			return validator(schema[key], object[key], `${prefix}${key}`)
		}

		return {
			value: false,
			target: true,
			msg: `${colors.white(prefix)} = ${showObject(object)} ${colors.brightBlack('required typeof Object for further validation')}`
		}
	})
}

const equalTest = (t, result) => {
	if (Array.isArray(result)) {
		return result.forEach(val => equalTest(t, val))
	}
	const {value, target, msg} = result
	return t.equal(value, target, msg)
}

const test = (t, schema, object) => {
	return equalTest(t, validator(schema, object))
}

const string = {
	$TAPE_SCHEMA,
	$type: STRING
}

const number = {
	$TAPE_SCHEMA,
	$type: NUMBER
}

const any = $values => {
	return {
		$TAPE_SCHEMA,
		$type: ANY,
		$values
	}
}

// const colors = require('ansicolors')

// const objectColor = val => {
// 	return typeof val === 'number' ? colors.yellow(val) : colors.green(`'${val}'`)
// }

// const isDirectValue = val => ['boolean', 'number', 'string'].indexOf(typeof val) !== -1 || val === null

// const test = (t, schema, object, prefix = '') => {
// 	if (schema.$name) {
// 		t.equal(1, 1, `${colors.brightBlack(`Schema:`)} ${colors.brightCyan(`"${schema.$name}"`)}`)
// 	}

// 	Object.keys(schema).forEach(key => {
// 		if (key === '$name') {
// 			return
// 		}

// 		const value = object[key]
// 		const validation = schema[key]

// 		if (Array.isArray(value)) {
// 			return value.forEach((val, num) => test(t, ...validation, val, `.. ${prefix}${key}[${num}].`))
// 		}

// 		if (isDirectValue(validation)) {
// 			return t.equal(
// 				value,
// 				validation,
// 				`${colors.white(`${prefix}${key}`)} = ${objectColor(value)} ${colors.brightBlack('expected')} ${objectColor(validation)}`
// 			)
// 		}

// 		return t.equal(
// 			validation._exec(value),
// 			true,
// 			`${colors.white(`${prefix}${key}`)} = ${objectColor(value)} ${colors.brightBlack(validation._message)}`
// 		)
// 	})
// }

// const string = {
// 	_message: 'schema.string',
// 	_exec: value => typeof value === 'string'
// }

// const number = {
// 	_message: 'schema.number',
// 	_exec: value => typeof value === 'number'
// }

// const any = value => {
// 	return {
// 		_message: `schema.any([${value.map(val => {
// 			if (isDirectValue(val)) {
// 				return val
// 			}


// 			return val._message.slice(7)
// 		}).join(', ')}])`,
// 		_exec: () => {
// 			return typeof value.find(val => {
// 				return isDirectValue(val) ? val === value : val._exec(value) === true
// 			}) === 'undefined'
// 		}
// 	}
// }

module.exports = {
	test,
	string,
	number,
	any
}
