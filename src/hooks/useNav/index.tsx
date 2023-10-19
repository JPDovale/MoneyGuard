import { useRoutes } from '@store/Routes';
import { makePathnameFunc } from './funcs/makePathname';
import { RoutesAvailable } from '@config/routes/routesAvailable';

export function useNav() {
  const { indexAndParams, setPathname, pathname } = useRoutes((state) => ({
    indexAndParams: state.indexAndParams,
    setPathname: state.setPathname,
    pathname: state.pathname,
  }));

  function makePathname(path: string) {
    return makePathnameFunc({
      pathname: path,
      indexAndParams,
      finalParams: {},
    });
  }

  function makeBaseUrl(path: string): string {
    const blocks = path.split('/').filter((block) => block !== '');
    let finalPath = '';

    indexAndParams.forEach((indexAndParam) => {
      const index = Number(Object.keys(indexAndParam)[0]);
      blocks[index - 1] = indexAndParam[index];
    });

    blocks.forEach((block) => {
      if (finalPath) {
        finalPath = `${finalPath}/${block}`;
      } else {
        finalPath = `/${block}`;
      }
    });

    if (!finalPath) {
      finalPath = '/';
    }

    return finalPath;
  }

  function navigate(path: string) {
    const isParametrizedRouter = path.includes(':');

    if (isParametrizedRouter) {
      let finalPath = '';

      finalPath = `${makePathname(path)}${RoutesAvailable.divider}${path}`;

      setPathname({
        routerParameterized: finalPath,
      });
    } else {
      setPathname(path);
    }
  }

  return {
    makePathname,
    makeBaseUrl,
    navigate,
    pathname,
    indexAndParams,
  };
}
