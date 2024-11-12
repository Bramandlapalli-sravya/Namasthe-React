import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";

// Define the interface for the recipe object
interface RecipeInfo {
  id: string;
  name: string;
  avgRating: string;
  locality: string;
  costForTwo: string;
  cloudinaryImageId: string;
  sla: {
    slaString: string;
    serviceability?: string;
  };
}

interface Recipe {
  info: RecipeInfo;
}

// Define the props interface
interface RestaurantListProps {
  filtered: Recipe[];
  CDN: string;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ filtered, CDN }) => {
  return (
    <div className="items sm: flex justify-center">
      {filtered?.map((recipe) => (
        <Link key={recipe.info.id} to={`/home/${recipe.info.name}`}>
          <div
            data-testid="resCard"
            aria-label={recipe.info.name}
            className="item-blog hover:bg-slate-100 relative"
          >
            {recipe.info.sla.serviceability && (
              <label className="bg-black text-white px-2 py-1 rounded text-xs absolute top-0 left-0 z-50">
                {recipe.info.sla.serviceability}
              </label>
            )}
            <LazyLoadImage
              className="recipe-img"
              src={CDN + recipe.info.cloudinaryImageId}
              alt={recipe.info.name}
              effect="blur"
            />
            <h1 className="font-semibold">{recipe.info.name}</h1>
            <h2>
              Rating: <span>{recipe.info.avgRating}</span>
            </h2>
            <h2>
              Locality: <span>{recipe.info.locality}</span>
            </h2>
            <h2>
              Delivery In: <span>{recipe.info.sla.slaString}</span>
            </h2>
            <h2>
              Cost For Two: <span>{recipe.info.costForTwo}</span>
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;
