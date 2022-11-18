"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_appointments_1 = __importDefault(require("../controllers/schedule_appointments"));
const router = express_1.default.Router();
router.post('/setAvailability', schedule_appointments_1.default.scheduleAppointment);
exports.default = router;
