const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const URL_REGEX = /http?s:\/\/(www.)?[-_~:/?#@!$&'[\]()*+,;.=a-z0-9]+/i;

const errorMessages = {
  VALIDATION_ERROR: 'Ошибка валидации: Переданы некорректные данные.',
  DOCUMENT_NOT_FOUND: 'Документ не найден в базе данных.',
  CAST_ERROR: 'Ошибка преобразования ID.',
  UNAUTHORIZED: 'Не верный email или пароль',
  UNAUTHORIZED_REQUIRED: 'Требуется авторизация: отсутствует или неверен заголовок авторизации',
  UNAUTHORIZED_INVALID_TOKEN: 'Требуется авторизация: Неверный токен',
  FORBIDDEN: 'Доступ запрещен: недостаточно прав.',
  NOT_FOUND: 'Не найдено: запрашиваемый ресурс не существует.',
  CONFLICT: 'Указанный email уже зарегистрирован. Пожалуйста, используйте другой email.',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка.',
  MOVIE_FORBIDDEN: 'Невозможно удалить карточку фильма созданную не вами.',
  EMAIL_PASSWORD_EMPTY: 'Email или пароль не могут быть пустыми',
};

const successMessages = {
  SIGNIN: 'Успешный вход.',
  MOVIE_DELETE: 'Фильм удалён.',
};

module.exports = {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER_ERROR,
  URL_REGEX,
  errorMessages,
  successMessages,
};
