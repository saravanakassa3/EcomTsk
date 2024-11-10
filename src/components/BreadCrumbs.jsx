import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function handleClick(event) {
  event.preventDefault();
}

export default function BreadCrumbs({CategoryId, SubCateoryId, SubCategoryName, ProductName}) {
  const breadcrumbs = [
    <Typography key="1" sx={{cursor: 'pointer', color:"black"}} fontSize={13} font onClick={handleClick}>
      Home
    </Typography>,
    <Typography
      fontSize={13}
      key="2"      
      sx={{cursor: 'pointer', color:"black"}}
      id={CategoryId}
      dataId={SubCateoryId}
      onClick={handleClick}
    >
      {SubCategoryName}
    </Typography>,
    <Typography key="3" fontSize={14} color="inherit">
      {ProductName}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>      
    </Stack>
  );
}
