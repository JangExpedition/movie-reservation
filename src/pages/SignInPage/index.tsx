import { useState } from "react";
import "./index.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { FailMessage } from "../../components";

type UserData = {
  id: string;
  password: string;
};

const defaultData: UserData = {
  id: "",
  password: "",
};

const SignInPage = () => {
  const [userData, setUserData] = useState<UserData>(defaultData);
  const [failMessage, setFailMessage] = useState("");

  const navigate = useNavigate();

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();

    const id = userData.id;
    const password = userData.password;

    if (id === "" || password === "") {
      setFailMessage("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }

    const stringUser = localStorage.getItem(id);

    if (stringUser) {
      const user = JSON.parse(stringUser);

      if (user.id === id && user.password === password) {
        setFailMessage("");
        navigate("/main-page");
      }
    }

    setFailMessage("아이디 또는 비밀번호를 확인할 수 없습니다.");
    return;
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="SignInPage">
      <div className="sign-in-container">
        <div className="main-image-wrapper"></div>
        <div className="sign-in-wrapper">
          <h1 className="main-title">씨집이</h1>
          <form className="sign-in-form" onSubmit={signIn}>
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={(e) => inputHandler(e)}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="**********"
              onChange={(e) => inputHandler(e)}
            />
            <FailMessage failMessage={failMessage} strongLevel={0} />
            <button type="submit">로그인</button>
          </form>
          <Link to={"/sign-up"}>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
