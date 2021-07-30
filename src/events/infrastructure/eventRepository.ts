import EventModel from '../../shared/infrastructure/database/schemas/event';
import Event from '../domain/event';

const findById = async (_id: string): Promise<Event | null> => {
  return await EventModel.findOne({ _id });
};

const findAll = async (user: string): Promise<Event[]> => {
  return await EventModel.find({ user }).populate('user', 'name');
};

const save = async (event: Event): Promise<Event> => {
  return await new EventModel(event).save();
};

const findByIdAndUpdate = async (event: Event): Promise<Event | null> => {
  return await EventModel.findByIdAndUpdate(event._id, event, {
    useFindAndModify: false,
    new: true,
  });
};

const findByIdAndDelete = async (id: string): Promise<Event | null> => {
  return await EventModel.findByIdAndDelete(id, { useFindAndModify: false });
};

export { findById, findAll, save, findByIdAndUpdate, findByIdAndDelete };
