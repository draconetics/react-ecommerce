import { createStore } from 'redux';
console.log("store...");
const reducer = (state = {  cart: [] } , action) => {
    let cart = state.cart;
    if(action.type === "ADD_TO_CART") {
        const sameProduct = cart.find((object)=> Number(object.item.id) === Number(action.product.id));
        let item;
        if(sameProduct){
            cart = cart.filter(object => object.item.id !== action.product.id )
            item = {item:sameProduct.item, quantity: sameProduct.quantity + 1}
        }else{
            item = {item: action.product, quantity: 1}
        }
        console.log(item);
        return ({ cart: cart.concat(item) });
        
    }else if (action.type === "REMOVE_FROM_CART"){
        return ({
            cart: cart.filter(object => object.item.id !== action.id)
        });
    }
    console.log(state);
    return state;
}

export default createStore(reducer);