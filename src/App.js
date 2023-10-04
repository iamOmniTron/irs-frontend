import { useState } from "react";
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import LoginUser from "./pages/auth/login";
import RegisterUser from "./pages/auth/register";
import LoginAdmin from "./pages/auth/loginAdmin";
import UserDashboardLayout from "./pages/user/components/layout";
import UserDashboard from "./pages/user";
import UserInvoices from "./pages/user/invoice";
import UserPayments from "./pages/user/payments";
import ResetPassword from "./pages/user/resetPassword";
import AdminDashboardLayout from "./pages/admin/components/layout";
import AdminDashboard from "./pages/admin";
import RefreshContext from "./context/refreshContext";
import District from "./pages/admin/district";
import LocalGovernmentAreas from "./pages/admin/lga";
import TurnOvers from "./pages/admin/gto";
import Taxes from "./pages/admin/tax";
import Size from "./pages/admin/size";
import Category from "./pages/admin/category";
import Type from "./pages/admin/type";
import Users from "./pages/admin/users";
import User from "./pages/admin/user";
import Invoices from "./pages/admin/invoices";
import Payments from "./pages/admin/payments";
import Business from "./pages/admin/business";
import ViewBusiness from "./pages/admin/viewBusiness";
import BusinessReport from "./pages/admin/businessReport";
import Reports from "./pages/admin/report";
import { AUTH_TOKEN_NAME } from "./utils/defaults";
import DistrictLGA from "./pages/admin/districtLga";
import UnRegisteredUsers from "./pages/admin/unregisteredUsers";
import UnRegisteredUser from "./pages/admin/unregisteredUser";
import Sessions from "./pages/admin/sessions";
import UnregisteredUserPage from "./pages/user/unregistered";
import { userStore } from "./store/userStore";
import PaymentReciept from "./components/reciept";

function AuthAdminRoutes(){

  const token = sessionStorage.getItem(AUTH_TOKEN_NAME);

  return !token ? <Navigate to="/admin/login"/> :
  <>
      <Routes>
            <Route path="/" element={<AdminDashboardLayout/>}>
              <Route path="" index element={<AdminDashboard/>}/>
              <Route path="district" element={<District/>}/>
              <Route path="lga" element={<LocalGovernmentAreas/>}/>
              <Route path="gto" element={<TurnOvers/>}/>
              <Route path="cit" element={<Taxes/>}/>
              <Route path="business-size" element={<Size/>}/>
              <Route path="category" element={<Category/>}/>
              <Route path="type" element={<Type/>}/>
              <Route path="users" element={<Users/>}/>
              <Route path="user" element={<User/>}/>
              <Route path="invoice" element={<Invoices/>}/>
              <Route path="payment" element={<Payments/>} />
              <Route path="business" element={<Business/>}/>
              <Route path="view-business" element={<ViewBusiness/>}/>
              <Route path="district/lga" element={<DistrictLGA/>}/>
              <Route path="reports" element={<Reports/>}/>
              <Route path="user/new" element={<UnRegisteredUser/>}/>
              <Route path="users/new" element={<UnRegisteredUsers/>}/>
              <Route path="business-report" element={<BusinessReport/>}/>
              <Route path="users/sessions" element={<Sessions/>}/>
              <Route path="*" element={<Navigate to="/admin/login"/>}/>
            </Route>
              <Route path="*" element={<Navigate to="/admin/login"/>}/>
      </Routes>
  </>
}

const AuthUserRoutes = ()=>{
  const user = userStore(state=>state.user);

  return user.isConfirmed? <>
    <Routes>
          <Route path="/" element={<UserDashboardLayout/>}>
            <Route path="" index element={<UserDashboard/>}/>
            <Route path="invoices" element={<UserInvoices/>}/>
            <Route path="payments" element={<UserPayments/>}/>
            <Route path="settings/password-reset" element={<ResetPassword/>}/>
            <Route path="*" element={<Navigate to={"/"}/>}/>
          </Route>
          <Route path="*" element={<Navigate to={"/"}/>}/>
    </Routes>
  </>  :
    <Routes>
          <Route path="/" element={<UnregisteredUserPage/>}/>
          <Route path="*" element={<Navigate to={"/"}/>}/>
    </Routes>
}



function App() {
  const [flag,setFlag] = useState(false);
  return (
    <>
    <RefreshContext.Provider value={{flag,setFlag}}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginUser/>}/>
          <Route path="/register" element={<RegisterUser/>} />
          <Route path="/admin/login" element={<LoginAdmin/>}/>
          <Route path="/admin/*" element={<AuthAdminRoutes/>}/>
          <Route path="/user/*" element={<AuthUserRoutes/>}/>
          <Route path="/payment/reciept" element={<PaymentReciept/>}/>
        </Routes>
      </Router>
    </RefreshContext.Provider>
    </>
  );
}

export default App;
