import { Helmet } from 'react-helmet-async';
// @mui
// sections
import { AboutHero, AboutWhat } from '../sections/about';

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> About us | International Journal Indexing</title>
      </Helmet>
      <AboutHero />
      <AboutWhat />
    </>
  );
}
