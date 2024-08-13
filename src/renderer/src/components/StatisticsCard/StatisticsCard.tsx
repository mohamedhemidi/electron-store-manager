interface Props {
  number: number
  title: string
  icon: React.ReactNode
}
const StatisticsCard = ({ number, title, icon }: Props): JSX.Element => {
  return (
    <div className="flex flex-row bg-white dark:bg-slate-900 rounded-md p-4 h-40 w-1/2">
      <div className="flex flex-col justify-between">
        <h2 className="text-4xl">{number}</h2>
        <h4 className="text-base">{title}</h4>
      </div>
      <div className="m-auto flex flex-row items-end justify-end">
        {icon}
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 576 512">
          <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
        </svg> */}
      </div>
    </div>
  )
}

export default StatisticsCard
