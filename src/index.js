import React, { Component } from 'react'

const recursiveCloneChildren = (children, onFieldChange, values) => (
    React.Children.map(children, child => {
        var childProps = {};

        if (React.isValidElement(child) && child.type === Field) {
            const value = (values[child.props.name] !== undefined) ?
                values[child.props.name] :
                (child.props.initialValue || '')

            childProps = {
                onChange: onFieldChange(child.props.name),
                value
            }
        }

        if (child && child.props) {
            // String has no Prop
            childProps.children = recursiveCloneChildren(child.props.children, onFieldChange, values);
            return React.cloneElement(child, childProps);
        }

        return child;
    })
)

const extractValue = (e) => {
    if (e.target) {
        if (e.target.type === 'checkbox') {
            return e.target.checked
        }
        return e.target.value
    }

    return e
}

export class Field extends React.Component {
    constructor(props) {
        super(props)
    }

    focus() {
        this.input.focus()
    }

    render() {
        const { type = 'text', initialValue, onChange, component = 'input', children, ...rest } = this.props

        return React.createElement(component, {
            ref: c => this.input = c,
            type,
            onChange: e => onChange(extractValue(e)),
            ...rest
        }, children)
    }
}

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {}
        }
    }

    // Update internal state on each field's onChange event, also call out to the form's onChange
    // prop if that was provided too
    onFieldChange = (fieldName) => v => {
        const { onChange } = this.props
        const { values } = this.state

        const newValues = {
            ...values,
            [fieldName]: v
        }

        this.setState({
            values: newValues
        })

        onChange && onChange(newValues)
    };

    // Prevent default if this is an event and submit if onSubmit exists
    handleSubmit = e => {
        const { onSubmit } = this.props
        const { values } = this.state

        e && e.preventDefault()

        onSubmit && onSubmit(values)
    };

    render() {
        const { children, onChange, ...rest } = this.props
        const { values } = this.state

        // Loop through Fields and add onChange and value props
        const childrenWithOnChange = recursiveCloneChildren(children, this.onFieldChange, values)

        return (
            <form {...rest} onSubmit={this.handleSubmit}>
                {childrenWithOnChange}
            </form>
        )
    }
}

export default Form
