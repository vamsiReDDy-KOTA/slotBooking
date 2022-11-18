import express from 'express';
import scheduleController from '../controllers/schedule_appointments.controller';

const router:any = express.Router();

router.post('/setAvailability', scheduleController.createUser);
router.get('/getAvailability', scheduleController.getAvailabilityTime);
router.put('/updateAvailability', scheduleController.updateUser);
router.delete('/deleteUser', scheduleController.deleteUser);

export default router