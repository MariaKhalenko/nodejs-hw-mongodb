import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Contacts = model('contacts', contactSchema);
