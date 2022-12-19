import { Divider } from '@mui/material';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const DashBoard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={(
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo
        />
      )}
    >
      Testando

    </LayoutBaseDePagina>
  );
};
