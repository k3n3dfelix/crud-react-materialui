import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required('Campo é obrigatório').min(3, 'O campo precisa ter mais que 3 caracteres'),
});

export const DetalheDeCidades: React.FC = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/cidades');
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/cidades');
              }
            }
          });
        }
      })
      .catch((error: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        error.inner.forEach(error => {
          if(!error.path) return;

          validationErrors[error.path] = error.message;
          formRef.current?.setErrors(validationErrors);
        });
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/cidades');
        }
      });
    }
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/cidades');
        } else {
          setNome(result.nome);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: ''
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova Cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => {
            navigate('/cidades/detalhe/nova');
          }}
          aoClicarEmVoltar={() => {
            navigate('/cidades');
          }}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper}>
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <VTextField
                  fullWidth
                  name="nome"
                  label="Nome"
                  variant="outlined"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      {/* {isLoading &&(
        <LinearProgress variant='indeterminate' />
      )} */}
    </LayoutBaseDePagina>
  );
};
