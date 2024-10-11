import React from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
    return (
        <div style={{ backgroundColor: 'black', padding: '2rem' }}>
            <div style={{ display: 'flex' }}>
                <span className="brandName" style={{ flex: 1 }}>
                    BrandName
                </span>
                <Button className="options">
                    <ShoppingCartIcon />
                </Button>
            </div>
        </div>
    );
}

export default Navbar;
