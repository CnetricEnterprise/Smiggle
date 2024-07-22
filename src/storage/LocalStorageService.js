const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setUserAuthAccessToken(token) {
    // localStorage.setItem("userToken", token);
    localStorage.setItem("accessToken", token);
  }
  function _getUserAuthAccessToken() {
    // return localStorage.getItem("userToken");
    return localStorage.getItem("accessToken");
  }

  function _clearToken() {
    // localStorage.removeItem("userToken");
    localStorage.removeItem("accessToken");
  }

  return {
    getService: _getService,
    clearToken: _clearToken,
    setUserAuthAccessToken: _setUserAuthAccessToken,
    getUserAuthAccessToken: _getUserAuthAccessToken,
  };
})();
export default LocalStorageService;
