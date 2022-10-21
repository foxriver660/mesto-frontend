export default class UserInfo {
  constructor({ userName, userInfo, getUserData, setUserData }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._getUserData = getUserData;
    this._setUserData = setUserData;
  }
  getUserInfo() {
    const user = this._getUserData;
    return user;
  }

  setUserInfo(name, status) {
    this._userName.textContent = name;
    this._userInfo.textContent = status;
    this._setUserData(name, status);
  }
}
