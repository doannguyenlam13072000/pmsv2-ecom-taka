import { createI18n } from "vue-i18n";

import { LOCALE } from "@/constants";

function loadLocaleMessages() {
  const locales = import.meta.glob("./locales/**/**/*.json", { eager: true });
  const messages: Record<string, any> = {};

  for (const path in locales) {
    const matched = path.match(/\.\/locales\/([a-z0-9-]+)\/(.*)\.json$/i);
    if (matched) {
      const locale = matched[1]; // folder name locale: en, vi
      const fileKey = matched[2]; // file name key: common, auth
      messages[locale] ||= {};
      messages[locale][fileKey] = (locales[path] as any).default;
    }
  }

  return messages;
}

export const i18n = createI18n({
  globalInjection: true,
  locale: LOCALE,
  fallbackLocale: LOCALE,
  messages: loadLocaleMessages(),
});
