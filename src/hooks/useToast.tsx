import { Alert, Snackbar } from '@mui/material';
import { ReactNode, useState } from 'react';

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
  return (
    <Snackbar open={props.open} autoHideDuration={props.autoHideDuration} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity={props.severity} sx={props.sx}>
        {props.children}
      </Alert>
    </Snackbar>
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
