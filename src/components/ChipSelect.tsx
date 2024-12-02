import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name: string, selectedData: readonly string[], theme: Theme) {
    return {
        fontWeight: selectedData.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelectChip({ data, selected, onSave }: { data: any[], selected: string[], onSave: (selected: string[]) => void }) {
    const theme = useTheme();
    const [selectedData, setSelectedData] = React.useState<string[]>(selected || []); // Inicia con las categorías seleccionadas si existen

    // Esta función maneja los cambios de selección de las categorías
    const handleChange = (event: SelectChangeEvent<typeof selectedData>) => {
        const {
            target: { value },
        } = event;

        // Aquí almacenamos solo los IDs de los elementos seleccionados
        setSelectedData(typeof value === 'string' ? value.split(',') : value);
    };

    // Función que simula el guardado de las categorías seleccionadas
    const handleClick = () => {
        onSave(selectedData); // Aquí se guardarán solo los IDs seleccionados
    };

    return (
            <FormControl sx={{ m: 1, width: 300, display: "flex", flexDirection: 'row', gap: 1  }}>
                <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedData}
                    onChange={handleChange}
                    sx={{ flex: 2}}
                    input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {/* Muestra los chips con el nombre de la categoría */}
                            {selected.map((value) => {
                                const selectedCategory = data.find((item) => item._id === value); // Encuentra el objeto completo usando el ID
                                return selectedCategory ? <Chip key={value} label={selectedCategory.name} /> : null;
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {data.map((item) => (
                        <MenuItem
                            key={item._id}
                            value={item._id} // Solo pasamos el ID como valor
                            style={getStyles(item, selectedData, theme)}

                        >
                            {item.name} {/* Mostramos el nombre de la categoría */}
                        </MenuItem>
                    ))}
                </Select>
                <Button sx={{ flex: 1}} onClick={handleClick}>Save</Button>
            </FormControl>
    );
}

