import { Helmet } from 'react-helmet-async';
// @mui
// sections
import { SelectionHero, SelectionProcess } from '../sections/selection';

// ----------------------------------------------------------------------

export default function SelectionPage() {
  return (
    <>
      <Helmet>
        <title> Selection Process | International Journal Indexing</title>
      </Helmet>
      <SelectionHero />
      <SelectionProcess />
    </>
  );
}
