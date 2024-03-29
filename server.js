const express = require('express');
const next = require('next');
const request = require('request')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = 3000
const handle = app.getRequestHandler();
app.prepare()
.then(() => {
  const server = express();
  
  server.get('/oauthRedirect', (req, res) => {
  	let json = req.query.state;
  	if(json) {
	  	let state = JSON.parse(json);
	  	this.res = res;
	  	this.req = req;
	  	//Process on server to avoid passing client secret on client side
	  	//Each IDP context would ideally request the relevant token endpoint here
	  	if(state.idp == 'ms'){
	  		let code = req.query.code;
	  		request.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
			  form: {
			    grant_type: 'authorization_code',
			    client_secret: 'URE]TJAy4EO0Xht5/AhsgFRa*I-Rcii2',
			    client_id: 'cae2bf72-f67c-43b0-b1f7-b84ff693ff16',
			    code: code
			  }
			}, (error, res, body) => {
			  if (error) {
			    console.error(error)
			  }

			  let jsonBody = JSON.parse(body);
			  jsonBody.statusCode = res.statusCode;
			  app.render(this.req, this.res, '/oauthRedirect', {jsonBody});
			})
	  	}
  	} else {
  		return handle(req, res);
  	}
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
