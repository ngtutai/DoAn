import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
  id: string;
  inputRef?: any;
  label: string;
  rows?: number;
  showTogglePassword?: boolean; // cho phép ẩn/hiện mật khẩu
}

interface State {
  showPassword: boolean;
}

class Input extends React.Component<Props> {
  render() {
    const {
      inputRef,
      id,
      label,
      className,
      rows = 1,
      showTogglePassword,
      type,
      ...others
    } = this.props;
    const inputClass = `form-control ${className ? className : ""}`;

    return (
      <>
        <label htmlFor={id} style={{ color: "dark", float: "left" }}>
          {label}
        </label>

        {rows > 1 ? (
          <textarea
            ref={inputRef}
            id={id}
            rows={rows}
            {...(others as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={inputClass}
          ></textarea>
        ) : (
          <input ref={inputRef} className={inputClass} id={id} {...others} />
        )}
      </>
    );
  }
}

export default Input;
