import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";


import { CLIENT_API } from "../service/client.request";

const useGetData = <T = any>({
  queryKey,
  url,
  options,
  urlParams,                                 
}: {                                     
  queryKey: any[];
  url: string;
  options?: UseQueryOptions<T>;
  urlParams?: Record<string | number, any>;
}) => {
  const queryClient = useQueryClient();

  const response = useQuery<T>({
    queryKey,
    queryFn: () => CLIENT_API.getAll({ url, _params: urlParams }),
    ...options,
  });

  if (!response.data && !response.isLoading && !response.error) {
  queryClient.prefetchQuery(queryKey,() => CLIENT_API.getAll({ url, _params: urlParams }))
  }
  return { ...response };
};

export default useGetData;
