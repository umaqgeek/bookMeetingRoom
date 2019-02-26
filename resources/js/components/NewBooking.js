import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import dateFormat from 'dateformat';
import { isBookingValid } from '../utilities/Validations';
import { getSqlErrors } from '../utilities/Errors';
import { getDayOfWeek } from '../utilities/MyFunc';
import LoadingBadge from './LoadingBadge';

class NewBooking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataServer: {
        title: '',
        booking_date: '',
        booking_day: '',
        book_time_id: 0,
        meeting_room_id: 0
      },
      book_times: [],
      meeting_rooms: [],
      choosen_booking_date: '',
      loadingText: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.handleCreateNewBooking = this.handleCreateNewBooking.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.getPickerValue = this.getPickerValue.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData('book_times');
    this.getData('meeting_rooms');
  }

  getData(api) {
    this.setState({
      loadingText: '[ Loading .. ]'
    });
    axios.get('/api/'+api.replace('_', '-')).then(response => {
      this.setState({
        ...this.state,
        [api]: response.data,
        loadingText: ''
      });
    });
  }

  handleFieldChange (event) {
    this.setState({
      dataServer: {
        ...this.state.dataServer,
        [event.target.name]: event.target.value
      }
    })
  }

  handleCreateNewBooking (event) {

    event.preventDefault()

    const { history } = this.props

    const booking = {
      ...this.state.dataServer
    }

    var isValid = isBookingValid(booking);

    if (isValid.status) {
      axios.post('/api/bookings', booking)
        .then(response => {
          // redirect to the homepage
          history.push('/')
        })
        .catch(error => {
          alert(getSqlErrors(error.response.data.message));
        });
    } else {
      alert(isValid.message);
    }
  };

  hasErrorFor (field) {
    return !!this.state.errors[field]
  };

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      );
    }
  };

  getPickerValue(value) {
    var dateVal = dateFormat(new Date(value), 'yyyy-mm-dd');
    var dateDay = getDayOfWeek(now.getDay());
    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        booking_day: dateDay,
        booking_date: dateVal
      },
      choosen_booking_date: value
    });
  };

  render () {
    const { book_times, meeting_rooms } = this.state;
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new booking <LoadingBadge text={this.state.loadingText} /></div>
              <div className='card-body'>
                <form method='post' action='#!'>
                  <div className='form-group'>

                    <label htmlFor='booking_date'>Booking Date <span style={{color: 'red'}}>*</span></label>
                    <div>
                      <DatePicker
                        onChange={this.getPickerValue}
                        value={this.state.choosen_booking_date}
                        style={{ width: '100%' }}
                        minDate={new Date()}
                      />
                    </div>

                    <br />

                    <label htmlFor='book_time_id'>Booking Time <span style={{color: 'red'}}>*</span></label>
                    <div>
                      <select className="browser-default custom-select" name="book_time_id" onChange={this.handleFieldChange}>
                        <option>Choose book time</option>
                        {book_times.map(bt => (
                          <option key={bt.id} value={bt.id}>{bt.description}</option>
                        ))}
                      </select>
                    </div>

                    <br />

                    <label htmlFor='meeting_room_id'>Meeting Room <span style={{color: 'red'}}>*</span></label>
                    <div>
                      <select className="browser-default custom-select" name="meeting_room_id" onChange={this.handleFieldChange}>
                        <option>Choose meeting room</option>
                        {meeting_rooms.map(mr => (
                          <option key={mr.id} value={mr.id}>{mr.description}</option>
                        ))}
                      </select>
                    </div>

                    <br />

                    <label htmlFor='title'>Booking Title <span style={{color: 'red'}}>*</span></label>
                    <input
                      id='title'
                      type='text'
                      className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                      name='title'
                      value={this.state.dataServer.title}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('title')}

                  </div>

                  <button type='button' onClick={this.handleCreateNewBooking} className='btn btn-primary'>Book</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default NewBooking;
