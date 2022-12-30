import { useState, useEffect } from "react";

const useFetch = (url, method, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const tokenInfor = token ? token : null;

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await (method
        ? fetch(url, {
            method: method,
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
            },
            body: JSON.stringify(query),
          })
        : fetch(url, {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
            },
          }));

      const body = await response.json();

      if (!response.ok) {
        setError("Something wwrong!");
        throw new Error("Something wwrong!");
      } else {
        setData(body);
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;
