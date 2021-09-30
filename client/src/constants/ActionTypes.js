/*
products:
 - duplicate products state in redux store
 - start rewiring handlers, functions.... that act on products to products in redux store
 - finally, remove all duplications
*/

/*
PRODUCTS:
 - ACTIONS
  - PRODUCTS_RECEIVED
  - PRODUCT_CREATED
  - PRODUCT_DELETED
  - PRODUCT_UPDATED
 - reducer
*/

export const PRODUCTS_RECEIVED = "PRODUCTS_RECEIVED";
export const PRODUCT_CREATED = "PRODUCT_CREATED";
export const PRODUCT_DELETED = "PRODUCT_DELETED";
export const PRODUCT_UPDATED = "PRODUCT_UPDATED";
