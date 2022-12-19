import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && <Skeleton width={108} height={61} />}

      {mostrarBotaoSalvarEFechar &&
        !mostrarBotaoSalvarEFecharCarregando &&
        !smDown &&
        !mdDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmSalvarEFechar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
              Salvar e Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (
        <Skeleton width={140} height={61} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={108} height={61} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}
      {mostrarBotaoNovoCarregando && !smDown && (
        <Skeleton width={108} height={61} />
      )}

      {mostrarBotaoVoltar &&
        (mostrarBotaoNovo ||
          mostrarBotaoApagar ||
          mostrarBotaoSalvar ||
          mostrarBotaoSalvarEFechar) && (
        <Divider variant="middle" orientation="vertical" />
      )
      }

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={108} height={61} />}
    </Box>
  );
};