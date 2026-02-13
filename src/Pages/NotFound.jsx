import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">

        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-primary">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-text-primary">
          Page not found
        </h2>

        {/* Description */}
        <p className="mt-2 text-text-secondary">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
