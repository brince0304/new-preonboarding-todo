import { Alert, Snackbar } from '@mui/material';
import { Fragment, ReactNode, useState } from 'react';

const useToast = (props: IUseToastProps) => {
  const [open, setOpen] = useState(false);
  const handleOpenToast = () => {
    setOpen(true);
  };
  const handleCloseToast = () => {
    setOpen(false);
  };
  const toast = <Toast {...props} open={open} onClose={handleCloseToast} />;
  return { toast, handleOpenToast, handleCloseToast, open };
};

const Toast = (props: IToastProps) => {
  const toastStyle = {
    borderRadius: '0',
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
    border: '2px solid #565656',
  };
  return (
    <Fragment>
      <Snackbar open={props.open} autoHideDuration={props.autoHideDuration} onClose={props.onClose}>
        <Alert onClose={props.onClose} severity={props.severity} sx={{ ...toastStyle, ...props.sx }}>
          {props.children}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

interface IToastProps {
  open: boolean;
  autoHideDuration: number;
  onClose: () => void;
  severity: 'success' | 'error' | 'info' | 'warning';
  sx: any;
  children: ReactNode;
}

export interface IUseToastProps extends Omit<IToastProps, 'open' | 'onClose'> {}

export default useToast;
