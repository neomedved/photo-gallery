import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return  <main className='error'>
    <h1 className='error__title'>Ошибка</h1>
    <h2 className='error__subtitle'>Не удалось получить данные :(</h2>
      <Link to='/' className='error__link'>Вернуться на главную</Link>
  </main>;
};
