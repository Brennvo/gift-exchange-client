import moment from "moment";

const isFutureDate = date => {
  if (moment().diff(date, "days") > 0) {
    return false;
  }
  return true;
};

export default isFutureDate;
