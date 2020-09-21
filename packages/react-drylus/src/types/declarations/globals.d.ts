declare global {
  interface Window {
    readonly i18n?: {
      locale: string;
    };
  }
}

export {};
