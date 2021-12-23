import { Grid, TextField } from '@material-ui/core';
import React from 'react';


interface Props {
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  type?: string;
}

export default function CustomTextField({
  id,
  value,
  onChange,
  multiline,
  rows,
  required,
  type = 'text',
}: Props): JSX.Element {
  return (
    <TextField
      id={id}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      value={value}
      color="primary"
      variant="outlined"
      fullWidth
      required={required}
      type={type}
    />
       
  );
}