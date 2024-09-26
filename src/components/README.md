Thứ tự ưu tiên của các folder:

  1. `/app` : Define page route.
    Sử dụng App để define page, và api call. Các logic truyền vào business/feature, để tránh xài use-client ở cả page, effect tới async page.
  
  2. `/business` : Page content
    Chứa các feature component, mỗi comp tự chứa logic của section/module đó, tránh use client cả page content
  
  3. `/feature` : Các section, các module có trong Page.
    Chứa 1 module, được phép dùng use client ở đây
  
  4. `/form`, `/modal` , `/table`: Chứa các form, modal, table, 1 số component có khả năng dynamic import ssr false/suspense delay import, các comp này thường không cần SSR. Mặc định sẽ auto export dynamic ssr false cho các component này.

  5. `/common` : Chứa các component nhỏ, bản thân nó có thể được re-use ở các feature/business comp. Bản thân common nên hạn chế việc sử dụng useEffect, nhưng có thể có useState, useMemo.
