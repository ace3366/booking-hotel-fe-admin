import { useState, useEffect } from "react";

export function useFetchData(route) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();

  useEffect(() => {
    const fetchData = async function () {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/${route}`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const resData = await response.json();
        setData(Object.keys(resData).map((key) => resData[key]));
      } catch (err) {
        setErr({ message: err.message || "not found" });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return { data, isLoading, err };
}
