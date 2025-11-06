const router = require('express').Router()
const {
    CreateEvent,
    GetEvents,
    DeleteEvent,
    GetAllEvents
} = require('../Controller/event.controller.js')
const uploads = require('../utils/multerStorage.js')

router.route('/create-event').post(uploads.array('images'),CreateEvent)
router.route('/get-all-events').get(GetAllEvents)
router.route('/get-all-events/:id').get(GetEvents)
router.route('/delete/:id').delete(DeleteEvent)



module.exports = router