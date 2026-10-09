// Svelte 5 Reactive i18n Engine for CADS
import en from './en.json';
import id from './id.json';

export type Locale = 'en' | 'id';

let currentLocale = $state<Locale>('en');

const translations: Record<Locale, any> = { en, id };

export function setLocale(locale: Locale) {
  currentLocale = locale;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(path: string, fallback?: string): string {
  const keys = path.split('.');
  let val: any = translations[currentLocale];
  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k];
    } else {
      return fallback || path;
    }
  }
  return typeof val === 'string' ? val : fallback || path;
}
