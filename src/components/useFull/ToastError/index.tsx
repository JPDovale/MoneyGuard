import { Toast } from '../Toast';

interface IToastErrorProps {
  error: {
    title: string;
    message: string;
  } | null;
  setError: (
    newState: {
      title: string;
      message: string;
    } | null,
  ) => void;
}

export function ToastError({ error, setError }: IToastErrorProps) {
  return (
    <>
      {error?.title !== 'Invalid token!' && (
        <Toast
          title={error?.title!}
          message={error?.message!}
          open={!!error}
          setOpen={() => setError(null)}
          type="error"
        />
      )}
    </>
  );
}
