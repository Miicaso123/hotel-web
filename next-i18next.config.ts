import path from 'path';

const nextI18NextConfig = {
  i18n: {
    locales: ['ru', 'kk'],
    defaultLocale: 'ru',
  },
  localePath: path.resolve('./public/locales'), // Путь к переводам
   reloadOnPrerender: process.env.NODE_ENV === 'development'
};

export default nextI18NextConfig;