import React from "react";
import "./App.css";

function Form() {
  return (
    <div>
      <h1> Create an Account </h1>
      <form>
        <label> Fullname * </label>
        <input type="text" name="fullName" />

        <label> Email *</label>
        <input type="email" name="email" />

        <label htmlFor=""> Password * </label>
        <input name="password" type="password" autoComplete="new-password" />

        <label htmlFor=""> Confirm Password * </label>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />

        <label className="row">
          <input name="agree" type="checkbox" />
          <span>I Agree to Term of Services and Privacy Policy * </span>
        </label>

        <label className="row">
          <input type="checkbox" name="subscribe" />
          <span>Subscribe to Newsletter</span>
        </label>

        <button type="button">Sign Up</button>
      </form>
    </div>
  );
}

function App() {
  return <Form />;
}

export default App;
