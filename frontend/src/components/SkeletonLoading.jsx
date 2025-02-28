const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-4 border border-gray-300 rounded-lg"
        >
          <div className="bg-gray-300 h-40 w-full rounded"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
