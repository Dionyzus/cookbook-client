import { useState, useEffect } from "react";

function calculateRange(data, length, rowsPerPage) {
  const range = [];

  let totalNumberOfElements;
  if (length) {
    totalNumberOfElements = length;
  } else {
    totalNumberOfElements = data.length;
  }

  const num = Math.ceil(totalNumberOfElements / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
}

function sliceData(data, page, rowsPerPage) {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}

function useTable(data, page, total, rowsPerPage) {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, total, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage, total]);

  return { slice, range: tableRange };
}

export default useTable;
