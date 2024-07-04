import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import createError from 'http-errors';

export const createNewContact = async (req, res, next) => {
  const { name, phoneNumber } = req.body;
  const userId = req.user._id;
  if (!name || !phoneNumber) {
    return next(createError(400, 'Name and phoneNumber are required'));
  }

  const newContact = await createContact({ ...req.body, userId });
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const updatedContact = await updateContactById(contactId, req.body, userId);
  if (!updatedContact) {
    next(createError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const deletedContact = await deleteContactById(contactId, userId);

  if (!deletedContact) {
    next(createError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const getContactsAll = async (req, res, next) => {
  const { page = 1, perPage = 10 } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contactsData = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contactsData,
  });
};

export const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);
  if (!contact) {
    return next(createError(404, 'Contact not found'));
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
