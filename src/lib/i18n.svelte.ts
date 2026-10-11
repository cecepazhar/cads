// Svelte 5 Reactive i18n Engine for CAUI
import en from './i18n/en.json';
import id from './i18n/id.json';

export type Locale = 'en' | 'id';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TranslationKey = keyof typeof en;

class I18nState {
  currentLocale = $state<Locale>('en');
}

const state = new I18nState();
const translations: Record<Locale, unknown> = { en, id };

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
  let val: unknown = translations[state.currentLocale];
  for (const k of keys) {
    if (val && typeof val === 'object' && k in (val as Record<string, unknown>)) {
      val = (val as Record<string, unknown>)[k];
    } else {
      return fallback || path;
    }
  }
  return typeof val === 'string' ? val : fallback || path;
}