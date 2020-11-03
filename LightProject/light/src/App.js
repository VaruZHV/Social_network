import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, withRouter } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitilieApp } from "./redux/app-reducer.ts";
import Preloader from "./components/preloader/Preloader";
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);

function App() {
  const initialazed = useSelector((state) => state.app.initalized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitilieApp());
  }, [dispatch]);

  if (!initialazed) {
    return <Preloader />;
  }
  return (
    <div className="App">
      <HeaderContainer />
      <div className="content">
        <Navbar />
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/profile/:Id?" render={() => <ProfileContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/settings" render={() => <div>settings</div>} />
        <Route path="/login" render={() => <Login />} />
      </div>
    </div>
  );
}

export default withRouter(App);
