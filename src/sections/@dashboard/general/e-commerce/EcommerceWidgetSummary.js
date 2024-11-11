import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

EcommerceWidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  percent: PropTypes.number,
};

export default function EcommerceWidgetSummary({ title, percent, total, chart, sx, ...other }) {
  const { colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    chart: {
      animations: {
        enabled: true,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: 2,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
      marker: {
        show: false,
      },
    },
    ...options,
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 1, ...sx, width:"auto" }} {...other}>
      <Box sx={{ flexGrow: 1 }} >
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>

        <Typography variant="h3" gutterBottom>
          {fNumber(total)}
        </Typography>

      </Box>

    </Card>
  );
}

// ----------------------------------------------------------------------

