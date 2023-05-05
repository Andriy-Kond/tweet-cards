import css from './LoginForm.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogIn } from 'redux/auth/fetchAuth';
// import { useNavigate } from 'react-router-dom';
// import { selectIsLoggedIn } from 'redux/auth/selectors';

export const LoginForm = () => {
  // const navigate = useNavigate();
  // const isLogged = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Записую дані полів інпут у відповідні стейти
  const getInput = ({ target: { name, value } }) => {
    if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserPassword(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!userEmail || !userPassword) {
      // alert(`Всі поля мають бути заповнені`);
      Notiflix.Notify.failure(`Всі поля мають бути заповнені`);
      return;
    }

    dispatch(
      fetchLogIn({
        email: userEmail,
        password: userPassword,
      })
    )
      .unwrap()
      .then(promise => {
        Notiflix.Notify.success(`Ласкаво просимо, ${promise.user.name}.`);
        // Можна і не чистити поля, бо все одно переходимо на іншу сторінку:
        // setUserEmail('');
        // setUserPassword('');
        //   // navigate('/profile', { replace: true });
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `Помилка: ${error}. Можливо не правильний логін чи пароль.`
        );
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input
          className="form-control me-2"
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
          placeholder="Enter your password here"
          aria-label="password"
          type="password"
          name="password"
          onChange={getInput}
          value={userPassword}
        />
      </label>
      <button type="submit" className="btn btn-outline-primary">
        Log In
      </button>
    </form>
  );
};
