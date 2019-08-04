import React from 'react'
import "../pages/styles/main.less"

export default class OAuthRedirect extends React.Component{

  static async getInitialProps ({ req, query }) {

	const isServer = !!req

	if(query.jsonBody) {
		return {token: query.jsonBody};
	}
  }

  render () {
  	return (
  		<div className="content-page">
  		{this.props.token.statusCode == 200 ?
  			<div> SUCCESS! Access Token: {this.props.token.access_token} </div>
  		:
  			<div> HTTP: {this.props.token.statusCode}, {this.props.token.error_description} </div>
  		}
  		
  		</div>
  	);
  }
}
