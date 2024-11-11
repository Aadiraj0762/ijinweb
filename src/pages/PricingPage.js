import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock/arrays';
// sections
import { PricingPlanCard } from '../sections/pricing';

// ----------------------------------------------------------------------

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title> Pricing | INTERNATIONAL JOURNAL INDEXING</title>
      </Helmet>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}      >
        

        <Box gap={3} display="grid" gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}>
          {_pricingPlans.map((card, index) => (
            <PricingPlanCard key={card.subscription} card={card} index={index} />
          ))}
        </Box>
      </Container>
    </>
  );
}
