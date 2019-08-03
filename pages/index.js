import {properties} from './src/properties.js';
import { OauthSender } from 'react-oauth-flow';
import "../pages/styles/main.less"


class SubmitForm extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			clientID: properties.clientID,
			authorizationURL: properties.authorizationURL,
			scope: 'openid email profile',
			isDisabled: false
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.initHandshake = this.initHandshake.bind(this);
	}

	handleInputChange (e) {
		let name = e.currentTarget.name;
		this.setState({[name]: e.currentTarget.value});
		if(this.state.clientID && this.state.clientSecret && this.state.authorizationURL) {
			this.setState({isDisabled : false});
		} else {
			console.log("yo");
		}
	}

	initHandshake (e) {
		let url = e.currentTarget.getAttribute('data-login-url');
		location.href = url;
	}
	
	render () {

		const sendArgs = {
			scope: this.state.scope
		};

		//Pass login provider in state since we're going to do the token request on the 'server'
		const state = {idp: 'ms'};
		return (
			<div className='submit-form'>
				<div className='form-inputs'>
					<label htmlFor="clientID"> Client ID </label>
					<input name="clientID" value={this.state.clientID} onChange={this.handleInputChange}/>
					<label htmlFor="authorizationURL"> Authorization URL </label>
					<input name="authorizationURL"  value={this.state.authorizationURL} onChange={this.handleInputChange}/>
					<label htmlFor="scope"> Scope </label>
					<input name="scope"  value={this.state.scope} onChange={this.handleInputChange}/>
				</div>
				<OauthSender
        			authorizeUrl={this.state.authorizationURL}
        			clientId={this.state.clientID}
        			redirectUri="http://localhost:3000/oauthRedirect"
        			state={state}
        			args={sendArgs}
        			render={({ url }) => <button onClick={this.initHandshake} data-login-url={url} disabled={this.state.isDisabled}>LOGIN</button>}
      			/>
			</div>
		);
	}
}

class App extends React.Component {
	render () {
		return (
			<div>
				<SubmitForm />
			</div>
		);
	}
};

export default App;