import { BarradeFerramentas } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const DashBoard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={(
        <BarradeFerramentas
          mostrarInputBusca
          textoBotaoNovo='Nova'
        />
      )}
    >
      Testando
    </LayoutBaseDePagina>
  );
};
