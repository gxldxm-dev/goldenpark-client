import { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Calcular los datos paginados
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Cambiar la página
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return { 
        currentData,    // Datos de la página actual
        currentPage,    // Página actual
        totalPages,     // Número total de páginas
        goToPage        // Función para cambiar de página
    };
};

export default usePagination;
