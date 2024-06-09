import { Router } from 'express';
import {
  getContactsAll,
  getByIdContact,
  createNewContact,
  updateContact,
  deleteContact,
  ctrlWrapper,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsAll));
router.get('/contacts/:contactId', ctrlWrapper(getByIdContact));
router.post('/contacts', ctrlWrapper(createNewContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
