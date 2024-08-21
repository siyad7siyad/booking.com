import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
