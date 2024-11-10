import APIRoutes from '../routes/APIRoutes';
import { ServerURL } from '../server/serverUrl';

// Function to check if email or mobile number already exists
export const checkExistingUser = async (email, mobileNumber) => {
  const apiEndpoint = APIRoutes.APP_CHECK_EXISTING_USER;
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        EmailId: email,
        MobileNumber: mobileNumber,
      },
      body: JSON.stringify({
        Comid: ServerURL.COMPANY_REF_ID,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Returning the API response for further checks
    } else {
      console.error("Error checking existing user");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while checking user details.");
  }
};

// Function to register the user
export const registerUser = async (userDetails) => {
  let objData = "";
  const apiEndpoint = APIRoutes.APP_REGISTER_USER;
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        objData: objData,
      },
      body: JSON.stringify(userDetails),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Returning API response after successful registration
    } else {
      console.error("Failed to create account.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while creating the account.");
  }
};

// Function to login the user
export const loginUser = async (mobileNumber, password) => {
  const apiEndpoint = APIRoutes.APP_LOGIN_USER;
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        MobileNumber: mobileNumber,
        Password: password
      },
      body: JSON.stringify({
        Comid: ServerURL.COMPANY_REF_ID,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false };
  }
};


// Function to Insert the customer address
export const API_InsertCustomerDetails = async (customerDetails) => {
  let objData = "";
  try {
    const response = await fetch(`${APIRoutes.INSERT_CUSTOMER_DETAILS}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        objData: objData,
      },
      body: JSON.stringify(customerDetails),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to create account.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while creating the account.");
  }
};


// Fetch customer address
export const API_FetchCustomerAddress = async (UserId) => {
  let objlist = {
    Comid: ServerURL.COMPANY_REF_ID,
  };
  try {
    const response = await fetch(`${APIRoutes.GET_CUSTOMER_ADDRESS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Id: UserId
      },
      body: JSON.stringify(objlist)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('No data found.');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch customer details:', error);
    throw error; // Re-throw so the calling function can handle it
  }
};


// Fetch My orders
export const API_FetchMyOrders = async (UserId) => {
  let objlist = {
    Comid: ServerURL.COMPANY_REF_ID,
  };
  try {
    const response = await fetch(`${APIRoutes.GET_MY_ORDERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Cid: UserId
      },
      body: JSON.stringify(objlist)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('No data found.');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch order details:', error);
    throw error; // Re-throw so the calling function can handle it
  }
};


// Fetch My Wallet Amount
export const API_FetchMyWalletIn = async (UserId) => {
  let objlist = {
    Comid: ServerURL.COMPANY_REF_ID,
  };
  try {
    const response = await fetch(`${APIRoutes.GET_MY_WALLET_IN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Cid: UserId
      },
      body: JSON.stringify(objlist)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('No data found.');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch wallet details:', error);
    throw error; // Re-throw so the calling function can handle it
  }
};


// Insert My favorite list
export const API_InsertMyFavoriteProducts = async (ProductId, UserId) => {
  let objlist = [
    {
      ItemmasterRefid: ProductId,
      CustomerRefid: UserId,
      DeleteStatus: 0,
      Comid: ServerURL.COMPANY_REF_ID,
    },
  ]
  try {
    const response = await fetch(`${APIRoutes.INSERT_FAVORITE_PRODUCT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        objData: ''
      },
      body: JSON.stringify(objlist)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }    
  } catch (error) {
    console.error('Failed to insert favorite product list:', error);
    throw error; // Re-throw so the calling function can handle it
  }
};


// Delete My favorite list
export const API_DeleteMyFavoriteProducts = async (ProductId, UserId) => {
  let objlist = [
    {
      ItemmasterRefid: ProductId,
      CustomerRefid: UserId,
      DeleteStatus: 0,
      Comid: ServerURL.COMPANY_REF_ID,
    },
  ];
  try {
    const response = await fetch(`${APIRoutes.DELETE_FAVORITE_PRODUCT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        objData: ''
      },
      body: JSON.stringify(objlist)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
  } catch (error) {
    console.error('Failed to delete favorite product list:', error);
    throw error; // Re-throw so the calling function can handle it
  }
};


// Fetch My favorite list
export const API_FetchMyFavoriteProducts = async (UserId) => {
  let objlist = {
    Comid: ServerURL.COMPANY_REF_ID,
  };
  try {
    const response = await fetch(`${APIRoutes.GET_PRODUCT_BY_FAVORITE_LISTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Cid: UserId
      },
      body: JSON.stringify(objlist)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error('No data found.');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch favorite product list:', error);
    throw error; // Re-throw so the calling function can handle it
  }
};
