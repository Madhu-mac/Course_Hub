import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userEmailState = selector({
  key: 'userEmailState',
  get: ({ get }) => {
    const user = get(userState);

    return user.email; 
  },
});
