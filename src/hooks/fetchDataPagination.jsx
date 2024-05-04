import { useState, useEffect } from "react";
// Thêm 1 dependency trong trường hợp sau khi xoá 1 item
// Fetch lại dữ liệu đã được update
export function useFetchPage(route, pageNum, subDependency) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async function () {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/${route}?page=${page}&pageNum=${pageNum}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const resData = await response.json();
        setData(resData);
        // setData(Object.keys(resData).map((key) => resData[key]));
      } catch (err) {
        setErr({ message: err.message || "not found" });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page, subDependency]);
  return { data, isLoading, err, page, setPage };
}
