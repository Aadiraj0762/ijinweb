import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Stack, Typography} from '@mui/material';
// utils
import { hideScrollbarY } from '../../../utils/cssStyles';
//
import NavList from './NavList';

// ----------------------------------------------------------------------

NavSectionHorizontal.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

function NavSectionHorizontal({ data = [], sx, ...other }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mx: 'auto',
        ...hideScrollbarY,
        ...sx,
      }}
      {...other}
    >
      {data.map((group) =>
        group.children ? (
          // If the group has children, render the subheader and the list of items
          group.children.map((childGroup) => (
            <Items key={childGroup.subheader} items={childGroup.items} subheader={childGroup.subheader} />
          ))
        ) : (
          // If the group has no children, render it as a standalone item
          <NavList key={group.title} data={group} depth={1} hasChild={false} />
        )
      )}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

Items.propTypes = {
  items: PropTypes.array,
  subheader: PropTypes.string,  // Add prop for subheader
};

function Items({ items = [], subheader }) {
  return (
    <>
      <Typography variant="subtitle1">{subheader}</Typography> {/* Render the subheader */}
      {items.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />
      ))}
    </>
  );
}
