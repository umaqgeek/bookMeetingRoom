import axios from 'axios';
import React, { Component } from 'react';
import { getDayOfWeek } from '../utilities/MyFunc';
import LoadingBadge from './LoadingBadge';

class DetailBooking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataServer: {
        title: '',
        booking_date: '',
        booking_day: '',
        book_time: {
          id: 0,
          description: ''
        },
        meeting_room: {
          id: 0,
          description: ''
        }
      },
      loadingText: ''
    }
  }

  componentDidMount () {
    const bookingId = this.props.match.params.id;

    this.setState({
      loadingText: '[ Loading .. ]'
    });

    axios.get(`/api/bookings/${bookingId}`).then(response => {
      this.setState({
        dataServer: {
          title: response.data.title,
          booking_date: response.data.booking_date,
          booking_day: response.data.booking_day,
          book_time: {
            id: response.data.book_time.id,
            description: response.data.book_time.id
          },
          meeting_room: {
            id: response.data.meeting_room.id,
            description: response.data.meeting_room.description
          }
        },
        loadingText: ''
      });
    });
  }

  render () {
    const { dataServer } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Booking Detail <LoadingBadge text={this.state.loadingText} /></div>
              <div className='card-body'>

                <table className='table'>
                  <tbody>
                    <tr>
                      <td>Title</td>
                      <td>:</td>
                      <td>{dataServer.title}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>:</td>
                      <td>{dataServer.booking_date}, {dataServer.booking_day}</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>:</td>
                      <td>{dataServer.book_time.description}</td>
                    </tr>
                    <tr>
                      <td>Meeting Room</td>
                      <td>:</td>
                      <td>{dataServer.meeting_room.description}</td>
                    </tr>
                    <tr><td colSpan='3'></td></tr>
                  </tbody>
                </table>

                <button className='btn btn-danger'>
                  Delete
                </button>

                <hr />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailBooking
