import Notiflix from 'notiflix';
import css from './Error.module.css';
export const Error = ({ error }) => {
  return (
    <div className={css.error}>
      {Notiflix.Notify.failure(`Увага помилка!`)}
      <h1 className={css.errorTitle}>Помилка!</h1>

      <h4 className={css.errorDetails}>Деталі помилки:</h4>
      <p>
        <b>data:</b> {error.data}
      </p>
      <p>
        <b>error:</b> {error.error}
      </p>
      <p>
        <b>originalStatus:</b> {error.originalStatus}
      </p>
      <p>
        <b>status:</b> {error.status}
      </p>

      <p className={css.errorText}>
        Якщо ви бачите "<b>originalStatus:</b> 429", то це значить, що ви
        зробили забагато запитів на сервер.
      </p>
      <p>
        Астанавітєсь! Тобто... Схаменіться! Оновіть сторінку і надалі робіть
        запити на сервер не так швидко!
      </p>
      <p>Наші гноми втомлюються!!!</p>
    </div>
  );
};
