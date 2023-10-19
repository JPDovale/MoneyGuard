import { localStorageKeys } from '@config/localStorage/keys';
import { useInterface } from '@store/Interface';
import { useRoutes } from '@store/Routes';
import { useTags } from '@store/Tags';
import { useEffect } from 'react';

export function usePreload() {
  const { loadConfig } = useInterface((state) => ({
    loadConfig: state.loadConfig,
  }));
  const { recoveryHistory } = useRoutes((state) => ({
    recoveryHistory: state.recoveryHistory,
  }));
  const { loadTags, isLoadingTags } = useTags((state) => ({
    loadTags: state.loadTags,
    isLoadingTags: state.isLoading,
  }));

  const isLoading = isLoadingTags;

  useEffect(() => {
    localStorage.setItem(localStorageKeys.navigationHistory, '[]');

    loadConfig();
    recoveryHistory();
    loadTags();
  }, [recoveryHistory, loadConfig]);

  return {
    isLoading,
  };
}
