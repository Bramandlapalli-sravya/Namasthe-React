import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../Redux/cartItemSlice.js";
import { Link } from "react-router-dom";

interface RootState {
    cart: {
        cartItem: []; 
    };
}

const CartComponent = () => {

    const cartItems = useSelector((store: RootState)=> store.cart.cartItem);
    // console.log(cartItems, 'cartitems')
    const dispatch = useDispatch();

    const rupeeIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
            </svg>
        )
    }
    
    const CDN = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_200/'; // this is some where swiggy stored the images in cloud

    return <div className="flex flex-col justify-center items-center">
                <ul className="w-10/12">
                    <li className="font-extrabold text-3xl flex justify-center p-4">Cart Items</li>
                    <li className="flex justify-end">
                        {cartItems.length > 0 && 
                        <button
                        className="rounded-pill bg-orange-600 px-4 py-2 text-white flex my-4"
                            onClick={() => {
                            dispatch(clearCart([]));
                            }}
                        >
                            Clear Cart
                        </button>}
                    </li>
                    {cartItems.length > 0  ? cartItems.map((item)=> {
                        return (
                            <li key={item?.card?.info?.id} className="flex justify-between border-b-2 py-4">
                                <div className=" border-b-slate-800 w-3/4 flex flex-col justify-center gap-2">
                                    <div className="font-bold text-gray-800">{item?.card?.info?.name}</div>
                                    <div className="flex items-center">
                                        <div>{rupeeIcon()}</div>
                                        <h2 className="text-black font-bold">{item.card.info.defaultPrice/100 || item.card.info.finalPrice/100 || item.card.info.price/100}</h2>
                                    </div>
                                    <p className=" text-slate-800 text-wrap">{item?.card?.info?.description}</p>
                                </div>
                                <div className="relative">
                                    <LazyLoadImage
                                        className="recipe-img"
                                        src={CDN + item?.card?.info?.imageId}
                                        alt={item?.card?.info?.name}
                                        effect="blur"
                                    />
                                </div>
                            </li>
                        )
                        }) : <div className="flex flex-col justify-center items-center pt-48 text-md text-center">
                            <p>Your Cart is empty</p>
                            <p>You can go to <Link to={'/home'} className="text-blue-800">Home</Link> page to view more restaurants</p>
                        </div>
                    }
                </ul>
            </div>
}

export default CartComponent;