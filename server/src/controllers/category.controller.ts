import { CategoryEntity } from "../entities/category.entity";
import ApiError from "../errors/api.error";
import categoryService from "../services/category.service";

class CategoryController {
  async getMany(req, res, next) {
    try {
      const { id: ids, _order, _sort, _start, _end } = req.query;
      let categories: CategoryEntity[];
      if (ids) {
        categories = await categoryService.getByIds(ids);
      } else {
        categories = await categoryService.getAll(_order, _sort, _start, _end);
      }

      res.set("Access-Control-Expose-Headers", "X-Total-Count");
      res.set("X-Total-Count", categories.length);
      return res.json(categories);
    } catch (e) {
      next(ApiError.internal(e, "category"));
    }
    return;
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      return res.json(await categoryService.getById(id));
    } catch (e) {
      next(ApiError.internal(e, "category"));
    }
    return;
  }

  async update(req, res, next) {
    try {
      const category = await categoryService.update(req.body);

      return res.json({ id: category.id, data: category });
    } catch (e) {
      next(ApiError.internal(e, "category"));
    }
    return;
  }

  async create(req, res, next) {
    try {
      const category = await categoryService.create(req.body);

      return res.json({ id: category.id, data: category });
    } catch (e) {
      next(ApiError.internal(e, "category"));
    }
    return;
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.delete(id);

      return res.json({ id });
    } catch (e) {
      next(ApiError.internal(e, "category"));
    }
    return;
  }
}

export default new CategoryController();