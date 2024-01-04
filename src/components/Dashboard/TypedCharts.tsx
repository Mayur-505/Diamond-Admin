import { Line } from "react-chartjs-2";
interface Iprops {
  array: number[];
  border: string;
  bgColor: string;
}

const TypedCharts = ({ array, border, bgColor }: Iprops) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "july"],
    datasets: [
      {
        label: "First dataset",
        data: array,
        fill: true,
        backgroundColor: border,
        borderColor: bgColor,
      },
    ],
  };
  return <Line data={data} style={{ width: "100%" }} />;
};

export default TypedCharts;
