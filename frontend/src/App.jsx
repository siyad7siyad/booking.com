import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ResetPasswordRequest from "./pages/resetPasswordRequest";
import ResetPassword from "./pages/resetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          path="/register"
          element={
            <Layout>
              {" "}
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              {" "}
              <SignIn />
            </Layout>
          }
        />
         <Route path="/reset-password-request" element={<Layout><ResetPasswordRequest /></Layout>} />
         <Route path="/reset-password/:token" element={<Layout><ResetPassword /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
