import { useErrorHandler } from './hooks/useErrorHandler';
import '@picocss/pico';
const ErrorPage = () => {
  const { error } = useErrorHandler();
  return (
    <div className='error' style={{alignItems:'center'}}>
      <>   
        <h1>
          {error?.status || '404'}
        </h1>
        <p>
          {error?.message || 'What you were looking for could not be found, sorry 😞'}
        </p>
        <button onClick={window.open('/', '_self')} title={`Go back`}>
          {'Go back'}
        </button>
        </>  
    </div>
  )
}
export default ErrorPage