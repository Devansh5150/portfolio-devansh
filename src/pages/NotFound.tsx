import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: '404 — Page Not Found | Devansh Datta',
    description: 'The page you requested does not exist. Return to Devansh Datta\'s portfolio.',
    noindex: true,
  });

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center px-6">
        <p className="text-8xl font-black mb-6 text-cyan-400">404</p>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
