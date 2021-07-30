import { model, Schema } from 'mongoose';

import Event from '../../../../events/domain/event';

const eventSchema = new Schema<Event>({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const EventModel = model<Event>('Event', eventSchema);

export default EventModel;
