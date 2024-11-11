import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
// components
import { useSettingsContext } from '../../components/settings';
// sections
import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';

// ----------------------------------------------------------------------

export default function EcommerceProductCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Ecommerce: Create a new product | INTERNATIONAL JOURNAL INDEXING</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        
        <ProductNewEditForm />
      </Container>
    </>
  );
}
