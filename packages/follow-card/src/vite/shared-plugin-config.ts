import presetIcons from '@unocss/preset-icons';
import { presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';

export const sharedPluginsConfig = [
  UnoCSS({
    mode: 'shadow-dom',
    presets: [presetUno(), presetIcons()],
    shortcuts: {
      'text-title': 'text-[var(--follow-title-color,#18181b)]',
      'text-description': 'text-[var(--follow-description-color,#71717a)]',
      'bg-card': 'bg-[var(--follow-bg-color,#ffffff)]',
      'bg-input': 'bg-[var(--follow-input-bg,#f8fafc)]',
      'border-input': 'border-[var(--follow-input-border,#e2e8f0)]',
      'bg-button': 'bg-[var(--follow-button-bg,#4F7BEF)]',
      'text-button': 'text-[var(--follow-button-text,#ffffff)]',
    },
  }),
];
