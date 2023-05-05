import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "App";
import "./index.css";
import "./baseCSS/modern-normalize.css";
import "./baseCSS/project-normalize.css";

// Для підключення Redux треба огорнути застосунок у Provider:
import { Provider } from "react-redux";
// Provider приймайє store, тому маємо його теж імпортувати:
import storeRedux, { persister } from "./redux/indexStore";
import { BigPreLoader } from "components/Preloader/PreLoader";
import { PersistGate } from "redux-persist/integration/react";

import Notiflix from "notiflix";
Notiflix.Notify.init({
	position: "center-top",
	opacity: 0.9,
	timeout: 3000,
	clickToClose: true,
	fontSize: "18px",
	width: "350px",
});
// Варіанти повідомлень Notiflix:
// Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Please choose a date in the future');
// Notiflix.Notify.failure(`Oops, there is no country with that name`);
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

// Дістати зі стору будь-яке значення - хук useSelector
// Для виконання якоїсь дії стору - хук useDispatch

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* Огортаємо App в Provider, щоби у App був доступ до store */}
		<Provider store={storeRedux}>
			{/* Огортаємо App в PersistGate для роботи з localStorage */}
			<PersistGate loading={<BigPreLoader />} persistor={persister}>
				{/* basename="/goit-react-hw-05-movies" - необхідно для збиральника проєкту */}
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

// Маршрутизація
// Додай маршрутизацію з бібліотекою React Router. У програмі має бути кілька сторінок:
// /register - публічний маршрут реєстрації нового користувача з формою
// /login - публічний маршрут логіна існуючого користувача з формою
// /contacts - приватний маршрут для роботи зі списком контактів користувача
// Додай компонент навігації Navigation з посиланнями для переходу по маршрутах.

// Меню користувача
// Створи компонент UserMenu, що відображає пошту користувача і кнопку виходу з облікового запису. Ось як може виглядати його розмітка.
// <div>
//   <p>mango@mail.com</p>
//   <button>Logout</button>
// </div>
