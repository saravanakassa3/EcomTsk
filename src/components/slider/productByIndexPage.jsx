import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Container, Skeleton } from '@mui/material';
import ProductCard from '../ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryHeader from '../category/categoryHeader';
import ImageCategorySlider from './ImageCategorySlider';
import { API_FetchCategory } from '../../services/categoryServices';
import { API_FetchProductByIndexPage } from '../../services/productListServices';

const ProductByIndexPage = () => {
  const [categoryLists, setCategoryLists] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categoryImageLists, setCategoryImageLists] = useState({});
  const [loading, setLoading] = useState(true);

  const GetCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory();
      setCategoryLists(categoryList);
      return categoryList;
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
      return [];
    }
  };

  const GetProductsByCategory = async (categories) => {
    try {
        const products = await API_FetchProductByIndexPage();
        const productsByCategory = categories.reduce((acc, category) => {
        const filteredProducts = products.data1.filter(product => product.CId === category.Id);
        if (filteredProducts.length > 0) {
          acc[category.Id] = filteredProducts;
        }
        return acc;
      }, {});      

      const categoryImages = categories.reduce((acc, category) => {
        const filteredImage = products.data.filter(image => image.Id === category.Id);
        if (filteredImage.length > 0) {
          acc[category.Id] = filteredImage;
        }
        return acc;
      }, {});      

      setProductsByCategory(productsByCategory);
      setCategoryImageLists(categoryImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await GetCategoryLists();
      GetProductsByCategory(categories);
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 1, pb: 1, px: { xs: 0, sm: 0, lg: 3 } }}>
      {loading ? (
        <Skeleton variant="text" height={40} width="30%" />
      ) : (
        categoryLists.map((category) => {
          const products = productsByCategory[category.Id];
          const categoryImages = categoryImageLists[category.Id];
          // Only render the category section if products are available and at least 5 products
          if (!products || products.length < 5) return null;

          return (
            <Box key={category.Id} sx={{ marginBottom: 5 }}>
              <CategoryHeader
                CategoryHeading={category.Category}
                categoryId={category.Id}
                categoryValue={category.Id}
              />
              <Slider {...settings}>
                {products.map((product) => (
                  <Box key={product.id} sx={{ padding: 0 }}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Slider>

              {/* Render ImageCategorySlider if category images exist */}
              {categoryLists && categoryLists.length > 0 && categoryImages.length !== 0 && (
                <Box sx={{ py: 1 }}>
                    <ImageCategorySlider CategoryImageLists={categoryImages} />
                </Box>                
              )}
            </Box>
          );
        })
      )}
    </Container>
  );
};

export default ProductByIndexPage;
