import Moment from 'moment-timezone';
import moment from 'moment';
import { Request, Response } from "express";
import httpStatus from 'http-status';
import tourScheduleModel from '../models/shecdule_appointment.model';
import appointmentModel from '../models/appointment.model';

const createUser = async (req: Request, res: Response) => {

    try {

        // console.log('111',moment().day(0+6).format('YYYY-MM-DD'));

        const findEmail: any = await tourScheduleModel.findOne({ email: req.body.email });

        if (findEmail) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Email is already use" });

        const result = new tourScheduleModel(req.body);

        await result.save();

        return res.status(httpStatus.CREATED).send({ message: "Created availability time scuccessfully", data: result });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

const updateUser = async (req: Request, res: Response) => {

    try {

        const result = await tourScheduleModel.findOneAndUpdate({ email: req.body.email }, req.body, { new: true });

        return res.status(httpStatus.CREATED).send({ message: "Updated availability time scuccessfully", data: result });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

const deleteUser = async (req: Request, res: Response) => {

    try {

        await tourScheduleModel.findOneAndDelete({ email: req.body.email });

        return res.status(httpStatus.CREATED).send({ message: "Deleted user scuccessfully" });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

const getAvailabilityTime = async (req: Request, res: Response) => {

    try {

        const findAppointment: any = await appointmentModel.find({ email: req.query.email, is_deleted_by: false }).select('date_time');

        const findEmail: any = await tourScheduleModel.findOne({ email: req.query.email });

        if (!findEmail) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Invalid email" });

        var date: any = req.query.date;
        var date1: any = Moment().tz(findEmail.timezone).format('YYYY-MM-DD');
        var time = moment((Date.now() + 2 * (60 * 60 * 250))).tz(findEmail.timezone).format('h:mma');

        var weekDayName = moment(new Date(date)).format('dddd');

        if (weekDayName === findEmail.monday.weekDay && findEmail.monday.available === false || weekDayName === findEmail.tuesday.weekDay && findEmail.tuesday.available === false || weekDayName === findEmail.wednesday.weekDay && findEmail.wednesday.available === false || weekDayName === findEmail.thursday.weekDay && findEmail.thursday.available === false || weekDayName === findEmail.friday.weekDay && findEmail.friday.available === false || weekDayName === findEmail.saturday.weekDay && findEmail.saturday.available === false || weekDayName === findEmail.sunday.weekDay && findEmail.sunday.available === false) {

            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "No time slot avaiable" });
        } else if (date < date1) {

            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "No time slot avaiable" });
        }

        var scheduleTime: any = [];
        var weekDay: any = [];
        var dates: any = [];
        var breakTimes: any = [];

        if (weekDayName == 'Monday' && findEmail.monday.available === true) {

            scheduleTime.push(findEmail.monday.time);
            weekDay.push(findEmail.monday.weekDay);
            dates.push(findEmail.monday.date);
            breakTimes.push(findEmail.monday.breakTime);
        } else if (weekDayName == 'Tuesday' && findEmail.tuesday.available === true) {

            scheduleTime.push(findEmail.tuesday.time);
            weekDay.push(findEmail.tuesday.weekDay);
            dates.push(findEmail.tuesday.date);
            breakTimes.push(findEmail.tuesday.breakTime);
        } else if (weekDayName == 'Wednesday' && findEmail.wednesday.available === true) {

            scheduleTime.push(findEmail.wednesday.time);
            weekDay.push(findEmail.wednesday.weekDay);
            dates.push(findEmail.wednesday.date);
            breakTimes.push(findEmail.monday.breakTime);
        } else if (weekDayName == 'Thursday' && findEmail.thursday.available === true) {

            scheduleTime.push(findEmail.thursday.time);
            weekDay.push(findEmail.thursday.weekDay);
            dates.push(findEmail.thursday.date);
            breakTimes.push(findEmail.thursday.breakTime);
        } else if (weekDayName == 'Friday' && findEmail.friday.available === true) {

            scheduleTime.push(findEmail.friday.time);
            weekDay.push(findEmail.friday.weekDay);
            dates.push(findEmail.friday.date);
            breakTimes.push(findEmail.friday.breakTime);
        } else if (weekDayName == 'Saturday' && findEmail.saturday.available === true) {

            scheduleTime.push(findEmail.saturday.time);
            weekDay.push(findEmail.saturday.weekDay);
            dates.push(findEmail.saturday.date);
            breakTimes.push(findEmail.saturday.breakTime);
        } else if (weekDayName == 'Sunday' && findEmail.sunday.available === true) {

            scheduleTime.push(findEmail.sunday.time);
            weekDay.push(findEmail.sunday.weekDay);
            dates.push(findEmail.sunday.date);
            breakTimes.push(findEmail.monday.breakTime);
        }

        scheduleTime = scheduleTime.flat();
        breakTimes = breakTimes.flat();

        if (req.query.date !== dates[0]) {

            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please updated your time slot" });
        }

        var scheduleTimes: any = [];

        scheduleTime.forEach((val: any) => {

            var fromTime = moment(val.startTime, "h:mm");
            var toTime = moment(val.endTime, "h:mm");

            while (fromTime < toTime) {

                scheduleTimes.push(fromTime.format("h:mma"));
                fromTime = fromTime.add(30, 'minutes');
            }

        });

        var breakTim: any = [];

        breakTimes.forEach((val: any) => {

            var fromTime = moment(val.startTime, "h:mm");
            var toTime = moment(val.endTime, "h:mm");

            while (fromTime <= toTime) {

                breakTim.push(fromTime.format("h:mma"));
                fromTime = fromTime.add(30, 'minutes');
            }

        });

        var currTime: any = [];

        var fromTime = moment('12:00am', "h:mma");
        var toTime = moment(time, "h:mma");

        while (fromTime < toTime) {

            currTime.push(fromTime.format("h:mma"));
            fromTime = fromTime.add(30, 'minutes');
        }

        var array1: any = [];

        findAppointment.map((val: any) => {

            if (val.date_time.split(',')[0] == dates[0]) {
                array1.push(val.date_time);

            }
        })

        var array2: any = [];

        for (var i = 0; i < array1.length; i++) {
            var split = array1[i].split(",");
            array2.push(split[1]);
        }

        var remamingTimeSlot = scheduleTimes.filter((element: any) => !array2.includes(element) && !breakTim.includes(element));

        if (weekDayName == weekDay[0] && date1 == date) {

            var remamingTimeSlots = scheduleTimes.filter((element: any) => !currTime.includes(element) && !array2.includes(element) && !breakTim.includes(element));

            return res.status(httpStatus.CREATED).send({ message: "Get availability time retrieved scuccessfully", data: remamingTimeSlots });
        }

        return res.status(httpStatus.CREATED).send({ message: "Get availability time retrieved scuccessfully", data: remamingTimeSlot });
    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error })
    }

}

export default { createUser, getAvailabilityTime, updateUser, deleteUser };