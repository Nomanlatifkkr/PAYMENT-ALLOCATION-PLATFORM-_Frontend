import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left column – brand / illustration */}
      <div className="hidden lg:flex flex-col justify-between bg-surface/30 p-12 border-r border-border">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            SplitEdge
          </h1>
          <p className="text-text-secondary mt-2">
            Intelligent payment allocation for modern businesses
          </p>
        </div>

        <div className="flex flex-col items-start gap-6">
          <div className="w-full max-w-md">
            <div className="text-primary-light">
              <svg
                className="w-24 h-24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <blockquote className="text-lg italic text-text-secondary">
            "We moved from manual spreadsheets to SplitEdge – now our revenue splits are instant and error-free."
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20" />
            <div>
              <p className="font-medium">Alex Rivera</p>
              <p className="text-sm text-text-tertiary">CFO, SaaSFlow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right column – form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <h2 className="text-2xl font-bold text-primary">SplitEdge</h2>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
