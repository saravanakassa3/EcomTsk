import React from 'react';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
import { useTheme } from '@mui/material/styles';

const Referrals = () => {
  const theme = useTheme();
  return (
    <Box align="left" sx={{ background: theme.palette.whitecolorCode.main || '#FFF', maxHeight: '700px', overflowY: 'scroll', p: 2, borderRadius: 2 }}>
      <Card sx={{ padding: 2 }}>
        <CardContent>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" fontWeight="bold" color="white">
              25% off for you, Pass for them @ ₹1!
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: theme.palette.whitecolorCode.main || '#FFF', my: 2 }} />
          <Box textAlign="left" mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              How it works
            </Typography>
            <Typography variant="body2" mt={1}>
              1. Share the referral link with <strong>your friend</strong>
            </Typography>
            <Typography variant="body2" mt={1}>
              2. After your friend places their first order, you get <strong>25% off</strong> up to ₹200 on your next order
            </Typography>
            <Typography variant="body2" mt={1}>
              3. Upon 10 successful referrals, you earn <strong>₹25</strong>
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2} mb={2}>
            <Button
              variant="outlined"
              startIcon={<WhatsAppIcon />}
              sx={{
                borderColor: theme.palette.lightblackcolorCode.main || 'black',
                color: theme.palette.lightblackcolorCode.main || 'black',
                width: '90%',
                marginBottom: 2,
              }}
            >
              Invite via Whatsapp
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkIcon />}
              sx={{
                borderColor: theme.palette.lightblackcolorCode.main || 'black',
                color: theme.palette.lightblackcolorCode.main || 'black',
                width: '90%',
              }}
            >
              Share Invite Link
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box textAlign="center">
            <Typography variant="h6" fontWeight="bold" color="#888">
              Your Referrals
            </Typography>
            <Typography variant="body2" color="#888">
              No referrals yet. Share with friends to start saving!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Referrals;
