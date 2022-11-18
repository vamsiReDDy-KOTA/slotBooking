"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Setup schema
var tourSchema = new mongoose_1.default.Schema({
    date_time: { type: Date }
}, { timestamps: true });
// Export schedule_appointment model
exports.default = mongoose_1.default.model('tours', tourSchema);
