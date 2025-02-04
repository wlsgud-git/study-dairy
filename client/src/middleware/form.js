export class Form {
  constructor() {}

  forming(info) {
    let formData = new FormData();

    for (var key in info) {
      let val = info[key];
      if (typeof val == "object")
        val.length
          ? val.forEach((val) => formData.append(`${key}[]`, val))
          : formData.append(`${key}[]`, []);
      else formData.append(key, val);
    }
    return formData;
  }

  inputValidate(action, pn, value) {
    if (action == "post") {
      if (value == "") return false;
      return !pn.arr.filter((val) => val.info.name == value).length;
    } else {
    }
  }
}
