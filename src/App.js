import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import UploadFile from './components/UploadFile/UploadFile';
import PublicHome from './components/PublicHome/PublicHome';
import AdminMailer from './components/AdminMailer/AdminMailer';
import PartnerMailUrl from './components/PartnerMailUrl/PartnerMailUlr';
import AdminHome from './components/Admin/AdminHome/AdminHome';
import AdminPartnerAccounts from './components/Admin/AdminPartnerAccounts/AdminPartnerAccounts';
import AdminPosts from './components/Admin/AdminPosts/AdminPosts';

import './styles/main.css';

const App = () => (
  <div className="container">
    <Header title="Project Base"/>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route className="item-b"
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
          exact path="/admin/home"
          component={AdminHome}
        />
        <Route
          exact path="/admin/accounts"
          component={AdminPartnerAccounts}
        />
        <Route
          exact path="/admin/posts"
          component={AdminPosts}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
    <div>
      <Footer title="Project Base" />
    </div>
  </div>
);

export default App;

