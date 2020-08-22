import { useEffect } from "react";
import { useFetch } from "./useFetch";

export const useSpotifyApis = (
  url,
  options = {
    headers: {}
  }
) => {
  const authToken = `Bearer `;
  options["headers"]["Authorization"] =
    options["headers"]["Authorization"] || authToken;
  return useFetch(url, options);
};
