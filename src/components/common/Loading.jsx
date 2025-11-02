import { useTheme } from "../../context/ThemeContext";

const Loading = ({ type = "skeleton" }) => {
  const { isDark } = useTheme();

  if (type === "skeleton") {
    return (
      <div className="w-full animate-pulse">
        {/* Desktop Skeleton */}
        <div className="hidden md:block w-full overflow-x-auto">
          <div
            className={`border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } rounded-lg`}
          >
            <div className="divide-y divide-gray-200">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center p-4 space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  />
                  <div className="flex-1 space-y-2">
                    <div
                      className={`h-4 ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      } rounded w-1/4`}
                    />
                    <div
                      className={`h-3 ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      } rounded w-1/6`}
                    />
                  </div>
                  <div
                    className={`h-4 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    } rounded w-1/6`}
                  />
                  <div
                    className={`h-4 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    } rounded w-1/6`}
                  />
                  <div
                    className={`h-4 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    } rounded w-1/6`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Skeleton */}
        <div className="md:hidden space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  />
                  <div className="space-y-2">
                    <div
                      className={`h-4 w-24 rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`h-3 w-16 rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    />
                  </div>
                </div>
                <div
                  className={`h-4 w-8 rounded ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <div
                      className={`h-3 w-16 rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    />
                    <div
                      className={`h-3 w-24 rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className="spinner w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
