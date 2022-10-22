export default class UserInfo {
  constructor(
    userNameSelector,
    userAboutSelector,
    userAvatarSelector /* getUserData, setUserData */
    
  ) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this.userId = null;
    /* this._getUserData = getUserData;
    this._setUserData = setUserData; */
  }
  
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
      _id: this.userId
    }
  }

  setUserInfo({name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this.userId = _id
    /* this.userId = _id */
    /*  this._setUserData(name, status); */
  }
  
  }

