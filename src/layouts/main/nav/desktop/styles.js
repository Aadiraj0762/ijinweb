// @mui
import { ListItemButton, ListSubheader, Paper } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== 'active' && prop !== 'open' && prop !== 'isOffset' && prop !== 'subItem',
})(({ active, open, isOffset, subItem, theme }) => {
  const dotActive = {
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    width: 6,
    height: 6,
    left: -14,
    opacity: 0.48,
    backgroundColor: '#00000',
  };

  return {
    ...theme.typography.subtitle2,
    padding: 0,
    height: '100%',
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      opacity: 0.48,
      backgroundColor: 'transparent',
    },
    // Sub item
    ...(subItem && {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
    }),
    // isOffset
    ...(isOffset && {
      color: theme.palette.text.primary,
    }),
    // Active
    ...(active && {
      color: theme.palette.primary.main,
      '&::before': dotActive,
    }),
    // Active sub item
    ...(active &&
      subItem && {
        ...theme.typography.subtitle2,
        color: theme.palette.text.primary,
        '&::before': {
          ...dotActive,
          color: theme.palette.primary.main,
        },
      }),
    // Open
    ...(open && {
      opacity: 0.48,
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledMenu = styled(Paper)(({ theme }) => ({
  top: 72,
  left: 0,
  right: 0,
  margin: 'auto',
  display: 'grid',
  position: 'fixed',
  alignItems: 'flex-start',
  zIndex: theme.zIndex.modal,
  padding: '40px 50px 8px 130px',
  boxShadow: theme.customShadows.dialog,
  maxWidth: theme.breakpoints.values.lg,
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',  // Adjust columns to content
  columnGap: theme.spacing(1),  // Add some gap between the columns for spacing
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
}));


// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  padding: 0,
  fontSize: 11,
  color: theme.palette.text.primary,
}));
