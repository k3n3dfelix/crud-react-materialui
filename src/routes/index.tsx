import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>  { 

  const { toogleDrawerOpen, setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial',
      },
      {
        label: 'Cidade',
        icon: 'star',
        path: '/cidades',
      }
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toogleDrawerOpen}>Toogle Drawer</Button>}></Route>
      <Route path="/cidades" element={<Button variant='contained' color='primary' onClick={toogleDrawerOpen}>Toogle Drawer</Button>}></Route>

      {/* <Route path="*" element={<Navigate to="/pagina-inicial"/>} /> */}
    </Routes>
  );
};
