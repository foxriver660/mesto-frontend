
import {
  userName,
  userStatus,
  profileUserImage,
  submitBtns,
  tokenAuthorization
} from "./utils"
import {addCard} from "./index"
export { deleteUserCard, pushLike, deleteLike,  getCards, getUserID, updateUserProfile, updateUserAvatar, updateUserCard, renderLoading };

// ++++++++ЗАПРОС КАРТОЧЕК С СЕРВЕРА И ИХ ДОБАЛВЕНИЕ
function getCards() {
  fetch("https://mesto.nomoreparties.co/v1/plus-cohort-15/cards", {
    headers: {
      authorization: tokenAuthorization,
    },
  })
    .then((res) => res.json())
    .then((dataCards) => {
      dataCards.forEach((dataCards) => {
        addCard(dataCards);
        checkForDeletion(dataCards);
        console.log(dataCards);
      });
    });
}


// +++++++++ЗАПРОС ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА И ЗАГРУЗКА В ДОМ
function getUserID() {
  fetch("https://nomoreparties.co/v1/plus-cohort-15/users/me", {
    headers: {
      authorization: tokenAuthorization,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
      userName.textContent = data.name;
      userStatus.textContent = data.about;
      profileUserImage.src = data.avatar;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
}


// +++++++ЗАМЕНА ДАННЫХ О ПОЛЬЗОВАТЕЛЕ НА СЕРВЕРЕ
function updateUserProfile(name, about) {
  fetch("https://mesto.nomoreparties.co/v1/plus-cohort-15/users/me", {
    method: "PATCH",
    headers: {
      authorization: tokenAuthorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}
// +++++++ЗАМЕНА АВАТАРА ПОЛЬЗОВАТЕЛЯ НА СЕРВЕРЕ
function updateUserAvatar(avatarURL) {
  fetch("https://mesto.nomoreparties.co/v1/plus-cohort-15/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: tokenAuthorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarURL,
      }),
  });
}
// ++++++++++++ЗАГРУЗКА КАРТОЧКИ ДОБАВЛЕННОЙ ПОЛЬЗОВАТЕЛЕМ
function updateUserCard(name, link) {
  fetch("https://mesto.nomoreparties.co/v1/plus-cohort-15/cards", {
    method: "POST",
    headers: {
      authorization: tokenAuthorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

// +++++++++++++++++УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
function deleteUserCard(cardId) {
  fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-15/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: tokenAuthorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: cardId,
    }),
  });
}

// +++++++++++++++++ДОБАВЛЕНИЕ ЛАЙНА НА СЕРВЕР
function pushLike(cardId) {
  fetch(
    `https://mesto.nomoreparties.co/v1/plus-cohort-15/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: tokenAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: `like`,
      }),
    }
  );
}

// +++++++++++++++++УДАЛЕНИЕ ЛАЙКА С СЕРВЕРА
function deleteLike(cardId) {
  fetch(
    `https://mesto.nomoreparties.co/v1/plus-cohort-15/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: tokenAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: `like`,
      }),
    }
  );
}

// +++++++++ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ ДЛЯ ВОЗМОЖСТИ УДАЛИТЬ КАРТОЧКУ
function checkForDeletion(data) {
  const cardElementDeleteBtn = document.querySelector(
    ".photo-grid__delete-button"
  );
  if (!(data.owner.name == userName.textContent)) {
    cardElementDeleteBtn.classList.add("photo-grid__delete-button_disabled");
  }
}

// +++++++++++++ОТОБРАЖЕНИЕ ЗАГРУЗКИ ДАННЫХ НА СЕРВЕР
function renderLoading(isLoading) {
  if(isLoading){submitBtns.forEach((submitBtn) => submitBtn.textContent = "ИДИ НАХУЙ")}
  else {submitBtns.forEach((submitBtn) => submitBtn.textContent = "Сохранить")}
}
