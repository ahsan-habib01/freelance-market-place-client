import { Link, useRouteError } from 'react-router';
import { AlertTriangle } from 'lucide-react';

const Error = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-gray-900 text-white text-center p-6">
      <AlertTriangle className="w-20 h-20 text-yellow-400 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong.</h1>
      <p className="text-lg mb-6">
        {error?.statusText || error?.message || 'Page not found.'}
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
      >
        Go Back Home
      </Link>

      <p className="mt-8 text-sm text-gray-300">
        © {new Date().getFullYear()} Freelify — Empowering Freelancers
      </p>
    </div>
  );
};

export default Error;
