import { useEffect, useRef, useState } from "react";
import { Acceptor, TextFieldProps } from "../types/TextFieldTypes";
import { classAddAndRemove } from "../utils";
import "./TextField.scss";

const TextField: React.FC<TextFieldProps> = ({ data }) => {
  const [inputValue, setInputValue] = useState(data.text);
  const [acceptors, setAcceptors] = useState(data.acceptors);
  const [failMessage, setFailMessage] = useState("");

  const checker = useRef<HTMLSpanElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      tester(inputValue);
    } else {
      if (checker.current?.classList.contains("accept")) {
        classAddAndRemove(checker.current, "default", "accept");
      }
    }
  }, [inputValue]);

  const tester = (value: string) => {
    const result = isAccept(acceptors, value);

    if (result) {
      setFailMessage(result);
      if (checker.current?.classList.contains("accept")) {
        classAddAndRemove(checker.current, "default", "accept");
        classAddAndRemove(textInput.current, "fail-bg", "default-bg");
      } else {
        checker.current?.classList.add("default");
        textInput.current?.classList.add("fail-bg");
      }
    } else {
      setFailMessage("");
      if (checker.current?.classList.contains("default")) {
        classAddAndRemove(checker.current, "accept", "default");
        classAddAndRemove(textInput.current, "default-bg", "fail-bg");
      } else {
        checker.current?.classList.add("accept");
        textInput.current?.classList.add("default-bg");
      }
    }
  };

  const isAccept = (acceptors: Acceptor[], value: string) => {
    const result = acceptors.filter((acceptor) => acceptor.rule.test(value) !== acceptor.match);
    return result.length > 0 ? result[0].message : null;
  };

  return (
    <div className="TextField">
      <div className="label-wrapper">
        <span className="checker default" ref={checker}>
          <svg className="" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <label htmlFor="name">{data.title}</label>
      </div>
      <input
        type={data.type}
        id={data.id}
        name={data.id}
        placeholder={data.placeholder}
        className="default-bg"
        ref={textInput}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="fail-message">{failMessage}</p>
    </div>
  );
};

export default TextField;
