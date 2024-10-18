import React from "react";
import ReactDOM from "react-dom";
import Header from "./src/Components/Header/Header";
import Body from "./src/Components/Body/Body";
import store from "./src/Redux/store";
import { Provider } from "react-redux";

const heading = React.createElement("h1", { id: "first-heading" }, [
  React.createElement("h2", {}, [
    React.createElement(
      "h3",
      {},
      React.createElement(
        "h4",
        {},
        React.createElement("h5", {}, "fifth heading")
      )
    ),
  ]),
  React.createElement("h2", {}, [
    React.createElement(
      "h3",
      {},
      React.createElement(
        "h4",
        {},
        React.createElement("h5", {}, "fifth heading")
      )
    ),
  ]),
]); // it has three parts first is the element, second is the attributes or props and third is the children

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Body />
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
