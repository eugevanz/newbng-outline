import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    }
  }
};

const data = {
  labels: ['23/01', '24/01', '25/01', '26/01', '27/01', '28/01', '29/01'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [255, 99, 132, 5, 33, 21, 6],
      borderColor: 'rgb(255, 99, 132)'
    },
    {
      label: 'Dataset 2',
      data: [8, 13, 21, 34, 55, 89, 144],
      borderColor: 'rgb(53, 162, 235)'
    }
  ]
};

function PerformanceMatrix() {
  return (
    <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
      <Line options={options} data={data} />
      <div className="uk-text-meta uk-margin-large-top">
        Overall performance. Task completion{' '}
        <span className="uk-text-primary">On Schedule</span> vs.{' '}
        <span className="uk-text-danger">Off Schedule</span>
      </div>
    </div>
  );
}
export default PerformanceMatrix;