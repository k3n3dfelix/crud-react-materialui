import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';

type TAutoCompleteOption = {
  id: number;
  label:string;
}

export const AutoCompleteCidade: React.FC = ( )=> {
  const [options,setOptions ] = useState<TAutoCompleteOption[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  
  const autoCompleteSelectedOption = useMemo(() => {

  }, []);
  useEffect(() => {
    setIsLoading(true);
    CidadesService.getAll(1, busca).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        //alert(result.message);
      } else {
        console.log(result);

        setOptions(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})));
      }
    });
  },[busca]);

  return (
    <Autocomplete
      value={{}}
      loading={isLoading}
      popupIcon={isLoading ? <CircularProgress size={28}/> : undefined}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca('');}}
      onInputChange={(_, newValue) => setBusca(newValue)}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
        />)}
    />
  );
};