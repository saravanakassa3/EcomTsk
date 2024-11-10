/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PasswordSettings = ({customerDetails}) => {
  const theme = useTheme();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <Box align="left" sx={{ background: theme.palette.whitecolorCode.main || '#FFF', maxHeight: '700px', overflowY: 'scroll', p: 2, borderRadius: 2 }}>
              {/* Form Section */}
              <Box component="form" noValidate autoComplete="off">
                <Typography sx={{ width: '100%', display: 'block' }} variant="p" gutterBottom>
                  Old password
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  defaultValue={oldPassword}
                  sx={{ mb: 2, mt: 0.5 }}
                />
                <Typography sx={{ width: '100%', display: 'block' }} variant="p" gutterBottom>
                  New password
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  defaultValue={newPassword}
                  sx={{ mb: 2, mt: 0.5 }}
                />

                <Typography sx={{ width: '100%', display: 'block' }} variant="p" gutterBottom>
                  Confirm password
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  defaultValue={confirmPassword}
                  sx={{ mb: 2, mt: 0.5 }}
                />

              </Box>

              {/* Delete Account Section */}
              <Box>                
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "16px",
                    textTransform: "none",
                    float: "right",
                  }}
                >
                  Update Account
                </Button>
              </Box>
            </Box>

  );
};

export default PasswordSettings;
