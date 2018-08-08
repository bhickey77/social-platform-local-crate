import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import Footer from './components/Footer/Footer';
import PartnerPage from './components/PartnerPage/PartnerPage';
import InfoPage from './components/InfoPage/InfoPage';
import UploadCard from './components/UploadCard/UploadCard';
import Newsfeed from './components/Newsfeed/Newsfeed';
// import AddNewPartner from './components/AddNewPartner/AddNewPartner';
import Register from './components/Register/Register';
import AdminPartnerAccounts from './components/AdminPartnerAccounts/AdminPartnerAccounts';
import AdminPosts from './components/AdminPosts/AdminPosts';
// import Nav from './components/Nav/Nav';
import './styles/main.css';

const App = () => (
  <div className="container-parent">
    <Router>
      <Switch>
        <Redirect exact from="/" to="/newsfeed" />
        <Route
          path="/newsfeed"
          component={Newsfeed}
        />
        <Route
          path="/partner"
          component={PartnerPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/upload"
          component={UploadCard}
        />
        <Route
          exact path="/admin/accounts"
          component={AdminPartnerAccounts}
        />
        <Route
          exact path="/admin/posts"
          component={AdminPosts}
        />
         {/* <Route
          exact path="/addNewPartner"
          component={AddNewPartner}
        /> */}
          <Route
          exact path="/Register"
          component={Register}
        />
        <Route 
          path="/partner/:id"
          component={PartnerPage} />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
    {/* <Footer className="item-c"/> */}
  </div>
);

export default App;

