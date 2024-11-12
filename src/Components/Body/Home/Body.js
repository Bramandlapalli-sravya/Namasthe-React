import { useEffect, useState } from "react";
import { fetchedItems } from "../../../Redux/cartItemSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../Body/style.css";
import RestaurantList from "./RestaurantList.tsx";
import Loader from "../../Loader/Loader";
import UseOnlineStatus from "./../../../Utilitis/useOnlineStatus.js";
import useDebounce from "../../../Utilitis/useDebounce.js";

const Body = () => {
  const dispatch = useDispatch();

  // Local state for initial loading
  const [initialLoading, setInitialLoading] = useState(false);

  // Dispatch the action to fetch items on initial render
  useEffect(() => {
    dispatch(fetchedItems());
  }, [dispatch]);

  // Access the Redux store states
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  // Local state to manage filtered items and search input
  const [filtered, setFiltered] = useState([]);
  const [itemNotFound, setItemNotFound] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // URLs for images
  const CDN =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
  const searchCDN =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/";

  // Handle debounced search

  const search = () => {
      if (searchInput) {
        const filteredItems = items?.filter((restaurant) =>
          restaurant?.info?.name
            ?.toLowerCase()
            .includes(searchInput?.toLowerCase())
        );
        if (filteredItems?.length === 0) {
          setItemNotFound(true);
        } else {
          setItemNotFound(false);
          setFiltered(filteredItems);
        }
      } else {
        setItemNotFound(false);
        setFiltered(items);
      }
  }

  const debounceSearch =  useDebounce(search, 5000);

  useEffect(() => {
    debounceSearch();
  }, [items, searchInput]);

  // Update filtered items when items change
  useEffect(() => {
    setFiltered(items);
  }, [items]);

  // Check online status
  const onlineStatus = UseOnlineStatus();

  // Show offline message if the user is offline
  if (onlineStatus === false)
    return (
      <h1>Looks like something went wrong!! Check your internet connection</h1>
    );

  // Render content based on status
  return (
    <div className="recipe-list gap-3">
      <div className="search sm: flex flex-wrap justify-center gap-5">
        <input
          type="text"
          className="px-3 py-1"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a recipe..."
        />
        <button
          className="rounded-pill bg-orange-600 px-4 py-2 text-white"
          onClick={() => {
            setSearchInput("");
            setFiltered(items);
          }}
        >
          Reset
        </button>
      </div>
      {status === "loading" ? (
        // Show loader when data is being fetched
        <Loader filteredLength={filtered} />
      ) : status === "error" ? (
        // Show error message if there's an error
        <div>{error}</div>
      ) : itemNotFound ? (
        // Show a message if no items match the search
        <div>No items found matching your search.</div>
      ) : (
        // Render the RestaurantList when data is available
        <RestaurantList filtered={filtered} CDN={CDN} />
      )}
    </div>
  );
};

export default Body;
