import { Button, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { MotionContainer, MotionViewport, varFade } from '../../components/animate';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    paddingRight: 0,
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
});

export default function SubscribeForm() {
  return (
    <Container component={MotionContainer}>
      <Stack
        component={MotionViewport}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          backgroundColor: '#212B36',
          padding: '40px 20px',
          borderRadius: '20px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Subscribe to our newsletter
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp} style={{ width: '100%' }}>
          <CustomTextField
            fullWidth
            placeholder="example@example.com"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#212B36',
                      color: '#fff',
                      borderRadius: '30px',
                      padding: '8px 25px',
                      marginRight:"10px",
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#3d424a',
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </m.div>
      </Stack>
    </Container>
  );
}
