import { Skeleton } from "../ui/skeleton";

const SkeletonTest = () => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-600" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
};

export default SkeletonTest;
