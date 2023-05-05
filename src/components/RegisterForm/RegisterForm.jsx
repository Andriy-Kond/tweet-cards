import css from './RegisterForm.module.css';
import Notiflix from 'notiflix';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRegister } from 'redux/auth/fetchAuth';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Записую дані полів інпут у відповідні стейти
  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setUserName(value);
    } else if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserPassword(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const form = e.currentTarget;

    if (!userName || !userEmail || !userPassword) {
      // alert(`Всі поля мають бути заповнені`);
      Notiflix.Notify.failure(`Всі поля мають бути заповнені`);
      return;
    }

    // const isLogged =
    dispatch(
      fetchRegister({
        name: userName,
        email: userEmail,
        password: userPassword,
      })
    )
      .unwrap()
      .then(promise => {
        // Можна і не чистити поля, бо все одно переходимо на іншу сторінку:
        //   setUserName('');
        //   setUserEmail('');
        //   setUserPassword('');

        // console.log('handleSubmit >> promise:', promise);
        Notiflix.Notify.success(
          `Користувач ${promise.user.name} успішно зареєстрований`
        );
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `Помилка: ${error}. Можливо такий користувач вже існує.`
        );
      });

    // Якщо помилки не було, то значить новий користувач створений і можна очистити поля
    // if (!isLogged.error) {
    //   setUserName('');
    //   setUserEmail('');
    //   setUserPassword('');
    // }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input
          className="form-control me-2"
          // type="search"
          placeholder="Enter your name here"
          aria-label="Name"
          type="text"
          name="name"
          onChange={getInput}
          value={userName}
        />
      </label>
      <label className={css.label}>
        Email
        <input
          className="form-control me-2"
          // type="search"
          placeholder="Enter your email here"
          aria-label="email"
          type="email"
          name="email"
          onChange={getInput}
          value={userEmail}
        />
      </label>
      <label className={css.label}>
        Password
        <input
          className="form-control me-2"
          // type="search"
          placeholder="Enter your password here"
          aria-label="password"
          type="password"
          name="password"
          onChange={getInput}
          value={userPassword}
        />
      </label>
      <button type="submit" className="btn btn-outline-primary">
        Register
      </button>
    </form>
  );
};
