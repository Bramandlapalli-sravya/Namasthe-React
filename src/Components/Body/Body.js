import { useEffect, useState } from "react";
import { fetchedItems } from "../../Redux/cartItemSlice";
import { useDispatch, useSelector } from "react-redux";
import "../Body/style.css";

const Body = () => {
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(fetchedItems());
  }, [dispatch]);

  const items = useSelector((state) => state.cartItem.items);
  const status = useSelector((state) => state.cartItem.status);

  const cartItems = items[0]?.recipes;
  console.log(cartItems);

  const filteredTopRated = cartItems?.filter((recipe) => {
    return recipe.rating === 5;
  });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setFiltered(true);
          }}
        >
          Top Rated
        </button>
        <button
          onClick={() => {
            setFiltered(false);
          }}
        >
          All
        </button>
      </div>
      {status == "success" && (
        <div className="items">
          {filtered
            ? filteredTopRated.map((recipe) => {
                return (
                  <div className="item-blog">
                    <h1>{recipe.name}</h1>
                    <img
                      className="recipe-img"
                      src={recipe.image}
                      alt={recipe.name}
                      loading="lazy"
                    />
                    <h4>Rating: {recipe.rating}</h4>
                  </div>
                );
              })
            : cartItems.map((recipe) => {
                return (
                  <div key={recipe.id} className="item-blog">
                    <h1>{recipe.name}</h1>
                    <img
                      className="recipe-img"
                      src={recipe.image}
                      alt={recipe.name}
                      loading="lazy"
                    />
                    <h4>Rating: {recipe.rating}</h4>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default Body;
