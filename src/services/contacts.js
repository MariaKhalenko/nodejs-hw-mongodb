import Contact from '../db/Contact.js';
import createError from 'http-errors';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Error fetching contacts' });
  }
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ status: 'error', message: 'Contact not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Error fetching contact' });
  }
};

export const createContact = async (contactData) => {
  try {
    const newContact = await Contact.create(contactData);
    return newContact;
  } catch (error) {
    throw new Error('Error creating contact');
  }
};
export const updateContactById = async (contactId, updateData) => {
  try {
    const existingContact = await Contact.findById(contactId);
    if (!existingContact) {
      throw createError(404, 'Contact not found');
    }

    Object.assign(existingContact, updateData);

    const updatedContact = await existingContact.save();
    return updatedContact;
  } catch (error) {
    throw error;
  }
};
export const deleteContactById = async (contactId) => {
  try {
    const existingContact = await Contact.findById(contactId);
    if (!existingContact) {
      throw createError(404, 'Contact not found');
    }

    await existingContact.remove();
  } catch (error) {
    throw error;
  }
};
