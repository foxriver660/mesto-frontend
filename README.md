## #Учебный проект №3: Mesto

Сайт доступен по ссылке: **[https://foxriver660.github.io/mesto-project/](https://foxriver660.github.io/mesto-project/)**

В ходе данного учебного проекта подготовлен веб-сайт с отзывчиво-адаптивной функциональностью.

- все данные загружаются и хранятся на сервере
- реализовано плавное открытие и закрытие модальных окон
- добавлена функциональность: возможность менять данные профиля пользователем, добавлять новые места с названием места и ссылкой на изображение, дефолтная загрузка базовых 6 карточек с помощью **JS**, каждой карточки доступен набор функционала: удаление и лайк.
- CSS файлы разбитые по соответвующим блокам загружаются на файл **_index.css_** при помощи директивы **_@import_**.
- локано использованы шрифты семейства **"inter"**
- веб-сайт состоит из 4 семантических секций, каждая из которых является независимым блоком, отдельно реализовано модульное окно.
- реализована адаптация веб-страницы в соответствии с дизайн-макетом.

---

Использованные технологии:

- проект скомпилирован с помощью Webpack, весь код минифицирован и транспилирован
- настроена кастомная лайв-валидация форм
- для реализации вышеуказанной функциональности использовался чистый **JavaScript**
- файловая структура построена в соотвествии с **_методологией БЭМ_** с применением схемы организации файловой структуры проекта **_Nested_**.
- использована технология **_CSS Flexboх_** и **_CSS Grid_** для создания гибких макетов. С помощью данных технологий созданный веб-сайт обладает отзывчиво-адаптивным дизайном.
- все имеющиеся на сайте ссылки интерактивны и анимированы с помощью **_transition_**.
- все изображения из дизайн-макета выгружены в формате (JPEG) и сжаты с использованием стороненного ресурса https://tinypng.com/, векторые изображения (SVG) с использованием https://jakearchibald.github.io
- в секции **Popup** реализовано фиксированное позиционирование.
