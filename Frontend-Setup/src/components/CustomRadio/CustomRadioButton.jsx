import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

function CustomRadioButton({ control, name, heading, options, disabled }) {
    return (
        <FormControl>
            <FormLabel focused={false} sx={{ fontSize: '14px', fontWeight: '400', color: '#000000DE', fontFamily: 'Poppins' }}>
                {heading}
            </FormLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Stack direction={"row"}>
                        <RadioGroup
                            {...field}
                            sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, gap: 6 }}
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                        >
                            {options?.map(option => (
                                <FormControlLabel
                                    key={option.label}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    disabled={disabled}
                                />
                            ))}
                        </RadioGroup>
                    </Stack>
                )}
            />
        </FormControl>
    );
}

export default CustomRadioButton;
