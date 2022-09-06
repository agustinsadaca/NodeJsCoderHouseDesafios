export default class dateFormat {
  constructor() {}

  YYYYMMDDxDDMMYYYY(date) {
    let myDate = date.split("-");
    var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    return newDate
  }
}
