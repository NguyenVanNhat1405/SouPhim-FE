import React from 'react';
import { createRoot } from 'react-dom/client'; // Sửa từ react-dom sang react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './Context/Context';

// Sử dụng createRoot thay vì ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ContextProvider>
      <App>
        
      </App>

    </ContextProvider>
  </React.StrictMode>
);

// Nếu bạn muốn bắt đầu đo lường hiệu suất trong ứng dụng của bạn, hãy truyền một hàm
// để ghi nhận kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một điểm cuối phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
