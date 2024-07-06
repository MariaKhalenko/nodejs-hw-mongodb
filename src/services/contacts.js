import Contact from '../db/models/Contact.js';
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

  const contactsQuery = Contact.find({ userId });
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
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
  const contact = await Contact.findOne({
    _id: contactId,
    userId,
  });
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
  userId,
) => {
  const existingContact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    contactData,
    {
      new: true,
      ...options,
    },
  );

  return existingContact;
};

export const deleteContactById = async (contactId, userId) => {
  const existingContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return existingContact;
};
