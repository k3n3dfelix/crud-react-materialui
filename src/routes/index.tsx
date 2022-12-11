import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>  { 

  const { toogleDrawerOpen } = useDrawerContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toogleDrawerOpen}>Toogle Drawer</Button>}></Route>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
  );
};
