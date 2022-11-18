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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const schedule_appointment_route_1 = __importDefault(require("./routes/schedule_appointment.route"));
const app = (0, express_1.default)();
const port = 8080;
// Connect to Mongoose and set connection variable
mongoose_1.default.set('runValidators', true);
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect('mongodb+srv://Naren:312213snk@cluster0.xz5mg.mongodb.net/test?retryWrites=true&w=majority').then(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set('debug', true);
    console.log('Db connected successfully');
})).catch((err) => {
    console.log(err);
});
app.use('/', schedule_appointment_route_1.default);
app.listen(port, () => {
    console.log(`Server Runnig ${port}`);
});
