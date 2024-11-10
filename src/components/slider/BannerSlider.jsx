import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Container, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton
import { API_FetchBannerOfferPost } from '../../services/bannerOfferPostServices';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';

export default function BannerSlider() {
  const [bannerSliderLists, setBannerSliderLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const GetBannerSliderLists = async () => {
      try {
          const bannerList = await API_FetchBannerOfferPost();
          setBannerSliderLists(bannerList);
          setIsLoading(false); // Stop loading when data is fetched
      } catch (error) {
          console.error("Error fetching categories:", error);
          setIsLoading(false); // Stop loading in case of error
      }
  };

  useEffect(() => {
    GetBannerSliderLists();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,    
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 2, pb: 2, p: { xs: 0, sm: 0 } }}>
      <Slider {...settings}>
        {isLoading ? (
          // Show Skeleton loader while data is being fetched
          [...Array(3)].map((_, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Skeleton
                variant="rectangular"
                sx={{
                  height: {
                    xs: 200, // Mobile
                    sm: 320, // Tablet
                    md: 400, // Desktop
                    lg: 500, // Large desktop
                  },
                  width: "100%",
                  margin: '0 auto',
                }}
              />
            </Box>
          ))
        ) : (
          // Show the actual banner images once data is fetched
          bannerSliderLists.map((item) => (
            <Box key={item.id} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                sx={{
                  height: {
                    xs: 200, // Mobile
                    sm: 320, // Tablet
                    md: 400, // Desktop
                    lg: 500, // Large desktop
                  },
                  width: "100%",
                  display: 'block',
                  margin: '0 auto',                
                }}
                src={ImagePathRoutes.BannerOfferPostImagePath + item.Imagepath}
                alt={item.Imagepath}
              />
            </Box>
          ))
        )}
      </Slider>
    </Container>
  );
}
