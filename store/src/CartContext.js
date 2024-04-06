import { createContext,useState } from "react";
import { productArray,getproductData } from "./ProductStore";

export const CartContext = createContext({
    items: [],
    getproductQuantity: ()=>{},
    addOneToCart: ()=>{},
    removeOneFromCart: ()=>{},
    deleteFromCart: ()=>{},
    getTotalCost: ()=>{}
});
export function CartProvider({children}){
    const [cartProduct,setCartProduct] = useState([]);
    
    function getproductQuantity(id){
        const quantity = cartProduct.find(product => product.id === id)?.quantity
        if (quantity === undefined){
            return 0;
        }
        return quantity;
 
    }
    function addOneToCart(id){
        const quantity = getproductQuantity(id);
        if (quantity === 0){
            setCartProduct(
                [
                    ...cartProduct,
                    {
                        id: id,
                        quantity:1
                    }
                ]
            )
        }else{
            setCartProduct(
                //[{id:1 ,quantity:3},{id:2,quantity:2}]
                cartProduct.map(
                    product=>
                    product.id === id
                    ?{...product,quantity: product.quantity +1}
                    :product
                )
            )
        }
    }
    function removeOneFromCart(id){
        const quantity = getproductQuantity(id);
        if (quantity == 1){
            deleteFromCart(id);
        }else{
            setCartProduct(
                cartProduct.map(
                    product=>
                    product.id === id
                    ?{...product,quantity: product.quantity -1}
                    :product
                ) 
            )
        }
    }
    function deleteFromCart(id){
        setCartProduct(
            cartProduct=>
            cartProduct.filter(currentproduct => {
                return currentproduct.id !=id ;
            })
        )
    }
    function getTotalCost(){
        let totalCost = 0;
        cartProduct.map((cartItem) =>{
            const productData = getproductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;
    }
    const contextvalue = {
        items: cartProduct,
        getproductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }
    return (
        <CartContext.Provider value={contextvalue}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;