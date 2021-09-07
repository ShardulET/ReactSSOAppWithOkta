import React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useState, useEffect } from "react";

function Header() {
  const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const login = async () => { await oktaAuth.signInWithRedirect(); }
  const logout = async () =>{ await oktaAuth.signOut();}

  const userText = authState.isAuthenticated
    ? <button onClick={logout}>Logout</button>
    : <button onClick={login}>Sign In</button>;

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then(info => {
        //TO DO: API Call
        setUserInfo(info);
        const accessToken = authState.accessToken;
        // /* global fetch */
        // const response = fetch("https://dev-86810625.okta.com/oauth2/default", {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });
        //console.log(response);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  //  //02 SEPT- start
  // // oktaAuth = new OktaAuth({
  // //   issuer: "https://dev-86810625.okta.com/oauth2/default",
  // //   clientId: '0oa1jvzbmhxo5T6Rj5d7',
  // //   pkce: true
  // // });
  // oktaAuth.session.exists()
  //   .then((exists) => {
  //     exists && oktaAuth.token.getWithoutPrompt({
  //       responseType: ['token', 'id_token'],
  //     })
  //       .then((res) => {
  //         oktaAuth.handleLoginRedirect(res.tokens);
  //       });
  //   });

  // //02 SEPT- end

  //const accessToken = authState.accessToken;
  /* global fetch */
  // const response = fetch(url, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });


  //  signOut=() =>{
  //     var auth2 = gapi.auth2.getAuthInstance();
  //     auth2.signOut().then(function () {
  //       console.log('User signed out.');
  //     });
  //   }

  return (
    <header>
      <div>React Login</div>
      {userInfo && (
        <div>
          <p>Welcome, {userInfo.name}
            {userInfo.groups.includes('Admins') ? <label> Admin</label> : <label> Visitor</label>
            }!</p>
        </div>
      )}
      {
        userInfo && userInfo.groups.includes('Admins') && (
          <div>

          </div>
        )
      }
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/private">Private</Link></li>
        {/* <li><a href="#" onclick="signOut();">Sign out</a></li> */}
      </ul>
      {userText}
    </header>
  );
}

export default Header;