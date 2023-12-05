import { useEffect, useState } from "react";
import { TextField, AddressField } from "../../components";
import { Acceptor, TextFieldType } from "../../types/TextFieldTypes";
import "./index.style.scss";

const whitespaceAcceptor: Acceptor = {
  rule: /\s/,
  match: false,
  message: "공백문자는 포함할 수 없습니다.",
};

const requireAcceptor: Acceptor = {
  rule: /.+/,
  match: true,
  message: "필수 입력 항목입니다.",
};

const startNumberAcceptor: Acceptor = {
  rule: /^\d/,
  match: false,
  message: "숫자로 시작하는 아이디는 사용할 수 없습니다.",
};

const minLengthAcceptor = (limit: number): Acceptor => ({
  rule: new RegExp(`(.){${limit}}`),
  match: true,
  message: `최소한 ${limit}글자 이상 이어야 합니다.`,
});

const textFieldList: TextFieldType[] = [
  {
    title: "이름",
    id: "name",
    type: "text",
    placeholder: "이름을 입력해주세요.",
    acceptors: [whitespaceAcceptor, requireAcceptor, startNumberAcceptor],
  },
  {
    title: "아이디",
    id: "id",
    type: "text",
    placeholder: "아이디를 입력해주세요.",
    acceptors: [whitespaceAcceptor, requireAcceptor, startNumberAcceptor, minLengthAcceptor(5)],
  },
  {
    title: "이메일",
    id: "email",
    type: "email",
    placeholder: "이메일을 입력해주세요.",
    acceptors: [whitespaceAcceptor, requireAcceptor],
  },
  {
    title: "비밀번호",
    id: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    acceptors: [requireAcceptor],
  },
];

const AllIsValid = [
  {
    id: "name",
    isPass: false,
  },
  {
    id: "id",
    isPass: false,
  },
  {
    id: "email",
    isPass: false,
  },
  {
    id: "password",
    isPass: false,
  },
];

const SignInPage: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {}, [AllIsValid]);

  const handleValidationResult = (id: string, isValid: boolean) => {
    AllIsValid.map((valid) => {
      if (valid.id === id) {
        valid.isPass = isValid;
      }
    });

    if (AllIsValid.filter((valid) => valid.isPass === true).length === 4) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const arr: Array<[string, string]> = [];

    formData.forEach((value: FormDataEntryValue, key: string) => {
      arr.push([key, value.toString()]);
    });

    let id = "";

    const result = arr.reduce((acc, [key, value]) => {
      if (key === "id") {
        id = value;
      }
      return (acc = {
        [key]: value,
        ...acc,
      });
    }, {});

    localStorage.setItem(id, JSON.stringify(result));
  };

  return (
    <div className="SignInPage">
      <form className="sign-in-form" onSubmit={(e) => formSubmitHandler(e)}>
        {textFieldList.map((textField) => (
          <TextField
            key={textField.id}
            data={textField}
            handleValidationResult={handleValidationResult}
          />
        ))}
        <p>선택 입력사항</p>
        <AddressField />
        <div className="btn-wrapper">
          <button
            className={`btn-join ${!disabled ? "default-bg" : "active-bg"}`}
            type="submit"
            disabled={!disabled}
          >
            회원 가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
