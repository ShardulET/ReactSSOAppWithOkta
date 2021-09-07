import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';


class OktaSignInWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionToken: null,
      email: '',
      password: ''
    };

    this.oktaAuth = new OktaAuth({
      issuer: props.baseUrl,
      clientId: '0oa1jvzbmhxo5T6Rj5d7',
      pkce: true
    });

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  async signIn(event) {
    event.preventDefault();
    const transaction = await this.oktaAuth.signIn({
      username: this.state.email,
      password: this.state.password
    });

    if (transaction.status === 'SUCCESS') {
      this.props.oktaAuth.signInWithRedirect({sessionToken: transaction.sessionToken})
    } else {
      throw new Error('Could not sign in: ' + transaction.status);
    }
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

//    signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }
  

  render() {
    return (
      <form onSubmit={this.signIn} className="login-form">
        <h2>Log In</h2>
        <p>Please login to continue</p>
        <label className="full-width-input">
          Email
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} required />
        </label>
        <label className="full-width-input">
          Password
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} required autoComplete="off" />
        </label>
        <button className="button">Login</button>
        {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
        <div>
        <a href="https://dev-86810625.okta.com/oauth2/v1/authorize?idp=0oa1kgdpld7YCe9Ze5d7&client_id=0oa1kghatkhZIyoLS5d7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:3000/callback&state=WM6D&nonce=YsG76jo">
            Sign in with Facebook</a>
            {/* <a href="https://dev-86810625.okta.com/oauth2/v1/authorize?idp=0oa1kgdpld7YCe9Ze5d7&client_id=0oa1kghatkhZIyoLS5d7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https://61320ef4bac5dd1c36af3301--reactssowihtokta.netlify.app/callback&state=WM6D&nonce=YsG76jo">
            Sign in with Facebook</a> */}
        </div>
        <div>
        <a href="https://dev-86810625.okta.com/oauth2/v1/authorize?idp=0oa1ki0wv3xRy5EiF5d7&client_id=0oa1ki5848TV132RD5d7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:3000/callback&state=WM6D&nonce=YsG76jo">
            Sign in with Google</a>
            {/* <a href="https://dev-86810625.okta.com/oauth2/v1/authorize?idp=0oa1ki0wv3xRy5EiF5d7&client_id=0oa1ki5848TV132RD5d7&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=https://61320ef4bac5dd1c36af3301--reactssowihtokta.netlify.app&state=WM6D&nonce=YsG76jo">
            Sign in with Google</a> */}
        </div>
        {/* <a href="#" onclick="signOut();">Sign out</a> */}
      </form>
    );
  }
};

export default withOktaAuth(OktaSignInWidget);