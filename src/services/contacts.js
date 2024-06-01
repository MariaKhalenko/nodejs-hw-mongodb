import Contact from '../db/Contact.js';

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
