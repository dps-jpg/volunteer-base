const Router = require('express').Router;

const userController = require('../controllers/user-controller');
const newsController = require('../controllers/news-controller');
const eventController = require('../controllers/event-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminAuthMiddleware = require('../middlewares/admin-auth-middleware');

const router = new Router();


// user
router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.get('/news', newsController.getNews);
router.get('/news/:id', newsController.getPostById);
router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getEventById);

// admin
router.post('/login-admin', userController.loginAdmin);
router.post('/news/create', authMiddleware, adminAuthMiddleware, newsController.create);
router.post('/events/create', authMiddleware, adminAuthMiddleware, eventController.create);
router.post('/users/add-hours/:id', authMiddleware, adminAuthMiddleware, newsController.create);

router.get('/admin/users', authMiddleware, adminAuthMiddleware, userController.getUsers);

router.delete('/news/delete/:id', authMiddleware, adminAuthMiddleware, newsController.delete);
router.delete('/events/delete/:id', authMiddleware, adminAuthMiddleware, eventController.delete);

module.exports = router;
