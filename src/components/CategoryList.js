import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categories'; // Import the fetchCategories function

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(15);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchCategories(page, perPage, search);
                setCategories(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, [page, perPage, search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search categories"
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
            <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                Previous
            </button>
            <button onClick={() => handlePageChange(page + 1)}>Next</button>
        </div>
    );
};

export default CategoryList;