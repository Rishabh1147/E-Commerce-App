
const Loader = () => {
  return (
    <div>
      Loading...
    </div>
  )
}


export default Loader;

export const SkeletonLoader = ({width = "unset"}:{width ?: string}) => {

  return <div className="skeleton-loader" style = {{width}}>
    <div className="skeleton-shape"></div>
    <div className="skeleton-shape"></div>
    <div className="skeleton-shape"></div>

  </div>
  
}
