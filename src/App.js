import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Private from './Private';
import { BrowserRouter, Route } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-86810625.okta.com/oauth2/default',
  clientId: '0oa1jvzbmhxo5T6Rj5d7',
  redirectUri: window.location.origin + '/'
  //redirectUri: window.location.origin + '/callback'
});

function App() {
  const history = useHistory();
  

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    //history.replace(toRelativeUrl(originalUri, window.location.origin));
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  const onAuthRequired = function () {
    history.push('/login')
  }

  //start- 02 SEPT
  
  //ens- 02 SEPT

  return (
    <div className="App">
      <div className="page">
        <div className="content">
          <Security oktaAuth={oktaAuth}
            restoreOriginalUri={restoreOriginalUri}
            onAuthRequired={onAuthRequired}>
            <Header />
            <Route path='/' exact={true} component={Home} />
            <Route path='/login' exact={true} component={Login} />
            <SecureRoute path='/private' exact={true} component={Private} />
            
            <Route path='/callback' component={LoginCallback} />
          </Security>
        </div>
      </div>
    </div>
  );
}

export default App;