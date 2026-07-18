import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchHero } from "./homeReducer";

export const useHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => (state as any).home || { data: null, loading: false, error: null });

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
  };
};
