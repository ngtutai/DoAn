import React, { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
  id: string;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  label: string;
  row?: number;
  showTogglePassword?: boolean; // cho phép ẩn/hiện mật khẩu
}
interface State {
  showPassword: boolean;
}

class Input extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  render() {
    const {
      id,
      inputRef,
      label,
      className,
      row = 1,
      showTogglePassword,
      type,
      ...others
    } = this.props;
    const inputClass = `form-control text-start ${className ? className : ""}`;
    const inputType = showTogglePassword
      ? this.state.showPassword
        ? "text"
        : "password"
      : type;

    return (
      <>
        <label htmlFor={id} style={{ color: "dark", float: "right" }}>
          {label}
        </label>

        {row > 1 ? (
          <textarea
            ref={inputRef as React.Ref<HTMLTextAreaElement>}
            id={id}
            rows={row}
            {...(others as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={inputClass}
          />
        ) : (
          <>
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              id={id}
              {...others}
              type={inputType}
              className={inputClass}
            />
            {showTogglePassword && (
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={this.togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={this.state.showPassword ? faEye : faEyeSlash}
                />
              </span>
            )}
          </>
        )}
      </>
    );
  }
}

export default Input;
