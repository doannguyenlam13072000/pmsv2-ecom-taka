# Interview check list

## Hands-on

### Vue JS

- [x] Life cycle hook
- [x] Use pina/vuex
- [x] Router
- [x] Teleport
- [x] Suspend
- [x] Multi v-model
- [x] Lazy loading
- [x] Mixin
- [x] Directive
- [x] Compare lifecycle hooks Vue 2 vs Vue 3

## Knowledge

- [x] SEO
- [x] Index
- [x] Restful API là gì
- [x] MongoDB
- [ ] NodeJS
- [ ] SOLID
- [ ] Agile Scrum

## Question

### Frontend

- [x] Call back func - promise - async await - Call back hell là gì
  - Callback function: Là 1 function được thực thi sau khi 1 function khác được hoàn thành. Callback handle cho các async operation như call api, xử lý sự kiện
  - Callback hell: là callback lồng nhau. Điều này rất khó để maintain

- [x] Excution context
- [x] Hoisting
  - Hoisting là hành vi trong đó việc khai báo biến và func được move lên trên đầu của scope trong compilation phase.

- [x] Strict mode
  - Được giới thiệu trong ESCMScript 5(ES5 - 2009). Nó giúp phát hiện các lỗi mã hóa phổ biến và thực thi việc phân tích cú pháp cũng như xử lý lỗi chặt chẽ hơn trong mã JavaScript. Strict mode có những hạn chế sau:
  
    - Không thể sử dụng 1 biến mà không khai báo
    - Tham số hàm không được trùng
    - K được viết number với tiền tố 0
    - ...

- [x] rem và em trong css
- [x] Các kỹ thuật SEO
  - Tối ưu hoá từ keyword
  - SEO on-page
  - SEO off-page
  - Tạo được nhiều backlink đến trang của bạn
  - Nội dung chất lượng, hình ảnh rõ nét có (alt, có kích thước cho từng loại thiết bị)
  - SSL/TCL
  - Tối ưu hoá nhiều loại thiết bị

- [x] Closure là gì
  - Closure là 1 func có thể ghi nhớ được vị trí nó được tạo ra và truy cập vào biến bên ngoài phạm vi của nó
  - Closure là 1 hàm có thể truy cập vào 1 biến bên ngoài scope chứa nó ngay khi hàm đó đã thực thi xong
  - Closure đảm bảo được tính private khi mình có thể return về method mà k cần fai thông qua biến

- [x] Giải thích IIFE
  - IIFE là viết tắt của Immediately Invoked Function Expression, có nghĩa là khởi tạo một function và thực thi nó ngay lập tức.
  - Advantage:
    - Bao đóng: các biến khai báo trong đó thì bên ngoài sẽ k truy cập được
    - Isolate: ngăn chặn việc conflict name trong và func trong phạm vi IIFE
    - Cho phép tạo ra các module tự thực thi độc lập

- [x] null và undefined
  - undefined: là giá trị mặc định được gán khi được khởi tạo khi nó không dc cung cấp giá trị hay khai báo
  - null: là giá trị biểu thị là biến dc gán là k có giá trị

- [x] any và unknown trong TS:
  - any: có thể sự dụng bất kì thao tác (gọi gàm, truy xuất,...) mà bỏ qua bước kiểm tra kiểu dữ liệu
  - unknown: cần kiểm tra kiểu dữ liệu. Các giá trị của unknown chỉ có thể gán cho unknown hoặc any

- [x] Sự khác biệt giữa tiếp cận mobile first vs desktop first khác nhau, điểm mạnh điểm yếu
  - Mobile first: Tập trung vào trải nghiệm của người dùng di động trước. Điểm mạnh: Tải trang nhanh do thiết kế nhẹ, khả năng tiếp cận tốt đối với người dùng di động. Điểm yếu: Cần phải thêm và chỉnh sửa nhiều khi hoàn thiện trên desktop.
  - Desktop first: Tập trung vào trải nghiệm của người dùng máy tính/PC. Điểm mạnh: Đa nhiệm kiểm soát tốt các năng phức tạp trên màn hình lớn, thích ứng được với nhiều yêu làm việc trên phím và chuột. Điểm yếu: Tốc độ tải trang có thể chậm hơn ở di động do các tác vụ trên pc phúc tạp hơn. Trải nghiệm có thể sẽ bị giảm do giao diện có thể k đầy đủ như trên PC

### Backend

- [ ] Class và Interface ? List là class hay interface
- [ ] SOLID
- [ ] Exception trong Java? Bao nhiêu loại, tại sao phải handle exception ?
- [ ] Enum
- [ ] Stack & heap memory
- [ ] Design Pattern đã từng sử dụng và giải thích (em dùng Adapter và Strategy)
- [ ] Em biết bao nhiều loại db indexing ? giải thích cơ chế ? Ảnh cho một cái ví dụ và hỏi nên dùng loại nào ?
- [ ] Để thực hiện 1 câu query thì DB sẽ thực hiện những gì ?

### Common

- [ ] OAuth2 là gì và cách hoạt động như thế nào ? OAuth2 scope là gì ? Grant type là gì, có những loại nào và ưu nhược điểm mỗi loại, em đang dùng gì và tại sao ? ClientID và ClientSecret là gì ?
- [ ] Phân biệt HTTP và HTTPS, cơ chế mã hóa HTTPS giữa client và server ? CA trong HTTPS là gì ?
- [ ] Docker volume là gì ? Có thể link docker volume vào một container mới hay không ?
- [ ] CORS
- [ ] GET với POST khác nhau gì ?
