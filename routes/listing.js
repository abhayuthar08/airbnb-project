const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const User = require('../models/user.js');
const { isLoggedIn, isOwner } = require('../middelware.js');
const listingController = require('../controllers/listing.js');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');

// Index Route - Show all listings
router.get('/', listingController.index);

// New Listing Form Route
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Show Route - Show details of a specific listing
router.get('/:id', listingController.showRoute);

//about and app_info page
router.get('/app-info', (req, res) => {
    res.render('listings/app-info'); // Adjust path if in a subfolder
});



router.get('/:id/book', isLoggedIn, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash('error', 'Museum not found!');
            return res.redirect('/listings');
        }
        res.render('listings/bookticket', { listing });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Something went wrong!');
        res.redirect('/listings');
    }
});

// POST route to handle booking submission and generate the ticket as a PDF
router.post('/:id/book', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash('error', 'Museum not found!');
            return res.redirect('/listings');
        }

        const { museumName, members, visitDate, userName, userNumber } = req.body;
        const ticketId = uuidv4(); // Generate a unique ticket ID

        // Generate QR codes for entry and exit
        const entryQR = await QRCode.toDataURL(`Entry - Ticket ID: ${ticketId}`);
        const exitQR = await QRCode.toDataURL(`Exit - Ticket ID: ${ticketId}`);

        // Create a PDF document
        const doc = new PDFDocument();

        // Set the PDF headers to download the ticket as a file
        res.setHeader('Content-disposition', 'attachment; filename=ticket.pdf');
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF document to the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(25).text('Museum Ticket', { align: 'center' });
        doc.moveDown();
        doc.fontSize(18).text(`Museum Name: ${museumName}`);
        doc.text(`Visit Date: ${visitDate}`);
        doc.text(`Number of Members: ${members}`);
        doc.text(`User Name: ${userName}`);
        doc.text(`User Mobile: ${userNumber}`);
        doc.text(`Ticket ID: ${ticketId}`);

        doc.moveDown();

        // Add QR codes to the PDF with spacing and alignment
        const qrSize = 100; // Size of the QR codes
        const xMargin = 50; // Margin from the edges
        const yPosition = doc.y; // Current vertical position

        // Position entry QR on the left side
        doc.fontSize(12).text('Entry QR Code:', xMargin, yPosition);
        doc.image(entryQR, xMargin, yPosition + 20, { fit: [qrSize, qrSize] });

        // Position exit QR on the right side
        const rightMargin = 500 - qrSize - xMargin; // Adjust for page width and QR size
        doc.fontSize(12).text('Exit QR Code:', rightMargin, yPosition);
        doc.image(exitQR, rightMargin, yPosition + 20, { fit: [qrSize, qrSize] });

        // Finalize the PDF
        doc.end();
    } catch (error) {
        console.error('Error occurred during ticket booking:', error);
        req.flash('error', 'Could not book the ticket!');
        res.redirect(`/listings/${req.params.id}/book`);
    }
});


// GET route for the mock payment page
// router.get('/:id/payment', (req, res) => {
//     const booking = req.session.booking;
//     if (!booking) {
//         req.flash('error', 'No booking found. Please try again.');
//         return res.redirect(`/listings/${req.params.id}/book`);
//     }

//     // Render mock payment page
//     res.render('listings/payment', { booking });
// });

// POST route to simulate payment confirmation
// router.post('/:id/confirm-payment', async (req, res) => {
//     try {
//         const booking = req.session.booking;
//         if (!booking) {
//             req.flash('error', 'No booking found. Please try again.');
//             return res.redirect(`/listings/${req.params.id}/book`);
//         }

//         // Simulate successful payment without actual implementation
//         req.flash('success', 'Payment (simulated) successful! Your ticket has been booked.');
//         res.redirect(`/listings/${req.params.id}/confirmation`);
//     } catch (error) {
//         console.error(error);
//         req.flash('error', 'Payment failed. Please try again.');
//         res.redirect(`/listings/${req.params.id}/payment`);
//     }
// });

// Confirmation page after mock payment
// router.get('/:id/confirmation', (req, res) => {
//     const booking = req.session.booking;
//     if (!booking) {
//         req.flash('error', 'No booking found. Please try again.');
//         return res.redirect('/listings');
//     }

//     // Render confirmation page with booking details
//     res.render('listings/confirmation', { booking });
//     // Optionally clear session after confirmation
//     req.session.booking = null;
// });

// Create Route for adding new listing
router.post('/', isLoggedIn, listingController.createNewPost);

// Edit Route - Render edit form
router.get('/:id/edit', isLoggedIn, isOwner, listingController.editRoute);

// Update Route - Update the listing
router.put('/:id', isLoggedIn, isOwner, listingController.updateRoute);

// Delete Route - Remove a listing
router.delete('/:id', isLoggedIn, isOwner, listingController.deleteRoute);

module.exports = router;
