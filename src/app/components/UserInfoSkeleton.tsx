

const UserInfoSkeleton = () => {
     return (
    <div className="absolute right-4 top-3 z-50 flex items-center gap-3">
      {/* Avatar skeleton */}
      <div className="h-11 w-11 animate-pulse rounded-full bg-neutral-200" />

      {/* Name skeleton */}
      <div className="hidden space-y-2 sm:block">
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  );
};

export default UserInfoSkeleton;