// Svelte 5 Reactive i18n Engine for CADS
import en from './i18n/en.json';
import id from './i18n/id.json';

export type Locale = 'en' | 'id';

class I18nState {
  currentLocale = $state<Locale>('en');
}

const state = new I18nState();
const translations: Record<Locale, any> = { en, id };

export function setLocale(locale: Locale) {
  state.currentLocale = locale;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
}

export function getLocale(): Locale {
  return state.currentLocale;
}

export function t(path: string, fallback?: string): string {
  const keys = path.split('.');
  let val: any = translations[state.currentLocale];
  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k];
    } else {
      return fallback || path;
    }
  }
  return typeof val === 'string' ? val : fallback || path;
}
