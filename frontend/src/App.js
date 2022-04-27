import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import "./App.css";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import Health from "./components/personnel/HealthList";

import CreateHealth from "./components/personnel/CreateHealth";
import UpdateHealth from "./components/personnel/UpdateHealth";
import Dashboard from "./components/personnel/Dashboard";
import UsersList from "./components/personnel/UsersList";
import CreatePersonnel from "./components/personnel/CreatePersonnel";
import UpdatePersonnel from "./components/personnel/UpdatePersonnel";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import ProtectedRoute from "./components/route/ProtectedRoute";

import store from "./store";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import AnimalList from "./components/personnel/AnimalList";
import CreateAnimal from "./components/personnel/CreateAnimal";
import UpdateAnimal from "./components/personnel/UpdateAnimal";
import AnimalDetails from "./components/animal/AnimalDetails";
import AdoptionList from "./components/personnel/AdoptionList";
import ListAdoptions from "./components/adoption/ListAdoptions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* HomePath */}
            <Route path="/" element={<Home />} exact="true" />
            <Route path="/search/:keyword" element={<Home />} exact="true" />
            <Route
              path="/animal/:id"
              element={<AnimalDetails />}
              exact="true"
            />
            {/* HealthPath */}
            <Route
              path="/personnel/healths"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Health />
                </ProtectedRoute>
              }
              exact="true"
            />

            <Route
              path="personnel/health/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CreateHealth />
                </ProtectedRoute>
              }
              exact="true"
            />

            <Route
              path="/personnel/health/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateHealth />
                </ProtectedRoute>
              }
              exact="true"
            />

            {/* Dashboard */}

            <Route
              path="/personnel/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Personnel */}
            <Route
              path="/personnel/user/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CreatePersonnel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personnel/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UsersList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personnel/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdatePersonnel />
                </ProtectedRoute>
              }
            />

            {/* Adopter */}

            <Route path="/register" element={<Register />} exact="true" />
            <Route path="/login" element={<Login />} exact="true" />

            <Route
              path="/me/"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            {/* Animals */}

            <Route
              path="/personnel/animals"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AnimalList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personnel/adoptions"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdoptionList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personnel/animal/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CreateAnimal />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personnel/animal/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateAnimal />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/personnel/rescued/charts"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Charts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/personnel/adopted/charts"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdoptedCharts />
                </ProtectedRoute>
              }
            /> */}

            <Route path="/adoptions/me" element={<ListAdoptions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
