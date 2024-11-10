import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Container } from '@mui/material';
import ProductCard from '../ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {API_FetchOfferFastMovingProduct} from '../../services/offerFasMovingProducts';

const products = [
  {
    id: 1,
    name: 'Aavin Delite Premium Fresh Cow Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-559,pr-true,f-auto,q-80/inventory/banner/260fef64-3c48-4d9b-8e15-d57f17baed33.png', // replace with actual image path
    quantity: '500ml',
    price: '₹22',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/47e06243-f762-42c2-a947-7fd90f6681d1.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/0fe2a057-4206-426d-b222-9f8d5d252930.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/47e06243-f762-42c2-a947-7fd90f6681d1.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/0fe2a057-4206-426d-b222-9f8d5d252930.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/0fe2a057-4206-426d-b222-9f8d5d252930.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/0fe2a057-4206-426d-b222-9f8d5d252930.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  }, {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-559,pr-true,f-auto,q-80/inventory/banner/260fef64-3c48-4d9b-8e15-d57f17baed33.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/0fe2a057-4206-426d-b222-9f8d5d252930.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-559,pr-true,f-auto,q-80/inventory/banner/260fef64-3c48-4d9b-8e15-d57f17baed33.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  {
    id: 2,
    name: 'Arokya Full Cream Fresh Milk (Pouch)',
    image: 'https://cdn.zeptonow.com/production///tr:w-969,ar-969-558,pr-true,f-auto,q-80/inventory/banner/0fe2a057-4206-426d-b222-9f8d5d252930.png', // replace with actual image path
    quantity: '500ml',
    price: '₹36',
    originalPrice: '₹46',
    discount: null,
  },
  // Add more products as needed
];

const ProductSlider = ({productLits, categoryLists}) => {
  const [productLists, setproductLists] = useState([]);

  const GetBannerSliderLists = async () => {
      try {
          const objLists = await API_FetchOfferFastMovingProduct();
          setproductLists(objLists);
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
  };

  useEffect(() => {
    GetBannerSliderLists();
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
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ margin: 'auto' }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: '20px', textAlign: "left" }}>
          Products For You
        </Typography>
        <Slider {...settings}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default ProductSlider;
