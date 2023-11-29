import React from "react";
import { createRoot } from "react-dom/client";
import SignInPage from "./pages/SignInPage";

const App: React.FC = () => {
  return <SignInPage />;
};

const root = document.getElementById("root");

root ? createRoot(root).render(<App />) : console.error("Root Element를 찾을 수 없습니다.");
