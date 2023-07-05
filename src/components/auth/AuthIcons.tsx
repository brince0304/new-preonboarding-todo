import { Dispatch, SetStateAction } from 'react';
import { Tooltip } from '@mui/material';
export const ErrorIcon = () => {
  return (
    <img
      src={require('../../assets/images/banana-cat-cries-sad-cat.gif')}
      alt="error-icon"
      width="30px"
      height="30px"
    />
  );
};

export const SuccessIcon = () => {
  return (
    <img src={require('../../assets/images/bananacat-heart.webp')} alt="success-icon" width="30px" height="30px" />
  );
};

export const LoadingIcon = () => {
  return (
    <img src={require('../../assets/images/apple-cat-running.gif')} alt="loading-icon" width="30px" height="30px" />
  );
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
