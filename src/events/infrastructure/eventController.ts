import { Request, Response } from 'express';

import {
  failedResponse,
  successfulResponse,
} from '../../shared/logic/response';
import {
  findAllEvents,
  findAndDeleteEvent,
  findAndUpdateEvent,
  saveEvent,
} from '../application/eventService';
import Event from '../domain/event';

const readEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await findAllEvents(req.body._id);
    res.status(200).send(successfulResponse({ events }));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    req.body.user = req.body._id;
    delete req.body._id;
    const event = await saveEvent(req.body);
    res.status(201).send(successfulResponse({ event }));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const updateEvent = (req: Request, res: Response): void => {
  try {
    const requester = req.body._id;
    req.body._id = req.params.id;
    findAndUpdateEvent(req.body, requester)
      .then((event: Event) => {
        res.status(200).send(successfulResponse({ event }));
      })
      .catch((error) => {
        res.status(401).send(failedResponse(error));
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const deleteEvent = (req: Request, res: Response): void => {
  try {
    const requester = req.body._id;
    findAndDeleteEvent(req.params.id, requester)
      .then((event: Event) => {
        res.status(200).send(successfulResponse({ event }));
      })
      .catch((error) => {
        res.status(401).send(failedResponse(error));
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

export { createEvent, deleteEvent, readEvents, updateEvent };
