import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(Math.random() * 10);
  }

  return data;
};

const baseOptions = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      data: generateData(),
    },
  ],
};

const Chart = ({ type = 'line', height = 470 }) => {
  const options = React.useMemo(
    () => ({
      ...baseOptions,
      series: [{ ...baseOptions.series[0], type }],
      chart: { height },
    }),
    [type, height]
  );
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} height={190} />
    </div>
  );
};

export default Chart;
