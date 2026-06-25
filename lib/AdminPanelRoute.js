// Teachers Routes
export const ADMIN_TEACHER_ADD = "/admin/teacher/add";
export const ADMIN_TEACHER_SHOW = "/admin/teacher";

export const ADMIN_UPLOADFILE_ADD = "/admin/pdf-upload/add";
export const ADMIN_UPLOADFILE_SHOW = "/admin/pdf-upload";

export const ADMIN_DASHBOARD = "/admin/dashboard";
export const USER_DASHBOARD = "/my-account";

export const WEBSITE_REGISTER = "/auth/register";
export const WEBSITE_LOGIN = "/auth/login";


// Website route
export const WEBSITE_SHOP = "/shop/";
export const PRODUCT_SHOW = "/product/";
export const PRODUCT_DETAILS = (slug) =>
  slug ? `/product/${slug}` : "/product";

// order route
export const ORDER_DETAILS = (orderid) =>
  orderid ? `/order-details/${orderid}` : "/order-details";
export const ORDER_ADD = "/admin/order/add";
export const ORDER_SHOW = "/admin/order";

// Category route
export const BOOK_CATEGORY = "/category/";
export const BOOK_CATEGORY_DETAILS = (slug) =>
  slug ? `/category/${slug}` : "/category";
