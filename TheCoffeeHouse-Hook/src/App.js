import React, { useState } from "react";
import Header from "./component/layout/Header";
import Body from "./component/layout/Body";
import Login from "./component/layout/Login";
import Footer from "./component/layout/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  const [totalAmount, setTotalAmount] = useState(null);
  function getAmount(data) {
    setTotalAmount(data);
  }
  return (
    <Router>
      <Header amount={totalAmount} />
      <Route
        path="/"
        exact
        render={() => <Body getAmount={getAmount} />}
      ></Route>
      {/* 2 cách */}
      <Route path="/login" component={Login} />
      {/* <Route path="/login" render={(props) => <Login {...props} />} /> */}

      <Footer />
    </Router>
  );
}

export default App;
