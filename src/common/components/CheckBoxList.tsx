import React from 'react';
import { Paper, FormGroup, FormLabel, FormControlLabel, Checkbox, Divider } from '@mui/material';


type CheckBoxListProps = {
  title: string,
  style?: React.CSSProperties,
  items: {
    label: string,
    checked: boolean,
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined,
  }[]
}

export function CheckboxList (props: CheckBoxListProps): JSX.Element {
  const { title, items, style } = props;

  const checkboxes = items.map((item, i) => {
    const { label, checked, onChange } = item;
    return (
      <FormControlLabel
        key={i}
        label={label}
        control={<Checkbox checked={checked} onChange={onChange} />}
      />
    );
  })

  return (
    <Paper
      elevation={3}
      style={style}
    >
      <FormGroup>
        <FormLabel component='legend'>{title}</FormLabel>
        <Divider />
        {checkboxes}
      </FormGroup>
    </Paper>
  )
}
