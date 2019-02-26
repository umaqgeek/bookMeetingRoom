import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ScrollView } from '@cantonjs/react-scroll-view'
import LoadingBadge from './LoadingBadge';

class BookingList extends Component {
  constructor () {
    super()
    this.state = {
      bookings: [],
      searchBookings: [],
      loadingText: ''
    }
    this.searchHandler = this.searchHandler.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  };

  getData() {
    this.setState({
      loadingText: '[ Loading .. ]'
    });
    axios.get('/api/bookings').then(response => {
      this.setState({
        bookings: response.data,
        searchBookings: response.data,
        loadingText: ''
      });
    });
  };

  searchHandler(obj) {
    var txt = obj.target.value;
    if (txt != '') {
      var searchArr = this.state.bookings;
      searchArr = searchArr.filter(function (d) {
        return d.title.toLowerCase().includes(txt.toLowerCase())
          || d.booking_date.toLowerCase().includes(txt.toLowerCase())
          || d.booking_day.toLowerCase().includes(txt.toLowerCase())
          || d.book_time.description.toLowerCase().includes(txt.toLowerCase())
          || d.meeting_room.description.toLowerCase().includes(txt.toLowerCase())
      });
      this.setState({
        searchBookings: searchArr
      });
    } else {
      this.setState({
        searchBookings: this.state.bookings
      });
    }
  };

  render () {
    const { searchBookings } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-body'>

                <Link className='btn btn-primary mb-2' to='/create'>
                  New booking
                </Link>
                <LoadingBadge text={this.state.loadingText} />

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="bookSearch"
                    placeholder="Search here"
                    onChange={this.searchHandler}
                  />
                </div>

                <ScrollView style={{ height: screen.height * 0.5 }}>
                  <ul className='list-group'>
                    {searchBookings.map(booking => (
                      <Link
                        className='list-group-item list-group-item-action'
                        to={`/detail/${booking.id}`}
                        key={booking.id}
                      >
                        <span style={{ fontSize: '14px' }}>{booking.title}</span> <br />
                        <span style={{ fontSize: '10px' }}>{booking.booking_date + ', ' + booking.booking_day + ', ' + booking.book_time.description}</span> <br />
                        <span style={{ fontSize: '12px' }}>{booking.meeting_room.description}</span> <br />
                      </Link>
                    ))}
                  </ul>
                </ScrollView>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookingList
