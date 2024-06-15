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

import { ctrlWrapper } from '../middleware/Contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAll));
router.get('/contacts/:contactId', ctrlWrapper(getByIdContact));
router.post('/contacts', validateCreateContact, ctrlWrapper(createNewContact));
router.patch(
  '/contacts/:contactId',
  validateUpdateContact,
  ctrlWrapper(updateContact),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
