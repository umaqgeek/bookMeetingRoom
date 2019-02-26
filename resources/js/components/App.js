import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import BookingList from './BookingList';
import NewBooking from './NewBooking';
import DetailBooking from './DetailBooking';

class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={BookingList} />
              <Route path='/create' component={NewBooking} />
              <Route path='/:id' component={DetailBooking} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
