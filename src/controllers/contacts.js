import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

import createError from 'http-errors';

export const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const createNewContact = async (req, res, next) => {
  const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    return next(createError(400, 'Name and phoneNumber are required'));
  }

  const newContact = await createContact(req.body);
  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await updateContactById(contactId, req.body);

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
  if (!updatedContact) {
    next(createError(404, 'Contact not found'));
    return;
  }
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactById(contactId);

  if (!deletedContact) {
    next(createError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const getContactsAll = async (res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    return next(createError(404, 'Contact not found'));
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
