import React from "react";
import "./App.style.scss";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
