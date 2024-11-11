import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

// useActiveLink.js
export default function useActiveLink(path) {
  const { pathname } = useLocation();
  
  // Ensure 'path' is defined and is a string
  const safePath = path || '';

  const active = safePath === pathname || pathname.includes(safePath);

  const isExternalLink = safePath.includes('http');

  return { active, isExternalLink };
}
