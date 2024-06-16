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
import { isValidId } from '../middleware/ValidId.js';
import { ctrlWrapper } from '../middleware/Contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAll));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getByIdContact));
router.post('/contacts', validateCreateContact, ctrlWrapper(createNewContact));
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateUpdateContact,
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
