import { QueryClient, useMutation, useQueryClient } from "react-query";
import { request } from "./request";

export function useSetCurrentUserMutation() {
  function mutate({ userName: username }: { userName: string }) {
    return request("/users/set_current_user", {
      method: "post",
      data: {
        username,
      },
    });
  }
  return useMutation(mutate, {
    onSuccess: ({ data }) => {
      console.log("login success", data);
    },
  });
}
