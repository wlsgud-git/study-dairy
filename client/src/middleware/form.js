export class Form {
  constructor() {}

  forming(info) {
    let formData = new FormData();

    for (var key in info) {
      let val = info[key];
      if (typeof val == "object")
        val.length
          ? val.forEach((val) => formData.append(`${key}[]`, val))
          : formData.append(`${key}`, "");
      else formData.append(key, val);
    }
    return formData;
  }

  inputValidate(action, pn, value) {
    let newVal = action == "post" ? value : value.new_name;

    if (newVal == "") {
      return { status: false, msg: "사전명이 없습니다" };
    }
    if (newVal.length > 20) {
      return { status: false, msg: "사전명은 20자 이내입니다" };
    }
    if (pn.arr.filter((val) => val.info.name == newVal).length) {
      return { status: false, msg: "이미 존재하는 사전명입니다" };
    }

    return { status: true, msg: "통과" };
  }
}
