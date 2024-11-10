import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FavProductCard from '../FavProductCard';
import { API_FetchMyFavoriteProducts, API_DeleteMyFavoriteProducts } from '../../services/userServices';
import { useTheme } from '@mui/material/styles';

const Favorites = ({ setActiveComponent }) => {
    const theme = useTheme();
    const [favProductLists, setFavProductLists] = useState([]);

    const FetchMyFavoriteProducts = async (userId) => {
        try {
            const favlist = await API_FetchMyFavoriteProducts(userId);
            setFavProductLists(favlist);
        } catch (error) {
            console.error("Error fetching favorite product lists:", error);
        }
    };

    //Remove fav list
    const handleRemoveFavProduct = async(ProductId) => {
        let userId = localStorage.getItem("userId");
        userId = userId ? decodeURIComponent(userId) : null;
        try {
            const response = await API_DeleteMyFavoriteProducts(ProductId, Number(atob(userId)));
            if (response && response.ok) {
                console.log("Product removed successfully:", response);    
                //FetchMyFavoriteProducts(userId);             
            }
        } catch (error) {
            console.error("Error removing favorite product lists:", error);
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const CId = userId ? decodeURIComponent(userId) : null;
        if (CId) {
            FetchMyFavoriteProducts(atob(CId));
        }
      }, []);
    

    return (
        <>
            <Box sx={{ background: '#FFF', maxHeight: '700px', overflowY: 'scroll', p: 2, borderRadius: 2 }}>
                {favProductLists.length !== 0 ?
                <FavProductCard FavProductLists={favProductLists} handleRemoveFavProduct={handleRemoveFavProduct} />
                :
                <Typography
                    variant="h6"
                    sx={{ mt: 3, width: '100%', textAlign: 'center', color: theme.palette.lightblackcolorCode.main || 'grey.600' }}
                  >
                    No favorite products available.
                  </Typography>
                }                
            </Box>
        </>
    );
};

export default Favorites;
