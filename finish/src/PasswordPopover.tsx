import React, { useState } from "react";

type ChildProps = {
  validate: (
    field: string,
    getValues: (text: string) => string,
    setError: any,
    clearErrors: any
  ) => void;
  visible: (show: boolean) => void;
};

type Props = {
  children: (props: ChildProps) => React.ReactNode;
};

export default function PasswordPopover(props: Props) {
  let [isVisible, setVisible] = useState(false);
  let [rule1, setRule1] = useState(false);
  let [rule2, setRule2] = useState(false);
  let [rule3, setRule3] = useState(false);
  let [rule4, setRule4] = useState(false);
  let [rule5, setRule5] = useState(false);

  const validate = (
    field: string,
    getValues: (text: string) => string,
    setError: any,
    clearErrors: any
  ) => {
    let valid: boolean = true;
    const value = getValues(field);

    // rule 1 : At Least 8 Characters
    if (value.length >= 8) {
      setRule1(true);
    } else {
      setRule1(false);
      valid = false;
    }

    // rule 2 : At Least 1 Lowercase
    const matches2 = value.match(/[a-z]/g) || [];
    if (matches2.length >= 1) {
      setRule2(true);
    } else {
      setRule2(false);
      valid = false;
    }

    // rule 3 : At Least 1 Uppercase
    const matches3 = value.match(/[A-Z]/g) || [];
    if (matches3.length >= 1) {
      setRule3(true);
    } else {
      setRule3(false);
      valid = false;
    }

    // rule 4 : At Least 1 Symbol

    const matches4 = value.match(/[^0-9a-zA-Z\s]/g) || [];
    if (matches4.length >= 1) {
      setRule4(true);
    } else {
      setRule4(false);
      valid = false;
    }

    // rule 5 : At Least 1 Number

    const matches5 = value.match(/[0-9]/g) || [];
    if (matches5.length >= 1) {
      setRule5(true);
    } else {
      setRule5(false);
      valid = false;
    }

    if (!valid) {
      setError(field, {
        type: "manual",
        message: " Pasword Doesn't Meet Requirements",
      });
    } else {
      clearErrors(field);
    }
  };

  const visible = (b: boolean) => {
    setVisible(b);
  };

  return (
    <div
      className={`popover__wrapper ${isVisible === true ? "open" : "close"}`}
    >
      {props.children({
        validate,
        visible,
      })}
      <div className="popover__content">
        <div className="popover__message">
          <p>Password Requirements : </p>
          <ul>
            <li className={rule1 === true ? "line" : ""}>Min 8 Characters </li>
            <li className={rule2 === true ? "line" : ""}>Lowercase (a-z)</li>
            <li className={rule3 === true ? "line" : ""}>Uppercase (A-Z)</li>
            <li className={rule4 === true ? "line" : ""}>Symbols (?#@..)</li>
            <li className={rule5 === true ? "line" : ""}>Number (0-9)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
