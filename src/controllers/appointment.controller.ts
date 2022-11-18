import { Request, Response } from "express";
import httpStatus from 'http-status';
import tourAppointmentModel from '../models/appointment.model';


const createAppointment = async (req: Request, res: Response) => {

    try {

        const result = new tourAppointmentModel(req.body);

        await result.save();

        return res.status(httpStatus.CREATED).send({ message: "Created appointment scuccessfully", data: result });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

const getAppointment = async (req: Request, res: Response) => {

    try {

        const result = await tourAppointmentModel.findOne({ _id: req.params.id, is_deleted_by: false });

        return res.status(httpStatus.CREATED).send({ message: "Appointment retrieved scuccessfully", data: result });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

const updateAppointment = async (req: Request, res: Response) => {

    try {

        const result = await tourAppointmentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        return res.status(httpStatus.CREATED).send({ message: "Appointment updated scuccessfully", data: result });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

const cancelAppointment = async (req: Request, res: Response) => {

    try {

        const result = await tourAppointmentModel.findOneAndUpdate({ _id: req.params.id }, { is_deleted_by: true }, { new: true });

        return res.status(httpStatus.CREATED).send({ message: "Appointment deleted scuccessfully", data: result });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

export default { createAppointment, getAppointment, updateAppointment, cancelAppointment };