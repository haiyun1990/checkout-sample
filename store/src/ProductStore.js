const productArray = [
    {
        id: "price_1P1tEN2NWBC2qFBwLN8DdQoJ",
        title: "coffee",
        price: "4.99"
    },
    {
        id: "price_1P1tK62NWBC2qFBwgciwJ4oC",
        title: "sunglasses",
        price: "9.99"
    },
    {
        id: "price_1P1tIl2NWBC2qFBwqe21C93g",
        title: "camera",
        price: "39.99"
    },
]
function getproductData(id){
    let productData = productArray.find(product => product.id === id);
    if (productData == undefined){
        console.log("Product data does not exit for ID: "+ id);
        return undefined;
    }
    return productData;
}
export{productArray,getproductData};
    
