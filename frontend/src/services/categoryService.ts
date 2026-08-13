import * as api from "../api/categories";

export const categoryService = {
  getCategories: api.getCategories,
  createCategory: api.createCategory,
  updateCategory: api.updateCategory,
  deleteCategory: api.deleteCategory,
};