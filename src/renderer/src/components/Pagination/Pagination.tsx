interface Props {
  pageCount: number
  onSetPage: (page: number) => void
}
const Pagination = ({ pageCount, onSetPage }: Props): JSX.Element => {
  const handleSetPage = (page: number): void => {
    onSetPage(page)
  }
  return (
    <div className="join justify-center">
      {Array.from({ length: pageCount }).map((_p, index) => (
        <button key={index} className="join-item btn" onClick={() => handleSetPage(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
