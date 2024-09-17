const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    museumName: { type: String, required: true },
    members: { type: Number, required: true },
    visitDate: { type: Date, required: true },
    userName: { type: String, required: true },
    userNumber: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.'] 
    },
    ticketId: { type: String },
    entryQR: { type: String },
    exitQR: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
