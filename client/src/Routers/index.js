import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button2 } from "@key46/theme";

import HomePage from "../Pages/HomePage";
import FormPage from "../Pages/FormPage";
import bookImg from "../book.png";

const Routers = () => (
  <Router>
    <div>
      <div className="nav">
        <div className="nav--logo">
          <Link to="/">
            <img src={bookImg} />
            Book Curd
          </Link>
        </div>
        <ul className="nav--ul">
          <li className="nav--li">
            <Link to="/">Home</Link>
          </li>
          <li className="nav--li">
            <Link to="/newbook">
              <Button2>Add new</Button2>
            </Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path="/book/:id" component={FormPage} />

        {/*
         It's possible to use regular expressions to control what param values should be matched.
            * "/order/asc"  - matched
            * "/order/desc" - matched
            * "/order/foo"  - not matched
      */}
        <Route
          path="/order/:direction(asc|desc)"
          component={ComponentWithRegex}
        />
        <Route path="/newbook" component={FormPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  </Router>
);

const ComponentWithRegex = ({ match }) => (
  <div>
    <h3>Only asc/desc are allowed: {match.params.direction}</h3>
  </div>
);

export default Routers;
