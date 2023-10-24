import { Loading } from '@components/Loading';
import { RoutesAvailable } from '@config/routes/routesAvailable';
import { useNav } from '@hooks/useNav';
import { usePreload } from '@hooks/usePreload';
import { DashboardLayout } from '@layouts/DashboardLayout';
import { CreateProductPage } from '@pages/createProduct';
import { CreateSalePage } from '@pages/createSale';
import { CreateTagPage } from '@pages/createTag';
import { HomePage } from '@pages/home';
import { useRoutes } from '@store/Routes';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

export function AppRoutes() {
  const { isLoading } = usePreload();
  const { makePathname } = useNav();
  const { pathname } = useRoutes((state) => ({
    pathname: state.pathname,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    return navigate(pathname);
  }, [pathname, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes location={makePathname(pathname)}>
      <Route path={RoutesAvailable.home.path} element={<DashboardLayout />}>
        <Route path={RoutesAvailable.home.path} element={<HomePage />} />
        <Route
          path={RoutesAvailable.createProduct.path}
          element={<CreateProductPage />}
        />
        <Route
          path={RoutesAvailable.createSale.path}
          element={<CreateSalePage />}
        />
        <Route
          path={RoutesAvailable.createTag.path}
          element={<CreateTagPage />}
        />
      </Route>
    </Routes>
  );
}
