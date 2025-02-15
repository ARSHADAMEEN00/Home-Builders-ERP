import { Router } from 'express';
import { Routes } from '../index/index.interface';
import bookingController from './booking.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { ConfirmBookingDto, CreateBookingDto } from './booking.dto';

class BookingRoute implements Routes {
  public path = '/booking';
  public router = Router();
  public bookingController = new bookingController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/admin/all`, this.bookingController.getbookings);
    this.router.get(`${this.path}/admin/:id`, this.bookingController.getbookingById);
    this.router.post(`${this.path}/admin/new`, validationMiddleware(CreateBookingDto, 'body', false), this.bookingController.createbooking);
    // update
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(CreateBookingDto, 'body', false), this.bookingController.updatebooking);
    // delete
    this.router.delete(`${this.path}/admin/:id`, this.bookingController.deletebooking);
    //excel download
    this.router.get(`${this.path}/admin/excel/print`, this.bookingController.getAllBookingsForExcelDownload);
    this.router.post(`${this.path}/admin/status/update/:id`, this.bookingController.updateBookingStatus);
  }
}

export default BookingRoute;
