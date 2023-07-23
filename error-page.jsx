import { useErrorHandler } from './hooks/useErrorHandler';
const ErrorPage = () => {
  const { error } = useErrorHandler();
  return (
    <div>
      <h1>
        {error?.status || 'Error'}
      </h1>
      <p>
        {error?.message || 'An error occurred'}
      </p>
    </div>
  )
}
export default ErrorPage