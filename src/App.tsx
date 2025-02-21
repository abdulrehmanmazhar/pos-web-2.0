import Layout from "./components/Layout";
import Login from "./components/Login";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Deliveries from "./pages/Deliveries";
import Inventory from "./pages/Inventory";
import Sell from "./pages/Sell";
import Customers from "./pages/Customers";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import AI from "./pages/AI";
import { selectCurrentloggedIn } from "./redux/slices/authSlice";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  LineController,
  Tooltip,
  Legend, 
  ArcElement
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  LineController,
  Legend
);

function LayoutWithLogin() {
  const loggedIn = useSelector(selectCurrentloggedIn); // Access login state
  return (
    <>
    {loggedIn ? 
      <Router>
      <Routes>
      <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />           
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/deliveries" element={<Deliveries />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/community" element={<Community />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ai-assistant" element={<AI />} />
        </Route>
          </Routes>
      </Router>
     : <Login/>}
    </>
  )
}

function App() {
  return(
    <Provider store={store}>
    <LayoutWithLogin/>
    </Provider>
  )
}

export default App;
