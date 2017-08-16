const {
	white,
	brightBlack,
	yellow,
	green
} = require('ansicolors')

const $TAPE_SCHEMA = '$TAPE_SCHEMA'

const STRING = '$STRING'
const NUMBER = '$NUMBER'
const NATURAL_NUMBER = '$NATURAL_NUMBER'
const BOOLEAN = '$BOOLEAN'
const ANY = '$ANY'

const LATITUDE = '$LATITUDE'
const LONGITUDE = '$LONGITUDE'
const FUNCTION = '$FUNCTION'
const REGEX_TEST = '$REGEX_TEST'
const UNDEFINED = '$UNDEFINED'

const isDirectValue = val => ['boolean', 'number', 'string'].indexOf(typeof val) !== -1 || val === null

const showObject = val => {
	if (typeof val === 'function') {
		return `${white('[')}${yellow('Function')}${white(']')}`
	}

	const value = isDirectValue(val) ? val : JSON.stringify(val, null, 4)

	if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
		return yellow(value)
	}

	return green(`'${value}'`)
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
			msg: `${white(prefix)} = ${showObject(object)} ${brightBlack(`value "${schema}"`)}`
		}
	}

	if (typeof schema === 'undefined') {
		return {
			value: false,
			target: true,
			msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema can\'t be typeof undefined, use schema.undef to validate undefined values')}`
		}
	}

	if (schema.$TAPE_SCHEMA === $TAPE_SCHEMA) {
		if (schema.$type === STRING) {
			return {
				value: typeof object,
				target: 'string',
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.string')}`
			}
		} else if (schema.$type === NUMBER) {
			return {
				value: typeof object === 'number' && Number(object) === object && object !== Infinity,
				target: true,
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.number')}`
			}
		} else if (schema.$type === NATURAL_NUMBER) {
			return {
				value: typeof object === 'number' && object % 1 === 0 && Number.isInteger(object) && object >= 0,
				target: true,
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.naturalNumber')}`
			}
		} else if (schema.$type === BOOLEAN) {
			return {
				value: typeof object,
				target: 'boolean',
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.boolean')}`
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
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.any')}`
			}
		} else if (schema.$type === LATITUDE) {
			return {
				value: typeof object === 'number' && object > -90 && object < 90,
				target: true,
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.latitude')}`
			}
		} else if (schema.$type === LONGITUDE) {
			return {
				value: typeof object === 'number' && object > -180 && object < 180,
				target: true,
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.longitude')}`
			}
		} else if (schema.$type === FUNCTION) {
			return {
				value: typeof object,
				target: 'function',
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.func')}`
			}
		} else if (schema.$type === REGEX_TEST) {
			return {
				value: schema.$values.test(object),
				target: true,
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.regexTest')}`
			}
		} else if (schema.$type === UNDEFINED) {
			return {
				value: typeof object,
				target: 'undefined',
				msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('schema.undef')}`
			}
		}
	}

	if (Array.isArray(schema)) {
		if (Array.isArray(object)) {
			if (!object.length && schema.length) {
				return {
					value: false,
					target: true,
					msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('required non-empty typeof Array for further validation')}`
				}
			}

			if (!schema.length && object.length) {
				return {
					value: false,
					target: true,
					msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('required empty typeof Array, object contains data')}`
				}
			}

			if (schema.length > 1) {
				return schema.map((val, num) => {
					return validator(val, object[num], `${brightBlack('..')} ${prefix}[${yellow(num)}]`)
				})
			}

			return object.map((val, num) => {
				return validator(...schema, val, `${brightBlack('..')} ${prefix}[${yellow(num)}]`)
			})
		}

		return {
			value: false,
			target: true,
			msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('required typeof Array for further validation')}`
		}
	}

	const overflow = Object.keys(object || {})
		.filter(objectKey => !schema.hasOwnProperty(objectKey))
		.map(objectKey => {
			return {
				value: false,
				target: true,
				msg: `${prefix}${prefix ? brightBlack('.') : ''}${white(objectKey)} ${brightBlack('is not defined in schema')}`
			}
		})

	const validatorResult = Object.keys(schema).map(key => {
		if (object) {
			return validator(schema[key], object[key], `${prefix}${prefix ? brightBlack('.') : ''}${key}`)
		}

		return {
			value: false,
			target: true,
			msg: `${white(prefix)} = ${showObject(object)} ${brightBlack('required typeof Object for further validation')}`
		}
	})

	return [validatorResult, overflow]
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

const naturalNumber = {
	$TAPE_SCHEMA,
	$type: NATURAL_NUMBER
}

const boolean = {
	$TAPE_SCHEMA,
	$type: BOOLEAN
}

const any = $values => {
	return {
		$TAPE_SCHEMA,
		$type: ANY,
		$values
	}
}

const latitude = {
	$TAPE_SCHEMA,
	$type: LATITUDE
}

const longitude = {
	$TAPE_SCHEMA,
	$type: LONGITUDE
}

const func = {
	$TAPE_SCHEMA,
	$type: FUNCTION
}

const regexTest = $values => {
	return {
		$TAPE_SCHEMA,
		$type: REGEX_TEST,
		$values
	}
}

const undef = {
	$TAPE_SCHEMA,
	$type: UNDEFINED
}

module.exports = {
	test,
	string,
	number,
	naturalNumber,
	boolean,
	any,
	latitude,
	longitude,
	regexTest,
	undef,
	func
}
