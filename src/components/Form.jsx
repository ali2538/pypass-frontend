"use client";
import Label from "./Label";
import CheckBox from "./CheckBox";
import { useEffect, useState } from "react";
import Button from "./Button";
import TextBox from "./TextBox";
import NumberAdjust from "./NumberAdjust";
import Slider from "./Slider";
export default function Form() {
  const minPasswordLength = 10;
  const url_base = "http://127.0.0.1:8000/api/passwd/";
  const maxPasswordLength = 50;
  const minNumberOfLetters = 2;
  const [uppercaseSelected, setUppercaseSelected] = useState(true);
  const [lowercaseSelected, setLowercaseSelected] = useState(true);
  const [digitsSelected, setDigitsSelected] = useState(true);
  const [specialCharsSelected, setSpecialCharsSelected] = useState(false);
  const [passwordAlreadyGenerated, setPasswordAlreadyGenerated] =
    useState(false);
  const [passwordLength, setPasswordLength] = useState(10);
  const [numberOfDigits, setNumberOfDigits] = useState(1);
  const [digitsOptionChanged, setDigitsOptionChanged] = useState(false);
  const [specialCharOptionChanged, setSpecialCharOptionChanged] =
    useState(false);
  const [numberOfSpecialChars, setNumberOfSpecialChars] = useState(0);
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (specialCharOptionChanged) {
      if (specialCharsSelected) {
        setNumberOfSpecialChars(1);
      } else if (!specialCharsSelected) {
        setNumberOfSpecialChars(0);
      }
      setSpecialCharOptionChanged(false);
    }
    if (digitsOptionChanged) {
      if (digitsSelected) {
        setNumberOfDigits(1);
      } else if (!digitsSelected) {
        setNumberOfDigits(0);
      }
      setDigitsOptionChanged(false);
    }
  });
  async function toggleOption(e) {
    switch (e.target.id) {
      case "uppercaseOption":
        if (!lowercaseSelected && !digitsSelected && !specialCharsSelected) {
          setUppercaseSelected(!uppercaseSelected);
          setLowercaseSelected(true);
        } else {
          setUppercaseSelected(!uppercaseSelected);
        }
        break;
      case "lowercaseOption":
        if (!uppercaseSelected && !digitsSelected && !specialCharsSelected) {
          setLowercaseSelected(!lowercaseSelected);
          setUppercaseSelected(true);
        } else {
          setLowercaseSelected(!lowercaseSelected);
        }
        break;
      case "digitsOption":
        if (
          !uppercaseSelected &&
          digitsSelected &&
          !specialCharsSelected &&
          !lowercaseSelected
        ) {
          setDigitsSelected(!digitsSelected);
          setLowercaseSelected(true);
        } else {
          setDigitsSelected(!digitsSelected);
        }

        setDigitsOptionChanged(true);
        break;
      case "specialCharOptions":
        if (
          !uppercaseSelected &&
          !digitsSelected &&
          specialCharsSelected &&
          !lowercaseSelected
        ) {
          setSpecialCharsSelected(!specialCharsSelected);
          setLowercaseSelected(true);
        } else {
          setSpecialCharsSelected(!specialCharsSelected);
        }
        setSpecialCharOptionChanged(true);
        //if (specialCharsSelected) setNumberOfSpecialChars(1)
        //setSpecialCharsSelected(!specialCharsSelected);

        console.log(`special char count ${numberOfSpecialChars}`);
        break;
      default:
        break;
    }
    if (passwordAlreadyGenerated) {
      setPasswordAlreadyGenerated(false);
      clearGeneratedPassword();
    }
  }
  async function generatePassword(e) {
    e.preventDefault();

    const response = await fetch(
      `${url_base}?passw_length=${passwordLength}&uppercase=${uppercaseSelected}&lowercase=${lowercaseSelected}&min_digits=${numberOfDigits}&min_spec_chars=${numberOfSpecialChars}&digits=${digitsSelected}&spec_chars=${specialCharsSelected}`
    );
    const data = await response.json();
    setPassword(data.gen_password);
    setPasswordAlreadyGenerated(true);
  }
  function passwordLengthChanged(e) {
    setPasswordLength(e.target.value);
    if (passwordAlreadyGenerated) {
      setPasswordAlreadyGenerated(false);
      clearGeneratedPassword();
    }
  }
  function numberOfDigitsChanged(e) {
    setNumberOfDigits(e.target.value);
    if (passwordAlreadyGenerated) {
      setPasswordAlreadyGenerated(false);
      clearGeneratedPassword();
    }
  }
  function numberOfSpecialCharsChanged(e) {
    setNumberOfSpecialChars(e.target.value);
    if (passwordAlreadyGenerated) {
      setPasswordAlreadyGenerated(false);
      clearGeneratedPassword();
    }
  }

  async function handleCopyBtnClick(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(password);
      alert("Text copied to clipboard");
    } catch (err) {
      alert("Error copying to clipboard", err);
    }
  }

  function clearGeneratedPassword() {
    setPassword("");
    setPasswordAlreadyGenerated(false);
  }

  return (
    <form className="flex flex-col flex-wrap w-3/5 p-8 place-content-center mx-auto my-10">
      <div className="flex w-full flex-row flex-nowrap justify-between">
        <div>
          <CheckBox
            checked={uppercaseSelected}
            id="uppercaseOption"
            onChange={toggleOption}
          />
          <Label className={"ml-2"} text="A-Z" htmlFor="uppercaseOption" />
        </div>
        <div>
          <NumberAdjust
            min={minPasswordLength}
            max={maxPasswordLength}
            value={passwordLength}
            id="password-length-number"
            onChange={passwordLengthChanged}
            className={"w-12"}
          />
        </div>
      </div>
      <div className={"flex w-full flex-row flex-nowrap justify-between"}>
        <div>
          <CheckBox
            checked={lowercaseSelected}
            id="lowercaseOption"
            onChange={toggleOption}
          />
          <Label className={"ml-2"} text="a-z" htmlFor="lowercaseOption" />
        </div>
        <Slider
          min={minPasswordLength}
          max={maxPasswordLength}
          value={passwordLength}
          id="password-length-slider"
          onChange={passwordLengthChanged}
        />
      </div>
      <div className={"flex w-full flex-row flex-nowrap justify-between"}>
        <div>
          <CheckBox
            checked={digitsSelected}
            id="digitsOption"
            onChange={toggleOption}
          />
          <Label className={"ml-2"} text="0-9" htmlFor="digitsOption" />
        </div>
        <NumberAdjust
          min="1"
          max={passwordLength - minNumberOfLetters - numberOfSpecialChars}
          disabled={digitsSelected ? "" : "disabled"}
          value={numberOfDigits}
          id="digits-count"
          onChange={numberOfDigitsChanged}
          className={"w-12"}
        />
      </div>
      <div className={"flex w-full flex-row flex-nowrap justify-between"}>
        <div>
          <CheckBox
            checked={specialCharsSelected}
            id="specialCharOptions"
            onChange={toggleOption}
          />
          <Label
            className={"ml-2"}
            text="!@#$%^&*"
            htmlFor="specialCharOptions"
          />
        </div>
        <NumberAdjust
          min="0"
          max={passwordLength - minNumberOfLetters - numberOfDigits}
          disabled={specialCharsSelected ? "" : "disabled"}
          value={numberOfSpecialChars}
          id="spec-char-count"
          onChange={numberOfSpecialCharsChanged}
          className={"w-12"}
        />
      </div>
      <div
        className={
          "w-11/12 flex flex-row flex-nowrap justify-between mx-auto my-20 "
        }
      >
        
        <Button
          title="Copy to Clipboard"
          onClick={handleCopyBtnClick}
          disabled={passwordAlreadyGenerated ? "" : "disabled"}
          className={"w-3/12 min-h-8 rounded-2xl bg-violet-500 disabled:bg-violet-200 shadow text-sm disabled:text-slate-100 "}
        />
        <Button
          title={
            passwordAlreadyGenerated
              ? "Regenerate Password"
              : "Generate Password"
          }
          onClick={generatePassword}
          className={"w-4/12 min-h-8 rounded-2xl bg-violet-500 shadow text-sm"}
        />
        <Button
          title="Clear Password"
          onClick={clearGeneratedPassword}
          disabled={passwordAlreadyGenerated ? "" : "disabled"}
          className={"w-3/12 min-h-8 rounded-2xl bg-violet-500 shadow text-sm  disabled:bg-violet-200 disabled:text-slate-100"}
        />
      </div>
      <TextBox
        id="generatedPassword"
        defaultValue={password}
        readOnly="readonly"
        className={
          "w-8/12 h-10 my-0 mx-auto rounded border-solid border-violet-200 border-2 shadow"
        }
      />

      <br />
    </form>
  );
}
