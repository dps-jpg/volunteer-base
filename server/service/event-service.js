const EventModel = require('../models/event-model');
const UserModel = require('../models/user-model');
const fileService = require('../service/file-service');
const MemberModel = require('../models/member-model');
const ApiError = require('../exceptions/api-error');

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

    async getEventById(id, userId) {
        const event = await EventModel.findById(id);
        if (userId) {
            const member = await MemberModel.findOne({ eventId: id, userId });
            event._doc.isMember = Boolean(member);
        }
        return event;
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

    async findMember(body) {
        return MemberModel.findOne(body);
    }

    async participateEvent(req) {
        const { user, body } = req;
        const member = await this.findMember(body);
        if (member !== null) {
            throw ApiError.BadRequest('Вы уже являетесь участником');
        }
        const { id, role, ...userData } = user;

        const info = await MemberModel.create({
            eventId: body.eventId,
            userId: id,
            ...userData,
        })
    }

    async getMembers(id) {
        const members = await MemberModel.find({ eventId: id });
        return members;
    }

    async confirmParticipation(body) {
        const { memberId, userId, eventId } = body;
        const member = await MemberModel.findById(memberId);
        const user = await UserModel.findById(userId);
        const event = await EventModel.findById(eventId);
        member.isTookPart = true;
        member.save();
        user.hours = event.hours + user.hours;
        user.save();
    }
}

module.exports = new EventService()
