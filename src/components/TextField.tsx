import React, { useEffect, useRef } from "react";

import { useState } from "react";
import { ValidateRule } from "../types";
import {
  RequireRule,
  CantContainWhitespace,
  CantStartNumber,
  MinimumLengthLimit,
} from "../constant";
import { nextTick } from "../utils";
import { InputType } from "../types";

const DefaultProps: InputType = {
  id: "",
  label: "label",
  type: "text",
  placeholder: "",
  require: false,
};

const TextField = (props: InputType) => {
  const [data, setData] = useState({ ...DefaultProps, ...props });
  const [updated, setUpdated] = useState(false);
  const [validateRules, setValidateRules] = useState<ValidateRule[]>([]);
  const [valid, setValid] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");
  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.require) {
      addValidateRule(RequireRule);
    }

    if (data.id === "id") {
      addValidateRule(CantContainWhitespace);
      addValidateRule(CantStartNumber);
      addValidateRule(MinimumLengthLimit(3));
    } else if (data.id === "email") {
      addValidateRule(CantContainWhitespace);
    }
  }, [data]);

  const addValidateRule = (rule: ValidateRule) => {
    setValidateRules((prevState) => [...prevState, rule]);
  };

  const onChangeHandler = () => {
    const isInvalid: ValidateRule | null = validate();

    if (updated) {
      setValid(!isInvalid);
      setValidateMessage(!!isInvalid ? isInvalid.message : "");
    } else {
      setValid(true);
      setValidateMessage("");
    }
  };

  const validate = (): ValidateRule | null => {
    const target = textInput.current?.value ? textInput.current.value.trim() : "";
    console.log(target);
    const invalidateRules = validateRules.filter(
      (validateRule) => validateRule.rule.test(target) !== validateRule.match
    );

    return invalidateRules.length > 0 ? invalidateRules[0] : null;
  };

  return (
    <div id={`field-${data.id}`} className="TextField">
      <div className="label-wrapper">
        <span className="complete-checker">
          <svg
            className={`checker ${valid ? (updated ? "good" : "normal") : "normal"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <label className="text-label" htmlFor="name">
          {data.label}
        </label>
      </div>
      <input
        type={data.type}
        id={data.id}
        name={data.id}
        placeholder={data.placeholder}
        aria-label="Name"
        className="text-input"
        ref={textInput}
        onChange={() => {
          setUpdated(true);
          nextTick(onChangeHandler);
        }}
        {...(data.require ? { required: true } : {})}
      />
      {!valid && (
        <div className="label-wrapper">
          <label className="text-label bad" htmlFor="cus_email">
            {validateMessage}
          </label>
        </div>
      )}
    </div>
  );
};

export default TextField;
