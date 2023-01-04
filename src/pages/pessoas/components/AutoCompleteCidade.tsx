import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
  id: number;
  label:string;
}

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false})=> {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
  
  const [options,setOptions ] = useState<TAutoCompleteOption[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  
  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedId) return null;

    return selectedOption;
  }, [selectedId, options]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);
  
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
      openText='Abrir'
      closeText='Fechar'
      clearText='Limpar'
      noOptionsText="Sem Opçoes"
      loadingText="Carregando..."

      disablePortal

      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError();}}
      onInputChange={(_, newValue) => setBusca(newValue)}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />)}
    />
  );
};