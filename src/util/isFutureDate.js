import moment from "moment";

// https://stackoverflow.com/questions/19648688/moment-js-returning-wrong-date
const isFutureDate = date => {
  if (moment.utc().diff(moment.utc(date), "seconds") > 0) {
    return false;
  }
  return true;
};

export default isFutureDate;
