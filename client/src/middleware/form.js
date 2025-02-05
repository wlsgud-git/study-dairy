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
      // 이름이 없으면 false
      if (value == "") return false;
      // 이미 존재하는 이름이면 false
      return !pn.arr.filter((val) => val.info.name == value).length;
    } else {
      if (value.new_name == "" || value.new_name == value.old_name)
        return false;
      return !pn.arr.filter((val) => val.info.name == value.new_name).length;
    }
  }
}
