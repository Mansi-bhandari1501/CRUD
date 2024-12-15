import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const SingleCustomAutocomplete = ({ name, label, control, options, onInputChange, helperText, disabled }) => {
  const helperTextValue = helperText ? helperText : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => (
        <Autocomplete
          disabled={disabled}
          disablePortal
          id={name}
          sx={{
            width: '100%',
            '& .MuiAutocomplete-option': {
              fontSize: '14px',
              lineHeight: "20px",
            },
            '& .MuiAutocomplete-noOptions': {
              fontSize: '14px',
              lineHeight: "10px",
            },
            '& .MuiFormControl-root': {
              '& legend': {
                fontSize: '10px',
              },
            },
          }}
          componentsProps={{
            popper: {
              sx: {
                '& .MuiAutocomplete-listbox': {
                  fontSize: '14px',
                  lineHeight: "20px",
                },
                '& .MuiAutocomplete-noOptions': {
                  fontSize: '14px',
                  lineHeight: "20px",
                },
              },
            },
          }}
          ListboxProps={{
            sx: {
              '& .MuiAutocomplete-option': {
                fontSize: '14px',
                lineHeight: "20px",
              },
            },
          }}
          options={options}
          value={options.find(option => option.value === value) || null}
          onChange={(event, value) => field.onChange(value ? value.value : '')}
          onInputChange={onInputChange}
          noOptionsText={'No options'}
          renderInput={(params) => (
            <TextField
              error={!!error}
              helperText={!!error ? error?.message : helperTextValue}
              {...params}
              label={label}
              variant="outlined"
              margin="normal"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused": {
                    "& fieldset": { borderColor: "#01579b" },
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                  lineHeight: "20px",
                  "&.Mui-focused": { color: "#01579b" },
                },
              }}
              inputRef={ref}
            />
          )}
        />
      )}
    />
  );
};

export default SingleCustomAutocomplete;

