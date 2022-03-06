import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
};

const data = {
  labels: [
    'ODESSA MOBILE TECHNOLOGY PROJECT',
    'Strategic Marketing Plan',
    'RE ELM-6/005/2021-2022',
    'HSRC1818',
    'MTF 01/01/2022',
    'MPCAM10063GX'
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ]
};

function ThisWeekProjectActivities() {
  return (
    <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
      <div className="uk-text-bold">This week in Project Activities</div>

      <div className="uk-text-meta uk-margin-large-bottom">
        Strategic Marketing Plan has reached 45% completeness this week.
      </div>

      <Doughnut data={data} options={options}></Doughnut>
    </div>
  );
}
export default ThisWeekProjectActivities;