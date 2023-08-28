import MUI, { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export default function Dropdown(props) {
    const {label,value,onChange,items,FormControlProps,InputLabelProps,SelectProps,MenuItemProps} = props;
    return (
        <FormControl variant={FormControlProps?.variant || "standard"} {...FormControlProps}>
            <InputLabel  {...InputLabelProps}>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
                {...SelectProps}
            >
                {items?.map((item) => {
                    return (
                        <MenuItem 
                            key={item.value}
                            value={item.value}
                            {...MenuItemProps}
                        >
                            {item.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}