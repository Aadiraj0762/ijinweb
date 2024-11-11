import { m } from 'framer-motion';
// @mui
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>  {/* Full width container */}
      <Stack component={MotionViewport} spacing={5} alignItems="center" sx={{ marginTop: '50px' }}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h3" align="center">
            Feel free to contact us. <br />
            We&apos;ll be glad to hear from you.
          </Typography>
        </m.div>

        <Grid container spacing={3} maxWidth="md" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Name" />
            </m.div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Email" />
            </m.div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Subject" />
            </m.div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <m.div variants={varFade().inUp}>
              <TextField fullWidth label="Enter your message here." multiline rows={1} />
            </m.div>
          </Grid>
        </Grid>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained" alignSelf="center">
            Submit Now
          </Button>
        </m.div>
      </Stack>
      <br /><br />

      {/* Border at the very bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -24,
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: '#3157a7', // Updated color
        }}
      />

    </Box>
  );
}
