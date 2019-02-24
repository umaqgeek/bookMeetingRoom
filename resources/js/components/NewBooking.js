import axios from 'axios'
import React, { Component } from 'react'

class NewBooking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      booking_date: '',
      booking_day: '',
      book_time_id: 0,
      meeting_room_id: 0,
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateNewBooking = this.handleCreateNewBooking.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
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
        })
      })
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

  render () {
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>Create new booking</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateNewBooking}>
                  <div className='form-group'>
                    <label htmlFor='name'>Booking Title</label>
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

                  <button className='btn btn-primary'>Book</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewBooking
