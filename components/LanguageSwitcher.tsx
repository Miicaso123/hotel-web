import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('ru')}>Русский</button>
      <button onClick={() => changeLanguage('kk')}>Қазақша</button>
    </div>
  );
}