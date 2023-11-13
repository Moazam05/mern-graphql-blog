// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// CSS Imports
import "./index.css";
// Custom Imports
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Apollo Client Imports
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// Redux Imports
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
