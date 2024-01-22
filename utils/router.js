class Router {
  constructor() {}
  route(path) {
    window.location = `${path}.html`;
  }
  params() {
    const paramsStr = window.location.search;
    if (paramsStr === "") {
      return;
    }
    const params = paramsStr.split("?")[1];
    const paramsArr = params.split("&");
    const result = {};
    paramsArr.forEach((param) => {
      const [key, value] = param.split("=");
      result[key] = value;
    });
    return result;
  }
}
