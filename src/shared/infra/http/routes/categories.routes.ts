import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticate } from '@middlewares/ensureAuthenticate';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRouters = Router();
const upload = multer({ dest: './tmp' });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouters.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRouters.get('/', listCategoriesController.handle);

categoriesRouters.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRouters };
