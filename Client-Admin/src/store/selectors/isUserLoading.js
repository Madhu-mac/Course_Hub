import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserLoading = selector({
  key:'userLoadingState',
  get: ({get}) =>{
    const state = get(userState)

    return state.isLoading;
  }
})