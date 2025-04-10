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
      'rounded-card': 'rounded-[var(--follow-card-radius,0.75rem)]',
      'rounded-input': 'rounded-[var(--follow-input-radius,0.5rem)]',
      'rounded-button': 'rounded-[var(--follow-button-radius,0.5rem)]',
      'card-padding': 'p-[var(--follow-card-padding-sm,1.5rem)] sm:p-[var(--follow-card-padding-md,2rem)] md:p-[var(--follow-card-padding-lg,3rem)]',
    },
  }),
];
