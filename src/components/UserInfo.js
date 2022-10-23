export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this.userId = null;
  }

  getUserInfo() {
    return {
      0: this._userName.textContent,
      1: this._userAbout.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this.userId = _id;
  }
}
