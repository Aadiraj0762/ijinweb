import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
// components
import { useSettingsContext } from '../../components/settings';
// sections
import ConferenceForm from '../../sections/@dashboard/e-commerce/ConferenceForm';
// import { PricingPlanCard } from '../sections/pricing';

// ----------------------------------------------------------------------

export default function ConferenceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new product | INTERNATIONAL JOURNAL INDEXING</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        
        <ConferenceForm />
      </Container>
    </>
  );
}