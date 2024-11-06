import { SchoolType } from "@/types/schoolType";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  country: string | null;
  region: string | null;
};

export function useGetSchool({ country, region }: Props) {
  return useInfiniteQuery({
    queryKey: ["school"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/getSchool?country=${country}&region=${region}&page=${pageParam}`,
      );

      if (!response.ok) {
        throw new Error("GET SCHOOL ERROR");
      }

      return response.json();
    },
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage: SchoolType[], _, lastPageParam: number) => {
      if (lastPage.length !== 12) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
}
