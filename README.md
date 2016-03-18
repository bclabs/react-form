# React Form

Simple form component for React applications. This component is very much in alpha and the API will be changing rapidly.

## Usage

```javascript
import Form, { Field } from '@brllnt/react-form'

const LoginForm = () => (
    <Form onChange={values => console.log(values)}>
        <Field name="email" type="email" />
        <Field name="password" type="password" />
        <button type="submit">Submit</button>
    </Form>
)
```

## API

#### `<Form>`

##### Props
name | type | description
---|---|---
onChange | function | Fires every time an input is changed: `onChange(values)`
onSubmit | function | Fires on submit: `onChange(values)`

`onChange` and `onSubmit` both are called with one parameter, an object with the keys being the names of each field

#### `<Field>`

##### Props
name | type | description
---|---|---
name | string | Name of the property (also what will be used as the key in the values object)
type | string | Type of input
component | string or Component | Component to use for the input (defaults to `input`)
