import mongoose from 'mongoose';

// Setup schema
var scheduleSchema = new mongoose.Schema({

    name: { type: String },

    email: { type: String },

    phoneNumber: { type: Number },

    monday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Monday" }, date: { type: String }
    },
    tuesday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Tuesday" }, date: { type: String }
    },
    wednesday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Wednesday" }, date: { type: String }
    },
    thursday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Thursday" }, date: { type: String }
    },
    friday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Friday" }, date: { type: String }
    },
    saturday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Saturday" }, date: { type: String }
    },
    sunday: {
        time: [{ startTime: { type: String }, endTime: { type: String } }], breakTime: [{ startTime: { type: String }, endTime: { type: String } }],
        available: { type: Boolean, default: false }, weekDay: { type: String, default: "Sunday" }, date: { type: String }
    },

    timezone: { type: String }
}, { timestamps: true });

// Export schedule_appointment model
export default mongoose.model('schedule_appointment', scheduleSchema);