import React, { useState, useEffect } from 'react';
export default function AutoComplete({ prods, onAutoComplete }) {
    const [products, setProducts] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
       setProducts(prods);
    }, [])


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = products.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
            onAutoComplete(filteredData);
        }
        else{
            setFilteredResults(products);
            onAutoComplete(products);
        }
    }

    const clearSearch = () => {
        setSearchInput("");
        setFilteredResults(products);
        onAutoComplete(products);
    }

    return (
        <div style={{ padding: 20 }}>
            <input
                placeholder='Search...'
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}
            />
            <button onClick={clearSearch}>Clear</button>
        </div>
    )
}