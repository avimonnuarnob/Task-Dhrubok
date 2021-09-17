import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <p>{counter}</p>
      <div className="flex gap-2 justify-center items-center">
        <span>👉</span>
        <button
          className="border-gray-500 border p-2"
          onClick={() => setCounter((prevCount) => prevCount + 1)}
        >
          +
        </button>
        <span>👈</span>
      </div>
    </div>
  );
};

export default Counter;
