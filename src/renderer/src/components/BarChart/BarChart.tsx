import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
Chart.register(CategoryScale)
import { Bar } from 'react-chartjs-2'

interface IBarData {
  labels: string[]
  datasets: IDataSet
}
interface IDataSet {
  label: string
  data: number[]
}
const BarChart = ({ labels, datasets }: IBarData): JSX.Element => {
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [{ label: datasets.label, data: datasets.data }]
      }}
    />
  )
}

export default BarChart
