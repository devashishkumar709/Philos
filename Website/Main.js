import React from "react";
import Home from "./Welcome";
import About from "./About";
import Sign_up from "./Sign_up";
import Questions from "./Questions";
import Profile from "./Profile";
import Chat from "./Chat";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import New_User from "./Sign_up";
function Main() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about" exact component={About}></Route>
        <Route path="/sign_up" exact component={Sign_up}></Route>
        <Route path="/questions" exact component={Questions}></Route>
        <Route path="/profile" exact component={Profile}></Route>
        <Route path="/chat" exact component={Chat}></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Main;
