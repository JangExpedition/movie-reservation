import { useRef, useState } from "react";
import { Acceptor, TextFieldProps } from "../types/TextFieldTypes";
import { FailMessage } from "./index";
import { classAddAndRemove } from "../utils";
import "./TextField.style.scss";

const TextField: React.FC<TextFieldProps> = ({ data, handleValidationResult }) => {
  const [strongLevel, setStrongLevel] = useState(0);
  const [failMessage, setFailMessage] = useState("");

  const checker = useRef<HTMLSpanElement>(null);
  const textInput = useRef<HTMLInputElement>(null);

  const tester = (value: string) => {
    if (data.type === "password") {
      const result = strongLevelTester(value);
      if (result > 0) {
        successImpact();
      } else {
        failImpact();
        setFailMessage(data.acceptors[0].message);
      }
    } else {
      const result = isAccept(data.acceptors, value);
      if (result) {
        setFailMessage(result);
        if (checker.current?.classList.contains("accept")) {
          failImpact();
        } else {
          checker.current?.classList.add("default");
          textInput.current?.classList.add("fail-bg");
        }
      } else {
        setFailMessage("");
        if (checker.current?.classList.contains("default")) {
          successImpact();
        } else {
          checker.current?.classList.add("accept");
          textInput.current?.classList.add("default-bg");
        }
      }
    }
  };

  const successImpact = () => {
    classAddAndRemove(checker.current, "accept", "default");
    classAddAndRemove(textInput.current, "default-bg", "fail-bg");
    handleValidationResult(true);
  };

  const failImpact = () => {
    classAddAndRemove(checker.current, "default", "accept");
    classAddAndRemove(textInput.current, "fail-bg", "default-bg");
    handleValidationResult(false);
  };

  const isAccept = (acceptors: Acceptor[], value: string) => {
    const result = acceptors.filter((acceptor) => acceptor.rule.test(value) !== acceptor.match);
    return result.length > 0 ? result[0].message : null;
  };

  const strongLevelTester = (value: string): number => {
    let level = 0;

    if (value.length > 0) {
      level++;
    }

    if (value.length > 8) {
      level++;
    }

    if (/[!@#$%^&*()]/.test(value)) {
      level++;
    }

    if (/\d/.test(value)) {
      level++;
    }

    setStrongLevel(level);
    return level;
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
        onBlur={(e) => tester(e.target.value)}
      />
      <FailMessage failMessage={failMessage} strongLevel={strongLevel} />
    </div>
  );
};

export default TextField;
