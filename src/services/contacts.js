import Contact from '../db/Contact.js';
import createError from 'http-errors';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);
  return newContact;
};

export const updateContactById = async (
  contactId,
  contactData,
  options = {},
) => {
  const existingContact = await Contact.findByIdAndUpdate(
    contactId,
    contactData,
    {
      new: true,
      ...options,
    },
  );

  return existingContact;
};

export const deleteContactById = async (contactId) => {
  const existingContact = await Contact.findByIdAndDelete(contactId);
  return existingContact;
};
