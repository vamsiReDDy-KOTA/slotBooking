import express from 'express';
import appointmentController from '../controllers/appointment.controller';

const router: any = express.Router();

router.post('/createAppointment', appointmentController.createAppointment);
router.get('/getAppointment/:id', appointmentController.getAppointment);
router.put('/updateAppointment/:id', appointmentController.updateAppointment);
router.delete('/cancelAppointment/:id', appointmentController.cancelAppointment);

export default router