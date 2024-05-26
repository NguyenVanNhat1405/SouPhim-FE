import React, { createContext } from "react";
import all_img from "../Components/Assets/all_img.js";

export const Context = createContext([]);

const ContextProvider = (props) => {
  // Xử lý dữ liệu trước khi cung cấp cho createContext
  const processedData = processImageData(all_img);

  return (
    <Context.Provider value={processedData}>
      {props.children}
    </Context.Provider>
  );
};

// Hàm xử lý dữ liệu hình ảnh trước khi cung cấp cho createContext
const processImageData = (data) => {
  // Xử lý dữ liệu ở đây nếu cần thiết
  // Ví dụ: kiểm tra tính đồng nhất của dữ liệu, xử lý lỗi, ...

  return data;
};

export default ContextProvider;
