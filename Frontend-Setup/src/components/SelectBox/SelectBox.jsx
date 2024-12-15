import React from 'react';
import { FormGroup, FormLabel, MenuItem, Select } from '@mui/material';
import styles from "./SelectBox.module.css";

const SelectBox = ({ title, value, handleChange, labelProps, selectProps, placeholder, options }) => {
    return (
        <FormGroup>
            <FormLabel {...labelProps} className={styles.formLabel}>{title}</FormLabel>
            <Select 
                {...selectProps}
                onChange={(event) => {
                    handleChange(event.target.value);
                }}
                value={value}
                placeholder='Your State'
                className={`${styles.inputBox}`} 
                aria-placeholder={placeholder}
            >
                {options?.map((item) => (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
        </FormGroup>
    );
}

export default SelectBox;
