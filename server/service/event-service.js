const EventModel = require('../models/event-model');
const fileService = require('../service/file-service');

class EventService {

    async getEvents(req) {
        const { page, limit, search } = req.query;
        const filter = { title: { $regex: search, $options: 'i' } };
        const totalCount = await EventModel.countDocuments(filter);
        const events = await EventModel.find(filter)
            .sort('-createdAt')
            .limit(limit)
            .skip(limit * page)
            .exec();
        return { totalCount, data: events };
    }

    async getEventById(id) {
        return EventModel.findById(id);
    }

    async create(post) {
        return EventModel.create(post);
    }

    async delete(id) {
        const event = await EventModel.findById(id);
        const info = await EventModel.deleteOne({ _id: id });
        fileService.deleteFiles(event.images);
        return info;
    }
}

module.exports = new EventService()
