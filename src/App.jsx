import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import { useSelector } from "react-redux";
import RequireAuth from "./utils/RequireAuth";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Components/DashboardWrapper/Layout";
import { ApolloProvider } from '@apollo/client';
import GraphConfig from "./GraphQL/GraphConfig";

function App() {

  const { user } = useSelector(state => state?.auth);
  const client = GraphConfig();

  return (
    <>
    <ApolloProvider client={client}>
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* === Private Routes === */}
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            {user?.token && (
              <>
                <Route path="dashboard" element={<Dashboard />} />
              </>
            )}
          </Route>
        </Route>

        {/* === Unknown Routes === */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ApolloProvider>
    </>
  )
}

export default App
