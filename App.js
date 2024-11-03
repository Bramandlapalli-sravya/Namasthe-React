import React, { useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Components/Header/Header";
import Body from "./src/Components/Body/Home/Body.js";
import store from "./src/Redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import Error from "./src/Components/Error.tsx";
import { Outlet } from 'react-router-dom';
import './index.css';
// const About = lazy(()=> import('./src/Components/Body/About/About.tsx'));
const Restaurant = lazy(()=> import('./src/Components/Body/Home/Restaurant.tsx'));
const CartComponent = lazy(()=> import('./src/Components/Body/Home/CartComponent.tsx'));
const Contact = lazy(()=> import("./src/Components/Body/Contact/Contact"));

// import Contact from "./src/Components/Body/Contact/Contact";
// import CartComponent from "./src/Components/Body/Home/CartComponent.tsx";
// import About from "./src/Components/Body/About/About.tsx";


// const heading = React.createElement("h1", { id: "first-heading" }, [
//   React.createElement("h2", {}, [
//     React.createElement(
//       "h3",
//       {},
//       React.createElement(
//         "h4",
//         {},
//         React.createElement("h5", {}, "fifth heading")
//       )
//     ),
//   ]),
//   React.createElement("h2", {}, [
//     React.createElement(
//       "h3",
//       {},
//       React.createElement(
//         "h4",
//         {},
//         React.createElement("h5", {}, "fifth heading")
//       )
//     ),
//   ]),
// ]); // it has three parts first is the element, second is the attributes or props and third is the children

export const App = () => {
  // const {id} = useParams();
  // const location= useLocation();

  return (
    <Provider store={store}>
      <Header />
      {/* outlet is used for depends on children route we render that element here  */}
      <Outlet/> 
     {/* { location.pathname ===`/about/${id}` ? <Outlet/> : <Body />}  */}
      {/* using outlet we can render children element which is in router */}
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace /> // Redirect to "/home" as the default route
      },
      {
        path: '/home',
        element: <Body/>,
      },
      {
        path: '/contact',
        element: <Suspense fallback={ <p className="flex flex-1 items-center justify-center">Loading...</p>}><Contact /></Suspense>,
      },
      // {
      //   path:`about`,
      //   element: <Suspense fallback={'loading.....'}><About name={'swiggy'} number={200}/></Suspense>,
      // },
      {
        path:`/home/:name`,
        element: <Suspense fallback={ <p className="flex flex-1 items-center justify-center">Loading...</p>}><Restaurant/></Suspense>,
      },
      {
        path:`/cart`,
        element: <Suspense fallback={ <p className="flex flex-1 items-center justify-center">Loading...</p>}><CartComponent/></Suspense>,
      },
    ],
    errorElement: <Error/>,
  },
  // {
  //   path: '/about',
  //   element: <ItemDetail />,
  // },
  // {
  //   path: '/contact',
  //   element: <SinglePage/>
  // }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}/>);
