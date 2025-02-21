import { Bar, Line, Doughnut } from 'react-chartjs-2';

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Teal
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Teal
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        hoverBorderColor: 'rgba(75,192,192,1)',
        borderRadius: 10, // Rounded corners for bars
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        // position: 'top',
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
    barPercentage: 0.5, // Reduces the width of bars
    categoryPercentage: 0.8, // Space between bars
  };

  return <Bar data={data} options={options} />;
};

const LineChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
    datasets: [
      {
        label: 'My First Dataset', // Label for the dataset
        fill: false, // Do not fill the area under the line
        lineTension: 0.1, // Smoothness of the line (0 = straight lines)
        backgroundColor: 'rgba(75,192,192,0.4)', // Background color for the line
        borderColor: 'rgba(75,192,192,1)', // Line color
        borderCapStyle: 'butt', // Style of the line ends
        borderDash: [], // No dashed lines
        borderDashOffset: 0.0, // Offset for dashed lines
        borderJoinStyle: 'miter', // Style of line joins
        pointBorderColor: 'rgba(75,192,192,1)', // Border color for data points
        pointBackgroundColor: '#fff', // Background color for data points
        pointBorderWidth: 1, // Border width for data points
        pointHoverRadius: 5, // Radius of data points on hover
        pointHoverBackgroundColor: 'rgba(75,192,192,1)', // Background color on hover
        pointHoverBorderColor: 'rgba(220,220,220,1)', // Border color on hover
        pointHoverBorderWidth: 2, // Border width on hover
        pointRadius: 1, // Radius of data points
        pointHitRadius: 10, // Radius within which the point is detected
        data: [65, 59, 80, 81, 56, 55, 40], // Y-axis data points
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };

  return (
      <Line data={data} options={options} />
  );
};

const DonutChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Teal
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Red
          'rgba(54, 162, 235, 0.8)', // Blue
          'rgba(255, 206, 86, 0.8)', // Yellow
          'rgba(75, 192, 192, 0.8)', // Teal
          'rgba(153, 102, 255, 0.8)', // Purple
        ],
        hoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
        // display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%', // This makes it a donut chart by cutting out the center
  };

  return <Doughnut data={data} options={options} />;
};

const MultiLineChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
    datasets: [
      {
        label: 'Dataset 1', // Label for the first dataset
        fill: false, // Do not fill the area under the line
        lineTension: 0.1, // Smoothness of the line (0 = straight lines)
        backgroundColor: 'rgba(75,192,192,0.4)', // Background color for the line
        borderColor: 'rgba(75,192,192,1)', // Line color
        borderCapStyle: 'butt', // Style of the line ends
        borderDash: [], // No dashed lines
        borderDashOffset: 0.0, // Offset for dashed lines
        borderJoinStyle: 'miter', // Style of line joins
        pointBorderColor: 'rgba(75,192,192,1)', // Border color for data points
        pointBackgroundColor: '#fff', // Background color for data points
        pointBorderWidth: 1, // Border width for data points
        pointHoverRadius: 5, // Radius of data points on hover
        pointHoverBackgroundColor: 'rgba(75,192,192,1)', // Background color on hover
        pointHoverBorderColor: 'rgba(220,220,220,1)', // Border color on hover
        pointHoverBorderWidth: 2, // Border width on hover
        pointRadius: 1, // Radius of data points
        pointHitRadius: 10, // Radius within which the point is detected
        data: [65, 59, 80, 81, 56, 55, 40], // Y-axis data points
      },
      {
        label: 'Dataset 2', // Label for the second dataset
        fill: false, // Do not fill the area under the line
        lineTension: 0.1, // Smoothness of the line (0 = straight lines)
        backgroundColor: 'rgba(255,99,132,0.4)', // Background color for the line
        borderColor: 'rgba(255,99,132,1)', // Line color
        borderCapStyle: 'butt', // Style of the line ends
        borderDash: [], // No dashed lines
        borderDashOffset: 0.0, // Offset for dashed lines
        borderJoinStyle: 'miter', // Style of line joins
        pointBorderColor: 'rgba(255,99,132,1)', // Border color for data points
        pointBackgroundColor: '#fff', // Background color for data points
        pointBorderWidth: 1, // Border width for data points
        pointHoverRadius: 5, // Radius of data points on hover
        pointHoverBackgroundColor: 'rgba(255,99,132,1)', // Background color on hover
        pointHoverBorderColor: 'rgba(220,220,220,1)', // Border color on hover
        pointHoverBorderWidth: 2, // Border width on hover
        pointRadius: 1, // Radius of data points
        pointHitRadius: 10, // Radius within which the point is detected
        data: [30, 45, 60, 70, 50, 65, 75], // Y-axis data points
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };

  return <Line data={data} options={options} />;
};

export {BarChart, LineChart, DonutChart, MultiLineChart};
