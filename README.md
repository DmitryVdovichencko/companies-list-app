# SPA приложение "Список компаний"

## Требования

- [x] Таблица юридических лиц с полями: наименование, адрес, огрн, инн, дата
регистрации.
- [x] Реализовать форму добавления компании в таблицу
- [x] Реализовать валидацию полей
- [x] Разместить кнопку `добавить` над таблицей. Нажатие кнопки открывает
модальное окно с формой добавления компании в таблицу. В модальном окне
нужно вывести все поля, что есть в таблице.
- [x] Дать пользователю возможность удаления компаний.
- [x] Дать пользователю возможность отредактировать адрес компании в режиме
`inline-edit`.

### Дополнительный функционал

- [x] Подключить сервис [dadata.ru](https://dadata.ru/) для загрузки информации по ИНН.
- [x] Добавить кнопку `Загрузить` около поля `ИНН`.
- [x] При нажатии на кнопку происходит запрос к `datata` и заполняются все поля.

## Валидация полей

- [x] Показать сообщение об успешном заполнении, если пользователь прошел валидацию.
- [x] Показать сообщение об ошибке, если поля не прошли валидацию.
- [x] Пометить некорректное поле.

## Используемые технологии

В проекте использовался фреймворк [VueJS](https://vuejs.org/)

В качестве CSS препроцессора использовался [SASS](https://sass-lang.com/)

Для иконок использовался сервис [feather-icons](https://feathericons.com/)

Для загрузки данных компаний по ИНН использовался сервис [dadata.ru](https://dadata.ru/)

Приложение развернуто на хостинге GitHub Pages по ссылке ниже :point_down:

[Приложение список компаний на Vue](https://dmitryvdovichencko.github.io/companies-list-app/)

## Инструкции по развертыванию локальной среды разработки

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
