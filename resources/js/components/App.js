import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import { PrivateRoute } from './PrivateRoute';

import BookingList from './BookingList';
import NewBooking from './NewBooking';
import DetailBooking from './DetailBooking';
import MenuBar from './MenuBar';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import NoMatch from './NoMatch';
import ManageList from './ManageList';
import ManageDetailList from './ManageDetailList';
import AfterBooking from './AfterBooking';
import About from './About';

class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <MenuBar />
            <Switch>
              <Route exact path='/' component={BookingList} />
              <Route exact path='/create' component={NewBooking} />
              <Route exact path='/detail/:id' component={DetailBooking} />
              <Route exact path='/loginpage' component={LoginPage} />
              <Route exact path='/logoutpage' component={LogoutPage} />
              <Route exact path='/afterbooking' component={AfterBooking} />
              <Route exact path='/about' component={About} />
              <PrivateRoute exect path='/detailmanage/:id' component={ManageDetailList} />
              <PrivateRoute exect path='/managelist' component={ManageList} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
