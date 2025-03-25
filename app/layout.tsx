'use client';

import '../styles/globals.scss'; // Импортируем глобальные стили
import type { ReactNode } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import 'remixicon/fonts/remixicon.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import I18nProvider from '@/components/i18n-provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <main>{children}</main> {/* Контент страниц */}
          <footer className="footer">
            <p>&copy; 2025 Hotel Name. All rights reserved.</p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
