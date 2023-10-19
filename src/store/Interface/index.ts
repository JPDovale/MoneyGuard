import { localStorageKeys } from '@config/localStorage/keys';
import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface UseInterface {
  loadConfig: () => void;

  theme: Theme;
  changeTheme: (newState: Theme | 'system') => void;
}

const useInterface = create<UseInterface>((set) => {
  return {
    theme: 'dark',

    loadConfig: () => {
      const themeSaved = localStorage.getItem(localStorageKeys.theme);

      let theme: Theme;

      if (!themeSaved || themeSaved === 'system') {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      } else {
        theme = themeSaved as Theme;
      }

      set({
        theme,
      });
    },

    changeTheme: (newState: Theme | 'system') => {
      let theme: Theme;

      if (newState === 'system') {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      } else {
        theme = newState;
      }

      set({ theme });

      localStorage.setItem(localStorageKeys.theme, newState);
    },
  };
});

export { useInterface };
