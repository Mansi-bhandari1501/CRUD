import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const CustomAutocomplete = ({ name, label, control, options, onInputChange, helperText, disabled }) => {
  const helperTextValue = helperText ? helperText : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => (
        <Autocomplete
          multiple
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
          value={value ? options.filter(option => value.includes(option.value)) : []}
          onChange={(event, newValue) => {
            // If no value is selected, send an empty array
            const selectedValues = newValue ? newValue.map(option => option.value) : [];
            field.onChange(selectedValues);
          }}
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

export default CustomAutocomplete;
