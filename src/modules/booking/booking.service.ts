import moment from 'moment';
import _, { toNumber } from 'lodash';
import { ClientSession } from 'mongoose';
import { BOOKING_STATUS, SORT_VALUE } from './booking.enum';
import bookingModel from './booking.model';
import { Booking } from './booking.inrerface';
import { HttpException } from '@/exceptions/HttpException';
import { CreateBookingDto } from './booking.dto';
import UserUserService from '../user/user/user-user.service';
import { mongoSessionManager } from '@/utils/dbsession';

class bookingService {
  public booking = bookingModel;
  public userService = new UserUserService();

  public async findAllBookings(page: string, limit: string, query: any): Promise<any> {
    let queryData = { is_deleted: false };
    let countQueryData = { is_deleted: false };
    let allCountQueryData = { is_deleted: false };
    if (query?.search) {
      queryData['$or'] = [{ booking_code: { $regex: query?.search ? query?.search : '', $options: 'i' } }];
    }

    const from = moment().startOf('day');
    const to = moment().endOf('day');
    const todayDate = new Date();
    const weekBackDate = todayDate.setDate(todayDate.getDate() - 7);
    const thisWeekStartfrom = moment(weekBackDate).startOf('day');
    const thisMonthStartfrom = moment().startOf('month');
    const lastMonthBackDate = moment(thisMonthStartfrom).subtract(1, 'month');

    // const startOfDay = moment.tz(TIMEZONE.GULF_TIMEZONE).startOf('day')
    // const endOfDay = moment.tz(TIMEZONE.GULF_TIMEZONE).endOf('day')
    // const todayDate = moment.tz(TIMEZONE.GULF_TIMEZONE);
    // const weekBackDate = todayDate.clone().subtract(7, 'days');
    // const thisWeekStartfrom = weekBackDate.clone().startOf('day');
    // const thisMonthStartfrom = todayDate.clone().startOf('month');
    // const lastMonthBackDate = thisMonthStartfrom.clone().subtract(1, 'month');
    // const inToday = { $gte: startOfDay, $lt: endOfDay };

    if (query.start_date && query.end_date) {
      const from = moment(query.start_date, 'YYYY/MM/DD').startOf('day');
      const to = moment(query.end_date, 'YYYY/MM/DD').endOf('day');

      queryData['rental_start_date'] = { $gte: from, $lte: to };
      countQueryData['rental_start_date'] = { $gte: from, $lte: to };
      allCountQueryData['rental_start_date'] = { $gte: from, $lte: to };
    }

    if (query.sort) {
      if (query.sort == SORT_VALUE.TODAY) {
        queryData['rental_start_date'] = { $gte: from, $lte: to };
        countQueryData['rental_start_date'] = { $gte: from, $lte: to };
      }
      if (query.sort == SORT_VALUE.THIS_WEEK) {
        queryData['rental_start_date'] = { $gte: thisWeekStartfrom, $lte: to };
        countQueryData['rental_start_date'] = { $gte: thisWeekStartfrom, $lte: to };
      }
      if (query.sort == SORT_VALUE.THIS_MONTH) {
        queryData['rental_start_date'] = { $gte: thisMonthStartfrom, $lte: to };
        countQueryData['rental_start_date'] = { $gte: thisMonthStartfrom, $lte: to };
      }
      if (query.sort == SORT_VALUE.LAST_MONTH) {
        queryData['rental_start_date'] = { $gte: lastMonthBackDate, $lte: thisMonthStartfrom };
        countQueryData['rental_start_date'] = { $gte: lastMonthBackDate, $lte: thisMonthStartfrom };
      }

      if (query.sort == SORT_VALUE.SCHEDULED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.CONFIRMED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.CANCELED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.EXPIRED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.DELETED) {
        queryData['is_deleted'] = true;
      }
    }

    if (query.customer) {
      queryData['customer'] = query.customer;
      countQueryData['customer'] = query.customer;
      allCountQueryData['customer'] = query.customer;
    }
    const bookings: Booking[] = await this.booking
      .find(queryData)
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page) - 1) * toNumber(limit))
      .populate('customer');
    const total = await this.booking.countDocuments(queryData);
    const bookingSortCounts = await this.getBookingSortCounts(countQueryData, allCountQueryData);
    return { bookings, total, page, bookingSortCounts };
  }

  public async getBookingSortCounts(countQueryData, allCountQueryData) {
    const countQueries = [
      this.booking.countDocuments(allCountQueryData),
      this.booking.countDocuments({ ...countQueryData, status: BOOKING_STATUS.SCHEDULED }),
      this.booking.countDocuments({ ...countQueryData, status: BOOKING_STATUS.CONFIRMED }),
      this.booking.countDocuments({ ...countQueryData, status: BOOKING_STATUS.CANCELED }),
      this.booking.countDocuments({ ...countQueryData, status: BOOKING_STATUS.EXPIRED }),
      this.booking.countDocuments({ is_deleted: true }),
    ];
    const [
      allBookingCount,
      totalBookingScheduledCount,
      totalBookingConfirmedCount,
      totalBookingCanceledCount,
      totalBookingExpiredCount,
      totalBookingDeletedCount,
    ] = await Promise.all(countQueries);

    return {
      allBookingCount,
      totalBookingScheduledCount,
      totalBookingConfirmedCount,
      totalBookingCanceledCount,
      totalBookingExpiredCount,
      totalBookingDeletedCount,
    };
  }
  public async findBookingById(bookingId: string): Promise<Booking> {
    const findbooking: Booking = await this.booking.findOne({ _id: bookingId }).populate('customer');
    if (!findbooking) throw new HttpException(409, "You're not booking");
    return findbooking;
  }

  public async createbooking(bookingData: CreateBookingDto): Promise<any> {
    const booking_code: string = await this.generateUniqueBookingCodeId();
    const createbookingData: Booking = await this.booking.create({ ...bookingData, booking_code });
    return createbookingData;
  }

  public async updateBooking(bookingId: string, bookingData: CreateBookingDto): Promise<Booking> {
    const findbooking: Booking = await this.booking.findOne({ _id: bookingId });
    if (!findbooking) throw new HttpException(409, "You're not booking");

    if (bookingData?.status !== bookingData.status) {
      bookingData.latest_status_updated_date = new Date();
    }

    if (bookingData.is_payment_returned === true) {
      bookingData.payment_returned_date = new Date();
    } else if (bookingData.is_payment_returned === false) {
      bookingData.payment_returned_date = null;
    }

    const updatebookingById: Booking = await this.booking.findByIdAndUpdate(bookingId, bookingData, { new: true }).populate('customer');
    if (!updatebookingById) throw new HttpException(409, "You're not booking");
    return updatebookingById;
  }

  public async deleteBooking(bookingId: string): Promise<Booking> {
    const deletebookingById: Booking = await this.booking.findOne({ _id: bookingId }).populate('user');
    if (!deletebookingById) throw new HttpException(409, 'Booking not found');
    deletebookingById.is_deleted = !deletebookingById.is_deleted;
    await deletebookingById.save({ validateBeforeSave: false });
    return deletebookingById;
  }

  public async findAllBookingsForExcelDownload(query: any): Promise<{ bookings: Booking[]; total: number; bookingSortCounts }> {
    let queryData = { is_deleted: false };
    let countQueryData = { is_deleted: false };
    let allCountQueryData = { is_deleted: false };

    if (query?.search) {
      queryData['$or'] = [{ booking_code: { $regex: query?.search ? query?.search : '', $options: 'i' } }];
    }
    const from = moment().startOf('day');
    const to = moment().endOf('day');

    const todayDate = new Date();
    const weekBackDate = todayDate.setDate(todayDate.getDate() - 7);
    const thisWeekStartfrom = moment(weekBackDate).startOf('day');
    const thisMonthStartfrom = moment().startOf('month');
    const lastMonthBackDate = moment(thisMonthStartfrom).subtract(1, 'month');

    // const startOfDay = moment.tz(TIMEZONE.GULF_TIMEZONE).startOf('day')
    // const endOfDay = moment.tz(TIMEZONE.GULF_TIMEZONE).endOf('day')
    // const todayDate = moment.tz(TIMEZONE.GULF_TIMEZONE);
    // const weekBackDate = todayDate.clone().subtract(7, 'days');
    // const thisWeekStartfrom = weekBackDate.clone().startOf('day');
    // const thisMonthStartfrom = todayDate.clone().startOf('month');
    // const lastMonthBackDate = thisMonthStartfrom.clone().subtract(1, 'month');
    // const inToday = { $gte: startOfDay, $lt: endOfDay };

    if (query.start_date && query.end_date) {
      const from = moment(query.start_date, 'YYYY/MM/DD').startOf('day');
      const to = moment(query.end_date, 'YYYY/MM/DD').endOf('day');

      queryData['rental_start_date'] = { $gte: from, $lte: to };
      countQueryData['rental_start_date'] = { $gte: from, $lte: to };
    }

    if (query.sort) {
      if (query.sort == SORT_VALUE.TODAY) {
        queryData['rental_start_date'] = { $gte: from, $lte: to };
        countQueryData['rental_start_date'] = { $gte: from, $lte: to };
      }
      if (query.sort == SORT_VALUE.THIS_WEEK) {
        queryData['rental_start_date'] = { $gte: thisWeekStartfrom, $lte: to };
        countQueryData['rental_start_date'] = { $gte: thisWeekStartfrom, $lte: to };
      }
      if (query.sort == SORT_VALUE.THIS_MONTH) {
        queryData['rental_start_date'] = { $gte: thisMonthStartfrom, $lte: to };
        countQueryData['rental_start_date'] = { $gte: thisMonthStartfrom, $lte: to };
      }
      if (query.sort == SORT_VALUE.LAST_MONTH) {
        queryData['rental_start_date'] = { $gte: lastMonthBackDate, $lte: thisMonthStartfrom };
        countQueryData['rental_start_date'] = { $gte: lastMonthBackDate, $lte: thisMonthStartfrom };
      }

      if (query.sort == SORT_VALUE.SCHEDULED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.CONFIRMED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.CANCELED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.EXPIRED) {
        queryData['status'] = query.sort;
      }
      if (query.sort == SORT_VALUE.DELETED) {
        queryData['is_deleted'] = true;
      }
    }
    if (query.customer) {
      queryData['customer'] = query.customer;
      countQueryData['customer'] = query.customer;
      allCountQueryData['customer'] = query.customer;
    }
    const bookings: Booking[] = await this.booking.find(queryData).sort({ createdAt: -1 }).populate('customer');
    const total = await this.booking.countDocuments(queryData);
    const bookingSortCounts = await this.getBookingSortCounts(countQueryData, allCountQueryData);

    return { bookings, total, bookingSortCounts };
  }

  public async updateBookingStatus(bookingId: string, session: ClientSession): Promise<Booking> {
    session.startTransaction();
    let findBooking: Booking = await this.booking.findOne({ _id: bookingId }).session(session);
    if (!findBooking) throw new HttpException(409, 'Booking Not Found !!');
    // Pass the session to the userBookingAmountDistribution method
    let { balanceAmount, haveBalance } = await this.userService.userBookingAmountDistribution(
      findBooking?.user,
      findBooking?.booking_amount,
      session,
    );

    if (haveBalance) {
      findBooking.laps_amount += balanceAmount;
      findBooking.is_amount_distributed = true;
      findBooking.status = 'confirmed';
    }
    // Save the updated booking with session
    await findBooking.save({ session });

    // Commit the transaction
    await mongoSessionManager.commitTransaction();
    mongoSessionManager.endSession();
    return findBooking;
  }

  public async generateUniqueBookingCodeId(): Promise<any> {
    const idTag = 'BOK';
    let nextId: string = `${idTag}00001`;
    let previousId: String = '';
    const previousData: Booking[] = await this.booking.find({}, { booking_code: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(1);
    if (previousData && previousData[0] && previousData[0].booking_code) {
      previousId = previousData[0].booking_code;
    }
    if (previousData && previousId && previousId !== '') {
      const splitted = previousId.split(idTag)[1];
      const nextCount = parseInt(splitted) + 1;
      nextId = nextCount < 10 ? `${idTag}0000${nextCount}` : `${idTag}0000${nextCount}`;
    }
    return nextId;
  }
}

export default bookingService;
