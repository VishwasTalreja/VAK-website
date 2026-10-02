import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";
import AllInsights from "./components/AllInsights";
import PublicWebsite from "./components/PublicSite";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { useState } from "react";
function App() {
  const [token, setToken] = useState(
  localStorage.getItem("adminToken")
);
  return (
    <Routes>
      <Route
        path="/"
        element={<PublicWebsite />}
      />

    <Route
      path="/admin"
      element={
      token ? (
      <Navigate to="/admin/dashboard" replace />
      ) : (
      <AdminLogin
        onLogin={(newToken) => setToken(newToken)}
      />
      )
      }
      />
      <Route
      path="/insights/:id"
     element={<ArticlePage />}
      />
      <Route
  path="/insights"
  element={<AllInsights />}
/>

<Route
  path="/insights/:id"
  element={<ArticlePage />}
/>
      

      <Route
        path="/admin/dashboard"
        element={
          token
            ? (<AdminDashboard  onLogout={() => setToken(null)} />)
            : (<Navigate to="/admin" replace />)
        }
      />
    </Routes>
    
  );
}

export default App;