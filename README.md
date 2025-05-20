Một ứng dụng quản lý công việc đơn giản được xây dựng bằng React, Redux Toolkit, Tailwind CSS và tích hợp chức năng kéo thả bằng `@dnd-kit`. Ứng dụng hỗ trợ chế độ tối (dark mode), đồng bộ dữ liệu với `localStorage`, và các tính năng quản lý công việc như thêm, chỉnh sửa, xóa, đánh dấu hoàn thành, và sắp xếp lại công việc.

Cài đặt Phụ thuộc Đảm bảo bạn đã cài đặt Node.js (phiên bản 14 trở lên) và npm. Sau đó chạy:
npm install

Chạy dự án
npm run dev


Hướng dẫn sử dụng
 * Thêm Công việc: Nhập công việc vào ô nhập liệu và nhấp vào "Thêm".
 * Đánh dấu Trạng thái Công việc: Nhấp vào ô checkbox để đánh dấu công việc là "Hoàn thành" hoặc "Chưa hoàn thành".
 * Chỉnh sửa Công việc: Nhấp vào văn bản công việc hoặc nút "Sửa", sửa đổi văn bản, rồi lưu lại.
 * Xóa Công việc: Nhấp vào nút "Xóa" để xóa một công việc.
 * Sắp xếp lại Công việc: Kéo biểu tượng ba gạch ngang ở phía trái để sắp xếp lại thứ tự công việc.
 * Chuyển đổi Chế độ: Sử dụng nút chuyển đổi chế độ trong header để chuyển giữa chế độ sáng và tối. Tùy chọn chế độ sẽ được lưu trong localStorage.
