import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashBoard, DetalheDePessoas, ListagemDePessoas } from '../pages';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () =>  { 

  const { toogleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial',
      },
      {
        label: 'Pessoas',
        icon: 'people',
        path: '/pessoas',
      }
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<DashBoard />}></Route>
      <Route path="/pessoas" element={<ListagemDePessoas />}></Route>
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />}></Route>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
  );
};
