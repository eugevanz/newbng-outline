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
    legend: { position: 'bottom', display: false },
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    }
  }
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [255, 99, 132, 5, 33, 21, 6],
      backgroundColor: 'rgba(255, 99, 132, 1)'
    },
    {
      label: 'Dataset 2',
      data: [8, 13, 21, 34, 55, 89, 144],
      backgroundColor: 'rgba(53, 162, 235, 1)'
    }
  ]
};

function OnVsOffSchedule() {
  return (
    <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
      <div className="uk-text-bold">My Company Performance</div>
      <div className="uk-text-meta uk-margin-large-bottom">
        Overall performance. Projects completed in the past 6 months{' '}
        <span className="uk-text-primary">On Schedule</span> vs.{' '}
        <span className="uk-text-danger">Off Schedule</span>.
      </div>
      <Line options={options} data={data} />
    </div>
  );
}
export default OnVsOffSchedule;