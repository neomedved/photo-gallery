import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return  <main>
    <h1>Ошибка</h1>
    <h2>Не удалось получить данные :(</h2>
      <Link to='/'>Вернуться на главную</Link>
  </main>;
};
