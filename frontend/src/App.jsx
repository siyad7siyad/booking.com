import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/myHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

import MyHome from "./pages/MyHome";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />} /> */}
        <Route
          path="/"
          element={
            <Layout>
              <MyHome />
            </Layout>
          }
        />
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
          path="/search"
          element={
            <Layout>
              {" "}
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              {" "}
              <Details />
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
        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  {" "}
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  {" "}
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  {" "}
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  {" "}
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  {" "}
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
