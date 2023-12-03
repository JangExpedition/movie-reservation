import AddressField from "../../components/AddressField";
import TextField from "../../components/TextField";
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

const SignInPage: React.FC = () => {
  const textFieldList: TextFieldType[] = [
    {
      title: "이름",
      text: "",
      id: "name",
      type: "text",
      placeholder: "이름을 입력해주세요.",
      acceptors: [whitespaceAcceptor, requireAcceptor, startNumberAcceptor],
    },
    {
      title: "아이디",
      text: "",
      id: "id",
      type: "text",
      placeholder: "아이디를 입력해주세요.",
      acceptors: [whitespaceAcceptor, requireAcceptor, startNumberAcceptor, minLengthAcceptor(5)],
    },
    {
      title: "이메일",
      text: "",
      id: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요.",
      acceptors: [whitespaceAcceptor, requireAcceptor],
    },
    {
      title: "비밀번호",
      text: "",
      id: "password",
      type: "password",
      placeholder: "비밀번호를 입력해주세요.",
      acceptors: [whitespaceAcceptor, requireAcceptor, minLengthAcceptor(5)],
    },
  ];
  return (
    <div className="SignInPage">
      <form className="sign-in-form">
        {textFieldList.map((textField) => (
          <TextField key={textField.id} data={textField} />
        ))}
        <p>선택 입력사항</p>
        <AddressField />
        <div className="btn-wrapper">
          <button className="btn-join" type="submit">
            회원 가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
