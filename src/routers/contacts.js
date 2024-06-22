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

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAll));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getByIdContact));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createNewContact),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
