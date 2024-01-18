import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Label 1", "Label 2", "Label 3"],
  datasets: [
    {
      data: [90, 126, 144],
      backgroundColor: ["#37b8ac", "#59b6f2", "#7886c7"],
    },
  ],
};
const PieChart = () => {
  return <Pie data={data} />;
};

export default PieChart;
