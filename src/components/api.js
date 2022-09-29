import {
  submitBtns,
} from "./utils";

export {
  deleteUserCard,
  pushLike,
  deleteLike,
  getCards,
  getUserID,
  updateUserProfile,
  updateUserAvatar,
  updateUserCard,
  renderLoading,
 };

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "a80c9fc1-0c23-4d33-8f6c-044abe54b54c",
    "Content-Type": "application/json",
  },
};

// !++++++++ЗАПРОС КАРТОЧЕК С СЕРВЕРА И ИХ ДОБАВЛЕНИЕ
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
};

// !+++++++++ЗАПРОС ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА И ЗАГРУЗКА В ДОМ
const getUserID = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
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
  });
};
// !+++++++ЗАМЕНА АВАТАРА ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
const updateUserAvatar = (avatarURL) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL,
    }),
  });
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
  });
};

// +++++++++++++++++УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
function deleteUserCard(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  });
}

// +++++++++++++++++ДОБАВЛЕНИЕ ЛАЙНА НА СЕРВЕР
function pushLike(cardId) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify({
      likes: `like`,
    }),
  });
}

// +++++++++++++++++УДАЛЕНИЕ ЛАЙКА С СЕРВЕРА
function deleteLike(cardId) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      likes: `like`,
    }),
  });
}


// ОТОБРАЖЕНИЕ ЗАГРУЗКИ ДАННЫХ НА СЕРВЕР
function renderLoading(isLoading) {
  if (isLoading) {
    submitBtns.forEach(
      (submitBtn) => (submitBtn.textContent = "Сохранение...")
    );
  } else {
    submitBtns.forEach((submitBtn) => (submitBtn.textContent = "Сохранить"));
  }
}
