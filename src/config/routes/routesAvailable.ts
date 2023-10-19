/* eslint-disable no-use-before-define */
export const RoutesAvailable = {
  home: {
    path: '/',
  },

  createProduct: {
    path: '/products/create',
  },

  createTag: {
    path: '/tags/create',
  },

  /**
   * IS NOT ROUTER
   * Usage to divide routes with parameters
   */
  divider: '|DIVIDER|',
} as const;

export function makeParameterizedRouter(routerUnParameterized: string) {
  const route = `${RoutesAvailable.divider}${routerUnParameterized}`;
  return route;
}
