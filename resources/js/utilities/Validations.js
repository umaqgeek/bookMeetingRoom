export const isBookingValid = (booking) => {
  var obj = {
    status: true,
    message: ''
  };

  /**
  title: '',
  booking_date: '',
  booking_day: '',
  book_time_id: 0,
  meeting_room_id: 0
  */

  if (booking.title === '' && obj.status) {
    obj.status = false;
    obj.message = 'Do not leave blank title';
  }
  if ((booking.booking_date === '' || booking.booking_day === '') && obj.status) {
    obj.status = false;
    obj.message = 'Do not leave blank booking date and day';
  }
  if ((booking.book_time_id === '' || booking.book_time_id == 0) && obj.status) {
    obj.status = false;
    obj.message = 'Do not leave blank booking time';
  }
  if ((booking.meeting_room_id === '' || booking.meeting_room_id == 0) && obj.status) {
    obj.status = false;
    obj.message = 'Do not leave blank meeting room';
  }

  return obj;
};
