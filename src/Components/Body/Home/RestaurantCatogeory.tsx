import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../../Redux/cartItemSlice.js";

interface RootState {
    cart: {
        cartItem: []; 
    };
}

interface RestaurantCategoryProps {
    id: string; // or number based on your data structure
}

interface ItemCategory {
    card: {
        card: {
            title: string;
            itemCards: Array<{
                card: {
                    info: {
                        id: number;
                        name: string;
                        defaultPrice: number;
                        finalPrice: number;
                        price: number;
                        description: string;
                        imageId: string;
                    };
                };
            }>;
        };
    };
}

const RestaurantCategory: React.FC<RestaurantCategoryProps> = ({ id }) => {
    const [itemCategoryList, setItemCategoryList] = useState<ItemCategory[]>([]);
    const [recommendedList, setRecommendedList] = useState(false);
    const [currentTitle, setCurrentTitle] = useState<string | number>('');
    // const cartItemsList = useSelector((state: RootState) => state.cart.cartItem);
    const dispatch = useDispatch();

    const fetchCategory = async (id: string) => {
        try {
            const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4325894&lng=78.4070691&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`);
            const data = await response.json();
            // console.log(data, 'restaunt-category')
            const itemCategory = data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards;
            const itemCategoryCard = itemCategory.filter((card) => card?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
            setItemCategoryList(itemCategoryCard);
        } catch (error) {
            // console.error(error);
            return error;
            // You might want to handle the error state here
        }
    };

    useEffect(() => {
        fetchCategory(id);
    }, [id]);

    const downArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67" />
        </svg>
    );

    const rupeeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee" viewBox="0 0 16 16">
            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
        </svg>
    );

    const CDN = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_200/';

    const handleClickDropdown = (title: string) => {
        if (title === currentTitle) {
            setRecommendedList(!recommendedList);
        } else {
            setCurrentTitle(title);
            setRecommendedList(true);
        }
    };

    return (
        <div className="pt-4">
            {itemCategoryList.map((item) => {
                const title = item?.card?.card?.title;
                return (
                    <div key={title} className="shadow py-2 px-4 rounded-md bg-slate-100 my-2">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => handleClickDropdown(title)}>
                            <h1 className="py-2 font-bold mb-0">{title} ({item?.card?.card?.itemCards?.length})</h1>
                            <div>{downArrow}</div>
                        </div>
                        {recommendedList && currentTitle === title &&
                            <ul className="flex flex-col gap-6 justify-center">
                                {item?.card?.card?.itemCards?.map((item) => (
                                    <li key={item?.card?.info?.id} className="flex justify-between border-b-2 pb-4">
                                        <div className="border-b-slate-800 w-3/4 flex flex-col justify-center gap-2">
                                            <div className="font-bold text-gray-800">{item?.card?.info?.name}</div>
                                            <div className="flex items-center">
                                                <div>{rupeeIcon}</div>
                                                <h2 className="text-black font-bold">{item.card.info.defaultPrice / 100 || item.card.info.finalPrice / 100 || item.card.info.price / 100}</h2>
                                            </div>
                                            <p className="text-slate-800 text-wrap">{item?.card?.info?.description}</p>
                                        </div>
                                        <div className="relative">
                                            <LazyLoadImage
                                                className="recipe-img"
                                                src={CDN + item?.card?.info?.imageId}
                                                alt={item?.card?.info?.name}
                                                effect="blur"
                                            />
                                            <div className="absolute bottom-0 left-1/4 gap-4 flex">
                                                <button className="rounded px-3 py-1 bg-slate-300" onClick={() => dispatch(addItem(item))}>Add +</button>
                                                <button className="rounded px-3 py-1 bg-red-600 text-white" onClick={() => dispatch(removeItem(item))}>Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default RestaurantCategory;
