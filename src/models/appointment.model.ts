import mongoose from 'mongoose';

// Setup schema
var appointmentsSchema = new mongoose.Schema({

    date_time: { type: String },

    email: { type: String },

    is_deleted_by: { type: Boolean , default: false}
}, { timestamps: true });

// Export schedule_appointment model
export default mongoose.model('appointment', appointmentsSchema);