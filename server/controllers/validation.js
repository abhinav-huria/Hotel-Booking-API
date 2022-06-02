export const checkLength = function (len) {
  let minLength = len;
  let maxLength = len;
  return {
    validator: function (value) {
      if (value === undefined) return true;
      return value.length >= minLength && value.length <= maxLength;
    },
    message: "Phone number must have 10 digits",
  };
};

export const getBookingDates = function (startDate, endDate) {
  let bookingDates = [];
  let start = new Date(Number(startDate));
  let end = new Date(Number(endDate));

  while (start <= end) {
    bookingDates.push(start.getTime());
    start = new Date(start.setDate(start.getDate() + 1));
  }
  return bookingDates;
};
