import { Router } from 'express';
import {
  getContactsAll,
  getByIdContact,
  createNewContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsAll));
router.get('/:contactId', isValidId, ctrlWrapper(getByIdContact));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createNewContact),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);

router.put(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateContactSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);

const contactsRouter = router;
export default contactsRouter;
