'use client';

import { appWithTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import nextI18NextConfig from '../next-i18next.config';

interface I18nProviderProps {
    children: ReactNode;
}
  
const I18nProvider = ({ children }: I18nProviderProps) => {
    return <>{children}</>;
};
  
export default appWithTranslation(I18nProvider as any, nextI18NextConfig);