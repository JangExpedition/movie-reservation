export type Acceptor = {
  rule: RegExp;
  match: boolean;
  message: string;
};

export type TextFieldType = {
  title: string;
  text: string;
  id: string;
  type: string;
  placeholder: string;
  acceptors: Acceptor[];
};

export type TextFieldProps = {
  data: TextFieldType;
};
