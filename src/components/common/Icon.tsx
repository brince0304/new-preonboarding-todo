import { Dispatch, HTMLProps, SetStateAction } from 'react';
import { Tooltip } from '@mui/material';

export const ErrorIcon = (props: IIconProps) => {
  return <img src={require('../../assets/images/banana-cat-cries-sad-cat.gif')} alt="error-icon" {...props} />;
};

export const HappyCatIcon = (props: IIconProps) => {
  return <img src={require('../../assets/images/fast-cat-cat-excited.gif')} alt="happy-cat-icon" {...props} />;
};

export const SuccessIcon = (props: IIconProps) => {
  return <img src={require('../../assets/images/bananacat-heart.webp')} alt="success-icon" {...props} />;
};

export const LoadingIcon = (props: IIconProps) => {
  return <img src={require('../../assets/images/apple-cat-running.gif')} alt="loading-icon" {...props} />;
};

export const Icon = (props: IIconProps) => {
  return <img src={require('../../assets/images/apple-cat-standing.png')} alt="standing-icon" {...props} />;
};

export const HideIcon = (props: { isHide: boolean; setIsHide: Dispatch<SetStateAction<boolean>> }) => {
  const handleHideToggle = () => {
    props.setIsHide(!props.isHide);
  };
  return (
    <Tooltip title={props.isHide ? '비밀번호 숨기기' : '비밀번호 보이기'} arrow>
      <img
        onClick={handleHideToggle}
        style={{ cursor: 'pointer' }}
        src={props.isHide ? require('../../assets/images/Popcat.png') : require('../../assets/images/Popcat Fire.png')}
        alt="hide-icon"
        width="30px"
        height="30px"
      />
    </Tooltip>
  );
};

interface IIconProps extends Omit<HTMLProps<HTMLImageElement>, 'src, alt'> {
  width?: string;
  height?: string;
}
