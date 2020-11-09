import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import PasswordPopover from "./PasswordPopover";

function later(delay: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
  subscribe: boolean;
};

function Form() {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearErrors,
    formState,
    reset,
  } = useForm<FormInputs>();
  const onSubmit = async (data: FormInputs) => {
    if (data.password !== data.confirmPassword) {
      setError("password", {
        type: "passwordMatch",
        message: "Your password and confirmation password do not match.",
      });
      setError("confirmPassword", {
        type: "passwordMatch",
        message: "Your password and confirmation password do not match.",
      });
    }
    await later(3000);
    alert("Thank you for Register");
    reset();
  };
  return (
    <div>
      <h1> Create an Account </h1>
      <form>
        <label> Fullname * </label>
        <input
          type="text"
          name="fullName"
          ref={register({ required: "Fullname Required" })}
        />
        {errors.fullName && (
          <p className="error"> {errors.fullName.message} </p>
        )}

        <label> Email *</label>
        <input
          type="email"
          name="email"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />

        {errors.email && errors.email.type == "required" && (
          <p className="error"> Email Required </p>
        )}
        {errors.email && errors.email.type == "pattern" && (
          <p className="error"> Invalid Email </p>
        )}

        <label htmlFor=""> Password * </label>
        <PasswordPopover>
          {(
            props // validate, visible
          ) => (
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              ref={register({ required: "Password Required" })}
              onFocus={() => props.visible(true)}
              onBlur={() => props.visible(false)}
              onChange={() =>
                props.validate("password", getValues, setError, clearErrors)
              }
            />
          )}
        </PasswordPopover>
        {errors.password && (
          <p className="error"> {errors.password.message} </p>
        )}
        <label htmlFor=""> Confirm Password * </label>
        <PasswordPopover>
          {(
            props // validate, visible
          ) => (
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              ref={register({ required: "Password Required" })}
              onFocus={() => props.visible(true)}
              onBlur={() => props.visible(false)}
              onChange={() =>
                props.validate(
                  "confirmPassword",
                  getValues,
                  setError,
                  clearErrors
                )
              }
            />
          )}
        </PasswordPopover>
        {errors.confirmPassword && (
          <p className="error"> {errors.confirmPassword.message} </p>
        )}

        <label className="row">
          <input
            name="agree"
            type="checkbox"
            ref={register({ required: true })}
          />
          <span>I Agree to Term of Services and Privacy Policy * </span>
        </label>
        {errors.agree && <p className="error"> Aggrement Required </p>}

        <label className="row">
          <input type="checkbox" name="subscribe" ref={register()} />
          <span>Subscribe to Newsletter</span>
        </label>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={formState.isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

function App() {
  return <Form />;
}

export default App;
