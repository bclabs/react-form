class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {}
        }
    }

    // Prevent default if this is an event and submit if onSubmit exists
    handleSubmit = e => {
        const { onSubmit } = this.props
        const { values } = this.state

        e && e.preventDefault()

        onSubmit && onSubmit(values)
    };

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

    render() {
        const { children } = this.props
        const { values } = this.state

        // Loop through Fields and add onChange and value props
        const childrenWithOnChange = React.Children.map(children, (child) => {
            // Only do this stuff if it's a Field
            if (child.type !== Field) {
                return child
            }

            // Make the value equal to the initialValue if it exists or just use what's in state
            const value = (values[child.props.name] !== undefined) ?  values[child.props.name] : (child.props.initialValue || '')

            // Extend the Field with the new props (aka clone it)
            return React.cloneElement(child, { 
                onChange: this.onFieldChange(child.props.name),
                value
            })
        })

        return (
            <form onSubmit={this.handleSubmit}>
                {childrenWithOnChange}
            </form>
        )
    }
}

export const Field = ({ name, type = 'text', onChange, component = 'input', children, ...rest }) => (
    React.createElement(component, { 
        type,
        onChange: e => onChange(e.target.value),
        ...rest
    }, children)
)

export default Form
