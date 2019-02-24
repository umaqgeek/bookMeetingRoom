import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import dateFormat from 'dateformat';

class NewBooking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      booking_date: '',
      booking_day: '',
      book_time_id: 0,
      meeting_room_id: 0,
      book_times: [],
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
    this.getData();
  }

  getData() {
    this.setState({
      loadingText: '[ Loading .. ]'
    });
    axios.get('/api/book-times').then(response => {
      this.setState({
        book_times: response.data,
        loadingText: ''
      });
    });
  }

  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCreateNewBooking (event) {
    event.preventDefault()

    const { history } = this.props

    const booking = {
      title: this.state.title,
      booking_date: this.state.booking_date,
      booking_day: this.state.booking_day,
      book_time_id: this.state.book_time_id,
      meeting_room_id: this.state.meeting_room_id
    }

    axios.post('/api/bookings', booking)
      .then(response => {
        // redirect to the homepage
        history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        });
      });
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
      var now = new Date(value);
      var dateVal = dateFormat(now, 'yyyy-mm-dd');
      var dateDay = now.getDay(); // TODO
      this.setState({
        booking_day: dateDay,
        booking_date: dateVal,
        choosen_booking_date: value
      });
  };

  render () {
    const { book_times } = this.state;
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new booking</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewBooking}>
                  <div className='form-group'>

                    <label htmlFor='name'>Booking Date <span style={{color: 'red'}}>*</span></label>
                    <div>
                      <DatePicker
                        onChange={this.getPickerValue}
                        value={this.state.choosen_booking_date}
                        style={{ width: '100%' }}
                        minDate={new Date()}
                      />
                    </div>

                    <br />

                    <label htmlFor='name'>Booking Time <span style={{color: 'red'}}>*</span></label>
                    <div>
                      <select className="browser-default custom-select" name="book_time_id" onChange={this.handleFieldChange}>
                        <option>Choose book time</option>
                        {book_times.map(bt => (
                          <option key={bt.id} value={bt.id}>{bt.description}</option>
                        ))}
                      </select>
                    </div>

                    <br />

                    <label htmlFor='name'>Booking Title <span style={{color: 'red'}}>*</span></label>
                    <input
                      id='title'
                      type='text'
                      className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                      name='title'
                      value={this.state.title}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor('title')}

                  </div>

                  <br />
                  {JSON.stringify(this.state)}
                  <br />

                  <button className='btn btn-primary'>Book</button>
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
