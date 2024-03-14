import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeToken } from "../store/token";

export default function useLogout() {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(removeToken())
  }, []);
  return logout;
}