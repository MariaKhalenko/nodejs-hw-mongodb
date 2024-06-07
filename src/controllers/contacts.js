import {
  getAllContacts as serviceGetAllContacts,
  getContactById as serviceGetContactById,
  createContact,
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
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber) {
      throw createError(400, 'Name and phoneNumber are required');
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    const updatedContact = await updateContactById(contactId, {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    res.status(200).json({
      status: 'success',
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    if (error.status && error.message) {
      next(error);
    } else {
      next(createError(500, 'Error patching contact'));
    }
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    await deleteContactById(contactId);

    res.status(204).send();
  } catch (error) {
    if (error.status && error.message) {
      next(error);
    } else {
      next(createError(500, 'Error deleting contact'));
    }
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await serviceGetAllContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await serviceGetContactById(contactId);
    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createNewContact: ctrlWrapper(createNewContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
