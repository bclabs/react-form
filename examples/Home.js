import { browserHistory } from 'react-router'
import Form, { Field } from '../components/Form'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            repoForm: {}
        }
    }
    
    onSubmit = formValues => {
        browserHistory.push('/repos/' + formValues.username)
    };
    
    onChange = v => {
        this.setState({repoForm: v});
    };
    
    render() {
        return (
            <div className="Home">
                <h1>Home</h1>
                <Form onSubmit={this.onSubmit} onChange={this.onChange}>
                    <Field placeholder="username" name="username" />
                    <button type="submit">{this.state.repoForm.username}'s Repositories</button>
                </Form>
            </div>
        )
    }
}

export default Home
