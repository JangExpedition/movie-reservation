import TextField from "../../components/TextField";
import "../../styles/SignInPage.scss";

import React, { useEffect, useState } from "react";

const SignInPage = () => {
  return (
    <div className="SignInPage">
      <div className="sign-in-container">
        <div className="sign-in-form-wrapper">
          <form className="sign-in-form">
            <p className="required-title">씨집이 회원가입 필수 항목</p>
            <div>
              <TextField
                {...{
                  id: "name",
                  label: "이름",
                  type: "text",
                  placeholder: "이름을 입력해주세요",
                  require: true,
                }}
              />
            </div>
            <p className="additional">씨집이 회원가입 선택 항목</p>
            <div></div>
            <div className="button-wrapper">
              <button className="btn-join" type="submit">
                회원 가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
