/* export {
  deleteUserCard,
  pushLike,
  deleteLike,
  getCards,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
  updateUserCard,
}; */

/* const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "a80c9fc1-0c23-4d33-8f6c-044abe54b54c",
    "Content-Type": "application/json",
  },
}; */

export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }
  // ПРОВЕРКА СТАТУСА ОТВЕТА ОТ СЕРВЕРА
  _responseServer(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  // !++++++++ЗАПРОС КАРТОЧЕК С СЕРВЕРА И ИХ ДОБАВЛЕНИЕ
  getCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._responseServer(res));
  }
  // !+++++++++ЗАПРОС ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА И ЗАГРУЗКА В ДОМ
  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then(this._responseServer(res));
  }

  // !+++++++ЗАМЕНА ДАННЫХ О ПОЛЬЗОВАТЕЛЕ НА СЕРВЕРЕ
  updateUserProfile(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._responseServer(res));
  }

  // !+++++++ЗАМЕНА АВАТАРА ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
  updateUserAvatar(avatarURL) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarURL,
      }),
    }).then(this._responseServer(res));
  }

  // !++++++++++++ЗАГРУЗКА КАРТОЧКИ ДОБАВЛЕННОЙ ПОЛЬЗОВАТЕЛЕМ
  updateUserCard(card) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._responseServer(res));
  }

  // !+++++++++++++++++УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
  deleteUserCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => this._responseServer(res));
  }

  // !+++++++++++++++++ДОБАВЛЕНИЕ ЛАЙКА НА СЕРВЕР
  pushLike(cardId) {
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        likes: `like`,
      }),
    }).then(this._responseServer(res));
  }

  // !+++++++++++++++++УДАЛЕНИЕ ЛАЙКА С СЕРВЕРА
  deleteLike(cardId) {
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        likes: `like`,
      }),
    }).then(this._responseServer(res));
  }
}

// ПРОВЕРКА СТАТУСА ОТВЕТА ОТ СЕРВЕРА
/* const responseServer = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}; */

// !++++++++ЗАПРОС КАРТОЧЕК С СЕРВЕРА И ИХ ДОБАВЛЕНИЕ
/* const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => responseServer(res));
}; */

// !+++++++++ЗАПРОС ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА И ЗАГРУЗКА В ДОМ
/* const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => responseServer(res));
}; */

// !+++++++ЗАМЕНА ДАННЫХ О ПОЛЬЗОВАТЕЛЕ НА СЕРВЕРЕ
/* const updateUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => responseServer(res));
}; */
// !+++++++ЗАМЕНА АВАТАРА ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
/* const updateUserAvatar = (avatarURL) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL,
    }),
  }).then((res) => responseServer(res));
}; */

// !++++++++++++ЗАГРУЗКА КАРТОЧКИ ДОБАВЛЕННОЙ ПОЛЬЗОВАТЕЛЕМ
/* const updateUserCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => responseServer(res));
}; */

// !+++++++++++++++++УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
/* const deleteUserCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  }).then((res) => responseServer(res));
}; */

// !+++++++++++++++++ДОБАВЛЕНИЕ ЛАЙКА НА СЕРВЕР
/* const pushLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({
      likes: `like`,
    }),
  }).then((res) => responseServer(res));
}; */

// !+++++++++++++++++УДАЛЕНИЕ ЛАЙКА С СЕРВЕРА
/* const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      likes: `like`,
    }),
  }).then((res) => responseServer(res));
}; */
