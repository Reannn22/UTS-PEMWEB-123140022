const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card text-center p-6">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{message}</h3>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="refresh-button mt-4"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
