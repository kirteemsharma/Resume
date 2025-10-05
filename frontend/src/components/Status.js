import React, { useEffect, useState } from "react";

const Status = () => {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/status`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("API unreachable"));
  }, []);

  return (
    <div>
      <h2>API Status: {status}</h2>
    </div>
  );
};

export default Status;
