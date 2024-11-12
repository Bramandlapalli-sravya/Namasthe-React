import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RestaurantCatogeory from "./RestaurantCatogeory";

interface RootState {
    cart: {
        cartItem: []; 
    };
}


const Restaurant = () => {
    const { name } = useParams();
    const items = useSelector((state: RootState) => state.cart.items);
    // console.log(items, 'items')
    const [item, setItem] = useState<any>(null);

    
    useEffect(() => {
        // If `items` is empty on reload, retrieve it from localStorage
        const storedItems = items.length ? items : JSON.parse(localStorage.getItem('cartItems') || '[]');
    
        // Find the item by name
        const foundItem = storedItems.find((recipe: any) => 
            name?.toLowerCase() === recipe?.info?.name?.toLowerCase()
        );
    
        setItem(foundItem || null);
    
        // Store `items` in localStorage whenever they change
        if (items.length) {
            localStorage.setItem('cartItems', JSON.stringify(items));
        }
    }, [items, name]);
    
    const CDN = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/';

    return !item ? (
        <div key={item?.id} className="flex flex-col overflow-auto flex-1 md:px-32 md:pt-16 sm: px-4 pt-3">
            <div className="p-4 rounded-3xl border border-gray-200 border-t-0 ">
                <h1 className="text-2xl p-4 font-extrabold">{item?.info?.name}</h1>
                <div className="flex flex-col border rounded-3xl border-slate-300 p-3 shadow-2xl gap-1">
                    <h2 className="flex items-center font-bold"><span>{item?.info?.avgRating}({item?.info?.totalRatingsString}) ratings - <span>{item?.info?.costForTwo}</span></span></h2>
                    {/* <h2>Locality: <span>{item.info.locality}</span></h2>
                    <h2>Delivery In: <span>{item.info.sla.slaString}</span></h2> */}
                    <h2 className="text-orange-600 font-semibold text-sm underline">{item?.info?.cuisines.map((cuisine, index)=> {
                        return index === item?.info?.cuisines?.length-1 ? <span>{`${cuisine}`}</span>: <span>{`${cuisine}, `}</span>
                    })}</h2>
                    <h2 className="text-sm">{item?.info?.areaName}</h2>
                    <h2 className="text-sm">{item?.info?.sla?.slaString}</h2>
                </div>
            </div>
            <RestaurantCatogeory id={item?.info?.id}/>
        </div>
    ) : (
        <p className="flex flex-1 items-center justify-center">Loading...</p>
    );
};

export default Restaurant;
