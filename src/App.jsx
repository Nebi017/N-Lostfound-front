import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ShowItemDetail from "./pages/ShowItem";
import ItemSubmissionForm from "./pages/ItemSubmissionForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemList from "./pages/Search";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ViewUsersItems from "./components/ViewUsersItems";
import EditItem from "./pages/EditItem";
import DeleteItem from "./pages/DeleteItem";
import AdminDashboard from "./pages/AdminDashboard";
import ContactForm from "./pages/ContactPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
// import Matches from "./components/Matches";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/submit" element={<ItemSubmissionForm />} />
          <Route path="/recent-items/:id" element={<ShowItemDetail />} />
          <Route path="/items/search" element={<ItemList />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/items/user-items" element={<ViewUsersItems />} />
          <Route path="/items/item/edit-item/:id" element={<EditItem />} />
          <Route path="/items/delete/:id" element={<DeleteItem />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          toastStyle={{ color: "black" }}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
