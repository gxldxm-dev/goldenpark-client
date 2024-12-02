import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box,
    Typography,
    Paper,
    CircularProgress,
} from '@mui/material';

import countriesEnum from '../countries.json';
import ImegeInputCard from './ImegeInputCard';
import { useShowSnackbar } from '../hooks/useShowSnackbar';
import { useData } from '../hooks/useData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const statusEnum = ['active', 'inactive', 'pending', 'suspended'];

interface Category {
    _id: string;
    name: string;
}

const FormGirl: React.FC = () => {

    const showSnackbar = useShowSnackbar();
    const { categories, studios, loading, error } = useData();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        categories: [] as string[],
        biography: '',
        tags: [] as string[],
        country: '',
        status: 'active',
        studio: "",
        // studio: null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (loading) {
        return (<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
        )
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name as string]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        setFormData(prev => ({
            ...prev,
            dateOfBirth: date,
            age: date ? new Date().getFullYear() - date.getFullYear() : 0
        }));
    };

    function handleImage(image) {
        setFormData(prev => ({ ...prev, image }));
    }

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, [field]: value.split(',').map(item => item.trim()) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        // Agregar los campos del formulario
        for (const key in formData) {
            const value = formData[key];

            // Validar strings vacíos, arrays vacíos y otros valores falsy
            if (
                value === "" || // Evitar strings vacíos
                (Array.isArray(value) && value.length === 0) || // Evitar arrays vacíos
                !value // Excluir valores como null, undefined, false, 0
            ) continue;

            form.append(key, value);
        }
        try {
            const response = await axios.post('http://localhost:3000/api/girls/create', form, { headers: { 'Content-Type': 'multipart/form-data' } });

            if (response.status === 200) {
                showSnackbar('Girl profile created successfully!', 'success');
            } else {
                showSnackbar('Failed to create girl profile', 'error');
            }
            navigate('/girls');
        } catch (err) {
            showSnackbar('Failed to create category', "error");
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 600 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create Girl Profile
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
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0, max: 17 }}
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Categories</InputLabel>
                                <Select
                                    multiple
                                    name="categories"
                                    value={formData.categories}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {(selected as string[]).map((value) => (
                                                <Chip key={value} label={categories.find(cat => cat._id === value)?.name || value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Studios</InputLabel>
                                <Select
                                    name="studio"
                                    value={formData.studios}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                <Chip key={selected} label={studios.find(cat => cat._id === selected)?.name || selected} />
                                        </Box>
                                    )}
                                >
                                    {studios.map((studio) => (
                                        <MenuItem key={studio._id} value={studio._id}>
                                            {studio.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box flex={6} >
                            <ImegeInputCard onImage={handleImage} />
                        </Box>
                    </Box>

                    <TextField
                        fullWidth
                        label="Biography"
                        name="biography"
                        value={formData.biography}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 1000 }}
                    />


                    <TextField
                        fullWidth
                        label="Tags (comma-separated)"
                        name="tags"
                        value={formData.tags.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'tags')}
                        margin="normal"
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