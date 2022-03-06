import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
};

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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

function SelectedProject() {
  return (
    <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
      <div className="uk-text-bold">
        ODESSA MOBILE TECHNOLOGY PROJECT activities
      </div>

      <div className="uk-text-meta uk-margin-large-bottom">
        The Odessa Mobile Technology Project Plan will provide a definition of
        the project, including the project’s goals and objectives. Additionally,
        the Plan will serve as an agreement between the following parties:
        Project Sponsor, Steering Committee, Project Manager, Project Team, and
        other personnel associated with and/or affected by the project.
      </div>

      <Doughnut data={data} options={options}></Doughnut>

      <div className="uk-text-meta uk-margin-large-top">
        Get all the projects in the portal for the logged in user.
      </div>
    </div>
  );
}
export default SelectedProject;