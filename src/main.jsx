import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import "./index.css";
import QuizContextProvider from "./contexts/QuizContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </QuizContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
