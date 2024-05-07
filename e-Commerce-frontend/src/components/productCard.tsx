import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

type productsProps = {
    productId : string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;

}

const server = "abcdes";

const ProductCard = ({productId,photo,name,price,stock,handler}:productsProps) => {
  return (
    <div className="productCard">
      <img src= {photo} alt={name} />
      <p>{name}</p>
      <span> ₹{price}</span>

      <div>
      <button onClick={() => handler()}>
        <FaPlus/>
      </button>
      </div>
      
    </div>
  )
}

export default ProductCard
