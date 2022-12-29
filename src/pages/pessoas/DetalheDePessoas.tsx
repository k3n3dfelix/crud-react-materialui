import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

interface IFormData {
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);
  console.log('formRef', formRef);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const handleSave = (dados: IFormData) => {
    console.log(dados);
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova Pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => {
            navigate('/pessoas/detalhe/nova');
          }}
          aoClicarEmVoltar={() => {
            navigate('/pessoas');
          }}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper}>
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid container item direction="row">
              <Grid item xs={6}>
                <VTextField
                  fullWidth
                  name="nomeCompleto"
                  label="Nome Completo"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="email"
                  label="E-Mail"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={6}>
                <VTextField
                  fullWidth
                  name="cidadeId"
                  label="Cidade"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <button type="submit">Submit</button>
          </Grid>
        </Box>
      </Form>

      {/* {isLoading &&(
        <LinearProgress variant='indeterminate' />
      )} */}
    </LayoutBaseDePagina>
  );
};
