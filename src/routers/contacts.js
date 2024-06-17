import { Router } from 'express';
import {
  getContactsAll,
  getByIdContact,
  createNewContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import {
  validateCreateContact,
  validateUpdateContact,
} from '../controllers/contacts.js';
import {
  isValidId,
  isValidName,
  isValidPhoneNumber,
} from '../middleware/ValidId.js';
import { ctrlWrapper } from '../middleware/Contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAll));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getByIdContact));
router.post(
  '/contacts',
  isValidName,
  isValidPhoneNumber,
  validateCreateContact,
  ctrlWrapper(createNewContact),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  isValidName,
  isValidPhoneNumber,
  validateUpdateContact,
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
