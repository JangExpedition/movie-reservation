import { Acceptor } from "../types/TextFieldTypes";

export const WhitespaceAcceptor: Acceptor = {
  rule: /\s/,
  match: false,
  message: "공백문자는 포함할 수 없습니다.",
};

export const RequireAcceptor: Acceptor = {
  rule: /.+/,
  match: true,
  message: "필수 입력 항목입니다.",
};

export const StartNumberAcceptor: Acceptor = {
  rule: /^\d/,
  match: false,
  message: "숫자로 시작하는 아이디는 사용할 수 없습니다.",
};

export const ContainNumberAcceptor: Acceptor = {
  rule: /\d/,
  match: false,
  message: "숫자는 포함할 수 없습니다.",
};

export const MinLengthAcceptor = (limit: number): Acceptor => ({
  rule: new RegExp(`(.){${limit}}`),
  match: true,
  message: `최소한 ${limit}글자 이상 이어야 합니다.`,
});

export const EmailAcceptor: Acceptor = {
  rule: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/,
  match: true,
  message: "이메일 형식에 어긋납니다.",
};

export const classAddAndRemove = (
  ref: HTMLElement | null,
  addClass: string,
  removeClass: string
) => {
  if (ref) {
    ref.classList.add(`${addClass}`);
    ref.classList.remove(`${removeClass}`);
  }
};
