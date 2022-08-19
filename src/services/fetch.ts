import { request } from "./request";

/**
 * 不应该直接调用
 * 仅用于code-gen 生成graphql请求
 */
export function codeGenFetch<TData, TVariables>(
  query: string,
  variables?: TVariables
): () => Promise<TData> {
  return async () => {
    const res = await request("graphql/", {
      method: "POST",
      data: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json",
      },
      simpleResponse: false,
      timeoutErrorMessage: "请求超时！",
    });
    const json = res.data;
    if (json?.errors) {
      const message = json.errors
        ? json.errors[0].message
        : "GraphQL fetching error";
      throw new Error(message);
    }
    return json?.data as TData;
  };
}
