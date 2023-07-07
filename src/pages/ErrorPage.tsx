import { ErrorIcon } from 'components/common/Icon';

const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorIcon height="100px" width="100px" />
      <h1>404 Not Found</h1>
    </div>
  );
};

export default Error;
