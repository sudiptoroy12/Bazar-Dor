
export const SignupSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Input skeletons */}
      {[1, 2, 3, 4].map((item) => (
        <div key={item}>
          <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
          <div className="h-11 w-full rounded-lg bg-gray-200" />
        </div>
      ))}

      {/* Submit button skeleton */}
      <div className="h-11 w-full rounded-lg bg-green-100" />

      {/* Divider skeleton */}
      <div className="flex items-center gap-4 py-1">
        <div className="h-px flex-1 bg-gray-200" />
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social button skeletons */}
      <div className="grid grid-cols-2 gap-3">
        <div className="h-10 rounded-lg bg-gray-200" />
        <div className="h-10 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
