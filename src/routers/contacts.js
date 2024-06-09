import express from 'express';
import {
  getContactsAll,
  getByIdContact,
  ctrlWrapper,
  createNewContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/contacts', ctrlWrapper(getContactsAll));
router.get('/contacts/:contactId', ctrlWrapper(getByIdContact));
router.post('/contacts', ctrlWrapper(createNewContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
