"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Setup schema
var scheduleSchema = new mongoose_1.default.Schema({
    Monday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
    Tuesday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
    Wednesday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
    Thursday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
    Friday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
    Saturday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
    Sunday: {
        time: [],
        available: { type: Boolean, default: false }, timezone: { type: String }
    },
}, { timestamps: true });
// Export schedule_appointment model
exports.default = mongoose_1.default.model('schedule_appointment', scheduleSchema);
