import { Request, Response } from 'express';

import {
  failedResponse,
  successfulResponse,
} from '../../shared/logic/response';
import {
  findAllEvents,
  saveEvent,
  findAndUpdateEvent,
  findAndDeleteEvent,
} from '../application/eventService';
import Event from '../domain/event';

const readEvents = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .send(successfulResponse(await findAllEvents(req.body._id)));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const createEvent = async (req: Request, res: Response) => {
  try {
    req.body.user = req.body._id;
    delete req.body._id;
    return res.status(201).send(successfulResponse(await saveEvent(req.body)));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const updateEvent = (req: Request, res: Response) => {
  try {
    const requester = req.body._id;
    req.body._id = req.params.id;
    findAndUpdateEvent(req.body, requester)
      .then((event: Event) => {
        return res.status(200).send(successfulResponse(event));
      })
      .catch((error) => {
        return res.status(401).send(failedResponse(error));
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const deleteEvent = (req: Request, res: Response) => {
  try {
    const requester = req.body._id;
    findAndDeleteEvent(req.params.id, requester)
      .then((event: Event) => {
        return res.status(200).send(successfulResponse(event));
      })
      .catch((error) => {
        return res.status(401).send(failedResponse(error));
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

export { createEvent, deleteEvent, readEvents, updateEvent };
