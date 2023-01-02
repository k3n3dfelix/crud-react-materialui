import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashBoard, DetalheDeCidades, DetalheDePessoas, ListagemDeCidades, ListagemDePessoas } from '../pages';
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
      },
      {
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades',
      }
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<DashBoard />}></Route>

      <Route path="/pessoas" element={<ListagemDePessoas />}></Route>
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />}></Route>

      <Route path="/cidades" element={<ListagemDeCidades />}></Route>
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />}></Route>

      <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
  );
};
