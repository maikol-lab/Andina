import SinglePage from "../components/SinglePage"
import MostrarCarrito from "./cartpage/MostrarCarrito"


const CartPage = () => {
  return (
    <>
      <SinglePage titulo={"Carrito"} />
      <MostrarCarrito />
    </>
  )
}

export default CartPage;