import instance from "../configs/axios.config";

interface IStateParams {
  filter: Record<string, number>;
  filter_like: Record<string, string>;
  item: Record<string, Record<string, number | string>>;
  perPage: number;
  currentPage: number;
}

type TypeGetAll = <T>({
  url,
  urlParams,
  _params,
}: {
  url: string;
  urlParams?: IStateParams;
  _params?: Record<string | number, any>;
}) => Promise<T>;

const getAll: TypeGetAll = async ({ url, urlParams, _params }) => {
  let params: Record<string | number, any> = {};

  if (urlParams) {
    const { perPage, currentPage, filter, filter_like } = urlParams;
    params = {
      filter: JSON.stringify(filter),
      "filter-like": JSON.stringify(filter_like),
      "per-page": perPage,
      page: currentPage,
      ..._params,
    };
  } else {
    params = { ..._params };
  }

  const response = await instance({ url, method: "GET", params });

  return response.data;
};

type TypeGetOne = <T>({
  url,
  _params,
}: {
  url: string;
  _params?: Record<string | number, any>;
}) => Promise<T>;

const getOne: TypeGetOne = async ({ url, _params }) => {
  const response = await instance({ url, method: "GET", params: _params });
  const data = await response.data;
  return data;
};
export const CLIENT_API = {
  getAll,
  getOne,
};
