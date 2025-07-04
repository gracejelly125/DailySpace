import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        primary: 'var(--color-primary)',
        border: 'var(--color-border)',
        onPrimary: 'var(--color-on-primary)',
        textMain: 'var(--color-text-main)',
        textSub: 'var(--color-text-sub)',
        warn: 'var(--color-warn-red)',
        onWarn: 'var(--color-on-warn-red)',
        textBlack: 'var(--color-text-black)',
        textWhite: 'var(--color-text-white)',
        primaryBg: 'var(--color-primary-bg)',
        warnBg: 'var(--color-warn-bg)',
        placeholder: 'var(--color-placeholder)',
        inputBg: 'var(--color-input-bg)',
        inputBorder: 'var(--color-input-border)',
        memoBg: 'var(--color-memo-bg)',
        memoBorder: 'var(--color-memo-border)',
        postBg: 'var(--color-post-bg)',
        postBorder: 'var(--color-post-border)',
      },
      fontFamily: {
        'gmarket-light': ['GmarketSansLight'],
        gmarket: ['GmarketSansMedium'],
        'gmarket-bold': ['GmarketSansBold'],
      },
    },
  },
  plugins: [],
};

export default config;
