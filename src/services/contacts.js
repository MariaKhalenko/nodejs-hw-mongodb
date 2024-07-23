import { Contacts } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find({ userId });

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }


export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ status: '404', message: 'Contact not found' });
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

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contacts.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(
    contactsCount,
    page,
    perPage,
    contacts,
  );

  return {
    ...paginationData,
    data: contacts,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contacts.findById({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  options = {},
  userId,
) => {
  const contact = await Contacts.findByIdAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contacts.findByIdAndDelete({ _id: contactId, userId });
  return contact;
};
