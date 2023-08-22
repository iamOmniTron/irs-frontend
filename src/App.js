import {Typography} from "antd"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginUser from "./pages/auth/login";
import RegisterUser from "./pages/auth/register";
import LoginAdmin from "./pages/auth/loginAdmin";
import UserDashboardLayout from "./pages/user/components/layout";
import UserDashboard from "./pages/user";
import UserInvoices from "./pages/user/invoice";
import UserPayments from "./pages/user/payments";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginUser/>}/>
          <Route path="/register" element={<RegisterUser/>} />
          <Route path="/admin" element={<LoginAdmin/>}>
          </Route>
          <Route path="/user" element={<UserDashboardLayout/>}>
            <Route path="" index element={<UserDashboard/>}/>
            <Route path="invoices" element={<UserInvoices/>}/>
            <Route path="payments" element={<UserPayments/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
