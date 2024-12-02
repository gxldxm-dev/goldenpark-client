import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    Paper,
} from '@mui/material';

import countriesEnum from '../countries.json';
import ImegeInputCard from './ImegeInputCard';
const statusEnum = ['active', 'closed'];

const FormGirl: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        foundation: 0,
        cessation: null,
        history: '',
        country: '',
        status: 'active',
        // studio: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name as string]: value }));
    };

    function handleImage(image) {
        setFormData(prev => ({ ...prev, image }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, (formData as never)[key]);
        }
        try {
            const response = await fetch('http://localhost:3000/api/studios/create', {
                method: 'POST',
                body: form,  // Enviar FormData sin el header Content-Type
            });
            if (!response.ok) throw new Error('Failed to create category');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 600 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create Studio
                </Typography>
                <form onSubmit={handleSubmit}>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box flex={6} >
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />


                            <TextField
                                fullWidth
                                label="Foundation"
                                name="foundation"
                                type="number"
                                value={formData.foundation}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{ min: 1900, max: 2024 }}
                            />
                             <TextField
                                fullWidth
                                label="Closed Date"
                                name="cessation"
                                type="number"
                                value={formData.cessation}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{ min: 1900, max: 2024}}
                            />


                        </Box>
                        <Box flex={6} >
                            <ImegeInputCard onImage={handleImage} />
                        </Box>
                    </Box>

                    <TextField
                        fullWidth
                        label="History"
                        name="history"
                        value={formData.history}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 1000 }}
                    />


                    <FormControl fullWidth margin="normal">
                        <InputLabel>Country</InputLabel>
                        <Select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        >
                            {countriesEnum.data.map((country) => (
                                <MenuItem key={country.Iso2} value={country.Iso2}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statusEnum.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default FormGirl;