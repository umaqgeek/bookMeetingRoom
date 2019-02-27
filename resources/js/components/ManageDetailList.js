import axios from 'axios';
import React, { Component } from 'react';
import { getDayOfWeek } from '../utilities/MyFunc';
import LoadingBadge from './LoadingBadge';
import { Link } from 'react-router-dom';
import ConfirmBox from './ConfirmBox';

class ManageDetailList extends Component {
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
        },
        approved: 0
      },
      loadingText: '',
      boxModal: {
        isModal: false,
        message: '',
        color: ''
      }
    },
    this.onDeleteBooking = this.onDeleteBooking.bind(this);
    this.onApproveBooking = this.onApproveBooking.bind(this);
    this.onConfirmModal = this.onConfirmModal.bind(this);
  }

  componentWillUnmount() {
    this.setState({
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
        },
        approved: 0
      },
      loadingText: '',
      boxModal: {
        isModal: false,
        message: '',
        color: ''
      }
    });
  };

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
            description: response.data.book_time.description
          },
          meeting_room: {
            id: response.data.meeting_room.id,
            description: response.data.meeting_room.description
          },
          approved: response.data.approved
        },
        loadingText: ''
      });
    });
  };

  onDeleteBooking() {

    this.setState({
      ...this.state,
      boxModal: {
        isModal: true,
        message: 'Are you sure?',
        color: 'blue'
      }
    });

  };

  onApproveBooking(status) {
    const bookingId = this.props.match.params.id;

    this.setState({
      loadingText: '[ Approving .. ]'
    });

    axios.put(`/api/approve-booking/${bookingId}`, {
      approved: status
    }).then(response => {
      this.setState({
        dataServer: {
          ...this.state.dataServer,
          approved: status
        },
        loadingText: ''
      });
    })
    .catch(error => {
      this.setState({
        loadingText: ''
      });
    });
  };

  onConfirmModal() {
    const bookingId = this.props.match.params.id;

    this.setState({
      loadingText: '[ Deleting .. ]'
    });

    axios.delete(`/api/bookings/${bookingId}`).then(response => {
      this.setState({
        loadingText: ''
      });

      const { history } = this.props;
      history.push('/managelist');
    });
  }

  render () {
    const { dataServer } = this.state;

    let onCloseModal = () => {
      this.setState({
        ...this.state,
        boxModal: {
          isModal: false,
          message: '',
          color: ''
        }
      });
    };

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Booking Detail <LoadingBadge text={this.state.loadingText} /></div>
              <div className='card-body'>

                <ConfirmBox
                  open={this.state.boxModal.isModal}
                  message={this.state.boxModal.message}
                  color={this.state.boxModal.color}
                  onCloseModal={onCloseModal}
                  onConfirmModal={this.onConfirmModal}
                />

                <Link to='/managelist'>
                  <button type='button' className='btn btn-primary mb-3'>Back</button>
                </Link>

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
                    <tr>
                      <td>Status</td>
                      <td>:</td>
                      <td>{dataServer.approved == 1 ?
                        (<strong style={{color: 'green'}}>Approved</strong>) :
                        (<strong style={{color: 'red'}}>Pending</strong>)}</td>
                    </tr>
                  </tbody>
                </table>

                <hr />

                {dataServer.approved == 1 ?
                  (<span className='mr-5'><button type='button' className='btn btn-dark' onClick={() => this.onApproveBooking(0)}>Reject</button></span>) :
                  (<span className='mr-5'><button type='button' className='btn btn-success' onClick={() => this.onApproveBooking(1)}>Approve</button></span>)}
                <button type='button' className='btn btn-danger' onClick={this.onDeleteBooking}>Delete</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ManageDetailList
