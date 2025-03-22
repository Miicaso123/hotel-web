
'use client';

import Link from 'next/link';
import styles from './Header.module.scss';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const isActive = (path: any) => pathname === path ? styles.active : '';
    
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
            <i className="ri-ancient-gate-line"></i>
            <span>HOTEL</span>
      </div>
      <nav className={`${styles.nav} ${isNavOpen ? styles.open : ''}`}>
        <div>
            <ul>
              <li><Link href="/" className={isActive('/')}>Главная</Link></li>
              <li><Link href="/rooms" className={isActive('/rooms')}>Номера</Link></li>
              <li><Link href="/services" className={isActive('/services')}>Сервисы</Link></li>
              <li><Link href="/contacts" className={isActive('/contacts')}>Контакты</Link></li>
              <li><Link href="/booking" className={isActive('/booking')}>Забронировать</Link></li>
              <span style={{color: "red"}}>lang</span>
            </ul>
        </div>
      </nav>

    {!isNavOpen ? (
        <div className={styles.toggle} onClick={toggleNav}>
          <i className="ri-apps-2-line"></i> {/* Иконка для открытия */}
        </div>
      ) : (
        <div className={styles.close} onClick={toggleNav}>
          <i className="ri-close-large-line"></i> {/* Иконка для закрытия */}
        </div>
      )}
    </header>
  );
};

export default Header;