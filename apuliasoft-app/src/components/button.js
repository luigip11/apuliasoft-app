import PropTypes from "prop-types";
import { useEffect } from "react";
import "./button.css";

export const Button = ({
  id,
  aspect,
  size,
  label,
  onlyIcon,
  isLoading,
  onClick,
  children,
  disabled,
  active,
  dropdownIcon,
  ...props
}) => {
  const mode = `button--${aspect}`;
  const onlyIconClass = onlyIcon ? `button--only-icon` : null;
  const loading = isLoading ? "button--is-loading" : "";

  useEffect(() => {
    /* ripple */
    [].map.call(document.querySelectorAll('[anim="ripple"]'), (el) => {
      el.addEventListener("click", (e) => {
        e = e.touches ? e.touches[0] : e;
        const r = el.getBoundingClientRect(),
          d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
        // eslint-disable-next-line no-unused-vars
        el.style.cssText = `--s: 0; --o: 1;`;
        let pos = el.offsetTop;
        el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
          e.clientX - r.left
        }; --y:${e.clientY - r.top};`;
      });
    });
  }, [onClick]);

  const removeFocus = () => {
    document.activeElement.blur();
  };

  return (
    <>
      <button
        id={id || "button"}
        type="button"
        className={[
          "button",
          `button--${size}`,
          mode,
          loading,
          onlyIconClass,
          active ? "active" : "disabled",
        ].join(" ")}
        anim="ripple"
        {...props}
        disabled={disabled}
        onClick={(e) => {
          if (onClick !== undefined && !isLoading) {
            onClick && onClick(e);
          }
          removeFocus();
        }}
      >
        {!isLoading ? (
          <>
            <span className="label">
              {children} {label && <span className="text">{label}</span>}
            </span>
            {dropdownIcon && (
              <div className="dropdown-icon-button">{dropdownIcon}</div>
            )}
          </>
        ) : (
          <span className="loading-spinner"></span>
        )}
      </button>
    </>
  );
};

Button.propTypes = {
  aspect: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "ghost",
    "danger",
  ]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["regular", "small"]),
  /**
   * Button icons.
   */
  onlyIcon: PropTypes.bool,
  /**
   * Button contents.
   */
  label: PropTypes.string,
  /**
   * Active state of button.
   */
  active: PropTypes.bool,
  /**
   * Optional click handler.
   */
  onClick: PropTypes.func,
};
