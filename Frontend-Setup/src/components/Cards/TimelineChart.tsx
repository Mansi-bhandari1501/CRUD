import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@mui/material';

const TimelineChart: React.FC = () => {
  useEffect(() => {
    const options = {
      series: [{
        data: [
          [1327359600000, 30.95], [1327446000000, 31.34], // ... more data
          [1361919600000, 39.60],
        ]
      }],
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
      annotations: {
        yaxis: [{
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: "#fff",
              background: '#00E396'
            }
          }
        }],
        xaxis: [{
          x: new Date('14 Nov 2012').getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Rally',
            style: {
              color: "#fff",
              background: '#775DD0'
            }
          }
        }]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart-timeline"), options);
    chart.render();

    const resetCssClasses = (activeEl: any) => {
      const els = document.querySelectorAll('button');
      Array.prototype.forEach.call(els, (el) => {
        el.classList.remove('active');
      });
      activeEl.target.classList.add('active');
    };

    document.querySelector('#one_month')?.addEventListener('click', (e) => {
      resetCssClasses(e);
      chart.zoomX(new Date('28 Jan 2013').getTime(), new Date('27 Feb 2013').getTime());
    });

    document.querySelector('#six_months')?.addEventListener('click', (e) => {
      resetCssClasses(e);
      chart.zoomX(new Date('27 Sep 2012').getTime(), new Date('27 Feb 2013').getTime());
    });

    document.querySelector('#one_year')?.addEventListener('click', (e) => {
      resetCssClasses(e);
      chart.zoomX(new Date('27 Feb 2012').getTime(), new Date('27 Feb 2013').getTime());
    });

    document.querySelector('#ytd')?.addEventListener('click', (e) => {
      resetCssClasses(e);
      chart.zoomX(new Date('01 Jan 2013').getTime(), new Date('27 Feb 2013').getTime());
    });

    document.querySelector('#all')?.addEventListener('click', (e) => {
      resetCssClasses(e);
      chart.zoomX(new Date('23 Jan 2012').getTime(), new Date('27 Feb 2013').getTime());
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <div id="chart-timeline"></div>
      {/* <div>
        <button id="one_month">1M</button>
        <button id="six_months">6M</button>
        <button id="one_year">1Y</button>
        <button id="ytd">YTD</button>
        <button id="all">ALL</button>
      </div> */}
    </Box>
  );
};

export default TimelineChart;