import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../constants/config';

export default function Error () {
  return <main className='error'>
    <h1 className='error__title'>Ошибка</h1>
    <h2 className='error__subtitle'>Не удалось получить данные :(</h2>
    <Link to={`${PUBLIC_URL}/`} className='error__link'>Вернуться на главную</Link>
  </main>;
};
