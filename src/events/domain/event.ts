interface Event {
  _id: string;
  title: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  user: string;
}

export default Event;
