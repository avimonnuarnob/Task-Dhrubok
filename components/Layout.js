import React, { useState } from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="bg-gray-100 flex justify-between p-2">
        <p>avimonnuarnob@gmail.com</p>
        <p className="text-2xl">Avimonnu Arnob Dash</p>
        <p>+88 01708920355</p>
      </div>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-1 flex">
          <div className="border-r border-gray-400">
            <ul>
              {show ? (
                <>
                  <li
                    className="px-5 p-2 cursor-pointer"
                    onClick={() => setShow(false)}
                  >
                    <a>React 🔺</a>
                  </li>
                  <li className="px-5 p-2 mx-2">
                    <Link href="/counter">
                      <a>Counter</a>
                    </Link>
                  </li>
                  <li className="px-5 p-2 mx-2">
                    <Link href="/form">
                      <a>Form</a>
                    </Link>
                  </li>
                  <li className="px-5 p-2 mx-2">
                    <Link href="/list">
                      <a>List</a>
                    </Link>
                  </li>
                </>
              ) : (
                <li
                  className="px-5 p-2 cursor-pointer"
                  onClick={() => setShow(true)}
                >
                  <a>React 🔻</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="col-span-11">{children}</div>
      </div>
      <div className="bg-gray-100 flex justify-between p-2">
        <p>Bangladesh University of Professionals</p>
        <p>Information & Communication Engineering</p>
        <p>2020</p>
      </div>
    </>
  );
};

export default Layout;
