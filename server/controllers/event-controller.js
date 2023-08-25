const eventService = require('../service/event-service');
const fileService = require('../service/file-service');

class EventController {
    async getEvents(req, res, next) {
        try {
            const news = await eventService.getEvents(req);

            res.json(news);
        } catch (e) {
            next(e);
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventService.getEventById(req.params.id, req.query.userId);

            res.json(event);
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const {body, files} = req;
            const images = fileService.saveFiles(files);
            await eventService.create({ ...body, images });
            res.status(200).send();
        } catch (e) {
            next()
        }
    }

    async delete(req, res,next) {
        try {
            const info = await eventService.delete(req.params.id);

            res.status(200).send()
        } catch(e) {
            next(e)
        }
    }

    async participateEvent(req, res, next) {
        try {
            await eventService.participateEvent(req);

            res.status(200).send()
        } catch (e) {
            next(e)
        }
    }

    async getMembers(req, res, next) {
        try {
            const members = await eventService.getMembers(req.params.id);

            res.json(members);
        } catch (e) {
            next(e)
        }
    }

    async confirmParticipation(req, res, next) {
        try {
            await eventService.confirmParticipation(req.body);

            res.status(200).send();
        } catch (e) {
            console.log(e);
            next(e)
        }
    }
}

module.exports = new EventController();
