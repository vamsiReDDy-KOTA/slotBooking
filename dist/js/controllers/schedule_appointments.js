"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const shecdule_appointment_model_1 = __importDefault(require("../models/shecdule_appointment.model"));
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('111111111', req.body);
        const result = new shecdule_appointment_model_1.default(req.body);
        yield result.save();
        return res.status(http_status_1.default.CREATED).send({ message: "schedule appointment scuccessfully", data: result });
    }
    catch (error) {
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({ message: error });
    }
});
exports.default = { scheduleAppointment };
