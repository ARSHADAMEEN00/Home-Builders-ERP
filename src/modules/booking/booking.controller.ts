import { NextFunction, Request, Response } from 'express';
import bookingService from './booking.service';
import { Booking } from './booking.inrerface';
import { CreateBookingDto } from './booking.dto';
import { mongoSessionManager } from '@/utils/dbsession';
class bookingController {
  public bookingService = new bookingService();
  public getbookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const page: string = (query.page || '1') as string;
      const limit: string = (query.limit || '10') as string;

      const findAllbookingData: any = await this.bookingService.findAllBookings(page, limit, query);
      res.status(200).json(findAllbookingData);
    } catch (error) {
      next(error);
    }
  };

  public getbookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId: string = req.params.id;
      const findOnebookingData: Booking = await this.bookingService.findBookingById(bookingId);
      res.status(200).json(findOnebookingData);
    } catch (error) {
      next(error);
    }
  };

  public createbooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingData: CreateBookingDto = req.body;
      const createbookingData: Booking = await this.bookingService.createbooking(bookingData);
      res.status(200).json(createbookingData);
    } catch (error) {
      next(error);
    }
  };

  public updatebooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId: string = req.params.id;
      const bookingData: CreateBookingDto = req.body;
      const updatebookingData: Booking = await this.bookingService.updateBooking(bookingId, bookingData);
      res.status(200).json(updatebookingData);
    } catch (error) {
      next(error);
    }
  };

  public deletebooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId: string = req.params.id;
      const deletebookingData: Booking = await this.bookingService.deleteBooking(bookingId);

      res.status(200).json(deletebookingData);
    } catch (error) {
      next(error);
    }
  };

  public getAllBookingsForExcelDownload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const findAllbookingData: any = await this.bookingService.findAllBookingsForExcelDownload(query);
      res.status(200).json(findAllbookingData);
    } catch (error) {
      next(error);
    }
  };

  public updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      const session = await mongoSessionManager.startNewSession();
      const confirmBookingData: any = await this.bookingService.updateBookingStatus(bookingId, session);
      res.status(200).json(confirmBookingData);
    } catch (error) {
      await mongoSessionManager.abortTransaction();
      mongoSessionManager.endSession();
      next(error);
    }
  };
}

export default bookingController;
