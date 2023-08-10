import mongoose from "mongoose";
import express from "express";
import scheduleRoutes from "./routes/schedule_appointment.route";
import appointmentRoutes from "./routes/appointment.route";
const app = express();

const port: string | number = 8080;

// Connect to Mongoose and set connection variable
mongoose.set('runValidators', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://vamsiReddyk:vamsi22@cluster0.auer7qa.mongodb.net/timezone?retryWrites=true&w=majority').then(async () => {
  mongoose.set('debug', true);
  console.log('Db connected successfully');

}).catch((err) => {
  console.log(err);
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use('/', scheduleRoutes, appointmentRoutes);

app.get('/',(req,res)=>{
return res.send('hello vamsi reddy')
})

app.listen(2222, () => {
  console.log(`Server Runnig 2222`);

});

