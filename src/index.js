import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store, { persister } from './redux/indexStore';
import { App } from 'App';
import './index.css';
import './styles/modern-normalize.css';
import './styles/project-normalize.css';
import { PersistGate } from 'redux-persist/integration/react';
import Notiflix from 'notiflix';
import { Provider } from 'react-redux';
import { PreLoader } from 'Layout/Preloader/PreLoader';

Notiflix.Notify.init({
  position: 'center-top',
  opacity: 0.9,
  timeout: 3000,
  clickToClose: true,
  fontSize: '18px',
  width: '350px',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PreLoader />} persistor={persister}>
        <BrowserRouter basename="/tweet-cards">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// todo Брати номер сторінки з адресного рядку???
// Хук useParams
// Повертає об'єкт з усіма динамічними параметрами, які є в поточному URL. Ім'я параметра буде ім'ям властивості в об'єкті, а його поточне значення в адресі - значенням властивості. Наприклад, якщо оголошено наступний маршрут /books/:genreId/:authorName, та користувач знаходиться за адресою /books/adventure/herman-melville.

// const { genreId, authorName } = useParams();
// console.log(genreId, authorName); // adventure, herman-melville

// todo через функцію у функції викликати? *замикання
// <button onClick={() => setUserId(currentUser.id)} type="button">
//  Delete
// </button>;
// * Ментор сказала правило - якщо щось передається, то анонімний коллбек, а якщо ні, то посилання на функцію.

// ~ хук useNavigate надає нам функцію navigate якій під час виклику передаємо шлях, куди необхідно виконати навігацію.
// export const Login = () => {
//   const navigate = useNavigate();
//   const handleSubmit = async values => {
//     const response = await FakeAPI.login(values);
//     if (response.success) {
//       navigate('/profile', { replace: true });
//     }
//   };
//   return (
//     <div>
//       <h1>Login page</h1>
//       <LoginForm onSubmit={handleSubmit} />
//     </div>
//   );
// };
// true - новий лист підмінить собою найвищий.

// ~ компонент Navigate - обгортка над хуком useNavigate.
// export const Login = () => {
//   const [isLoginSuccess, setIsLoginSuccess] = useState(false);
//   const handleSubmit = async values => {
//     const response = await FakeAPI.login(values);
//     setIsLoginSuccess(response.success);
//   };
//   if (isLoginSuccess) {
//     return <Navigate to="/profile" replace />;
//   }
//   return (
//     <div>
//       <h1>Login page</h1>
//       <LoginForm onSubmit={handleSubmit} />
//     </div>
//   );
// };
