/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import AppHeader from './AppHeader';
import TopCategory from '../category/TopCategory';
import AppFooter from './AppFooter';
import FooterCategories from '../category/FooterCategory';
import { Container, Box } from '@mui/material';
import { API_FetchSettings } from '../../services/settings';
import { API_FetchCategory } from '../../services/categoryServices';
import * as actionType from '../../redux1/actionType';
import { connect } from 'react-redux';

const AppLayout = (props) => {
  const { children, get_catgory_lists, SetGlobalSettings, SetGlobalCategories, CompanyDetails } = props;
  const [settingsLists, setSettingsLists] = React.useState([]);

  const FetchSettingsLists = async () => {
    try {
      const settingsResponse = await API_FetchSettings(); // Fetch settings
      let colorSelect = settingsResponse.data[0];
      console.log(colorSelect);

      const root = document.documentElement;

      // Set the value of --primary-color to the value received from the API
      root.style.setProperty('--primary-color', colorSelect.basecolorCode);
      root.style.setProperty('--secondary-background', colorSelect.shadowcolorCode);
      root.style.setProperty('--color-black', colorSelect.lightblackcolorCode);
      root.style.setProperty('--color-grey-dark-3', colorSelect.whitecolorCode);
      root.style.setProperty('--secondary-color', colorSelect.colorCode);

      setSettingsLists(settingsResponse.data[0]);
      SetGlobalSettings(settingsResponse.data[0]); 
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const FetchTopCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory(); 
      SetGlobalCategories(categoryList); 
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    //FetchSettingsLists();
    //FetchTopCategoryLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <Container maxWidth="xl">
        <TopCategory />
      </Container>
      {children}
      <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', display: 'none' }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <FooterCategories />
        </Container>
      </Box>
      <AppFooter CompanyDetails={CompanyDetails} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    get_catgory_lists: state.get_catgory_lists || [], 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetGlobalSettings: (data) => dispatch({ type: actionType.GET_GLOBAL_SETTINGS, payload: data }),
    SetGlobalCategories: (data) => dispatch({ type: actionType.GET_GLOBAL_CATEGORIES, payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
