import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

export default function RefundAndCancellation() {
    return (
        <>
            <Container  maxWidth="xl" sx={{px: { xs: 0, md: 3 }}}>
                <Box elevation={3} sx={{ padding: 4, pt: 1, marginTop: 1 }} align="left">
                    <Typography variant="h4" fontSize={22} fontWeight={600} gutterBottom align="left">
                        Refund & Return Policy
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="left">
                        Last Updated on January 01, 2022
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />

                    <Typography variant="h6" fontSize={18} fontWeight={600}>Cancellation</Typography>
                    <Typography variant="body1" paragraph>
                        For cancellation of any order please call us at "9841666819" or mail us at "" with user name and order id. If the order is already dispatched from our premises, you can not cancel the order but you can return it once it reaches your doorstep. If any goods returned by you do not adhere to the above policy, then we reserve the right to terminate our services to you.
                    </Typography>

                    <Divider sx={{ margin: '20px 0' }} />                    

                    <Typography variant="h6" fontSize={18} fontWeight={600}>In case of any complaints call us at :-</Typography>
                    <Typography variant="body1" paragraph>
                        HealthySteps.<br />
                        Address: 5 Ajnja Flat, Namantangal, Chennai, Tamil Nadu 600117,<br />
                        Chrompet Salai,<br />
                        Mobile: 9441061889<br />
                        Email: <a href="mailto:info@healthysteps.in">info@healthysteps.in</a>
                    </Typography>
                </Box>
            </Container>
        </>
    )
};