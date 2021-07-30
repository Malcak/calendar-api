import Event from '../domain/event';
import {
  findAll,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  save,
} from '../infrastructure/eventRepository';

const findAllEvents = async (user: string): Promise<Event[]> => {
  return await findAll(user);
};

const saveEvent = async (event: Event): Promise<Event> => {
  return await save(event);
};

const findAndUpdateEvent = async (
  event: Event,
  requester: string
): Promise<Event> => {
  const requestedEvent = await findById(event._id);

  if (!requestedEvent) {
    return Promise.reject({ event: { msg: 'event not found' } });
  } else if (requestedEvent.user.toString() !== requester) {
    return Promise.reject({
      event: { msg: 'unauthorized to perform the action' },
    });
  }

  const eventUpdated = await findByIdAndUpdate(event);
  return eventUpdated
    ? Promise.resolve(eventUpdated)
    : Promise.reject({ event: { msg: 'event not found' } });
};

const findAndDeleteEvent = async (
  id: string,
  requester: string
): Promise<Event> => {
  const requestedEvent = await findById(id);

  if (!requestedEvent) {
    return Promise.reject({ event: { msg: 'event not found' } });
  } else if (requestedEvent.user.toString() !== requester) {
    return Promise.reject({
      event: { msg: 'unauthorized to perform the action' },
    });
  }

  const eventDeleted = await findByIdAndDelete(id);
  return eventDeleted
    ? Promise.resolve(eventDeleted)
    : Promise.reject({ event: { msg: 'event not found' } });
};

export { findAllEvents, findAndDeleteEvent, findAndUpdateEvent, saveEvent };
