// Teachers Routes
export const ADMIN_TEACHER_ADD = "/admin/teacher/add";
export const ADMIN_TEACHER_SHOW = "/admin/teacher";


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
