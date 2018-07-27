import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import UploadFile from './components/UploadFile/UploadFile';
import PublicHome from './components/PublicHome/PublicHome';
import AdminMailer from './components/AdminMailer/AdminMailer';
import PartnerMailUrl from './components/PartnerMailUrl/PartnerMailUlr';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={PublicHome}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/upload"
          component={UploadFile}
        />
        <Route
          path="/admin"
          component={AdminMailer}
        />
        <Route
          path="/partnerMailUrl"
          component={PartnerMailUrl}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
