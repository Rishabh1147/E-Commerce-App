import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"
import { useLatestProductsQuery } from "../redux/api/productAPI"
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/loader";

const Home = () => {

  const {data, isLoading, isError} = useLatestProductsQuery("");
  const addToCartHandler = () =>{

  }

  if(isError){
    toast.error("Cannot fetch details try again");
  }

  return (

    <div className="home">
      <section></section>

      <h1>Latest Products
      <Link to = "/search" className="findmore" > More </Link>
      </h1>

      <main>
        { isLoading ? <SkeletonLoader width="80vw"/> :  (data?.products.map((i) => (
            <ProductCard 
            key = {i._id}
            productId={i._id} 
            name={i.name} 
            price={i.price}
            stock={i.stock} 
            handler={addToCartHandler}
            photo={i.photo} />
          )))
        }
      </main>
    </div>
  )
}

export default Home
