export {
  deleteUserCard,
  pushLike,
  deleteLike,
  getCards,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
  updateUserCard,
   };

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "a80c9fc1-0c23-4d33-8f6c-044abe54b54c",
    "Content-Type": "application/json",
  },
};

// ПРОВЕРКА СТАТУСА ОТВЕТА ОТ СЕРВЕРА
const connectServer = (res) => {return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)}

// !++++++++ЗАПРОС КАРТОЧЕК С СЕРВЕРА И ИХ ДОБАВЛЕНИЕ
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(res => connectServer(res));
};

// !+++++++++ЗАПРОС ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА И ЗАГРУЗКА В ДОМ
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(res => connectServer(res));;
};

// !+++++++ЗАМЕНА ДАННЫХ О ПОЛЬЗОВАТЕЛЕ НА СЕРВЕРЕ
const updateUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(res => connectServer(res));
};
// !+++++++ЗАМЕНА АВАТАРА ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
const updateUserAvatar = (avatarURL) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL,
    }),
  }).then(res => connectServer(res));
};
// !++++++++++++ЗАГРУЗКА КАРТОЧКИ ДОБАВЛЕННОЙ ПОЛЬЗОВАТЕЛЕМ
const updateUserCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(res => connectServer(res));
};

// !+++++++++++++++++УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
const deleteUserCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  }).then(res => connectServer(res));
}

// !+++++++++++++++++ДОБАВЛЕНИЕ ЛАЙКА НА СЕРВЕР
const pushLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({
      likes: `like`,
    }),
  }).then(res => connectServer(res));
}

// !+++++++++++++++++УДАЛЕНИЕ ЛАЙКА С СЕРВЕРА
const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      likes: `like`,
    }),
  }).then(res => connectServer(res));
}



