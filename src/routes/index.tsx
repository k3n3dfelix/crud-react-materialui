import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashBoard } from '../pages';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>  { 

  const { toogleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial',
      }
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<DashBoard/>}></Route>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
  );
};
