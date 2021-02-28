import React from 'react';
import * as El from './styles';

interface IProps extends React.HTMLProps<HTMLElement> {
  iconUri?: string;
  iconHeight?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IProps> = (props: IProps) => {
  const { iconUri, children, style, iconHeight, disabled } = props;
  const finalStyle = disabled ? { opacity: '60%', ...style } : style;

  if (iconUri && !children) {
    return (
      <El.CircularOuterContainer
        style={finalStyle}
        onClick={!disabled ? props.onClick : undefined}>
        <El.Icon
          src={iconUri}
          style={iconHeight ? { height: iconHeight } : undefined}
        />
      </El.CircularOuterContainer>
    );
  } else {
    return (
      <El.OuterContainer
        style={finalStyle}
        onClick={!disabled ? props.onClick : undefined}>
        {iconUri && (
          <El.Icon
            src={iconUri}
            style={iconHeight ? { height: iconHeight } : undefined}
          />
        )}
        {iconUri && children && <El.Separator />}
        {children && <El.Text>{children}</El.Text>}
      </El.OuterContainer>
    );
  }
};

export default Button;
