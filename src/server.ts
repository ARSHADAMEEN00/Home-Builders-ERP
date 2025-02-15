process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import IndexRoute from './modules/index/index.route';
import ImageRoute from './modules/image/image.route';
import BookingRoute from './modules/booking/booking.route';
import AuthRoute from './modules/auth/auth.router';
import UserRoute from './modules/user/user.route';
import SiteRoute from './modules/site/site.router';
import ExpenseRoute from './modules/expenses/expense.router';
import PaymentRoute from './modules/payments/payments.router';
import Employee_LaborRoute from './modules/employe&labormanagement/employe.router';

validateEnv();

const app = new App([
  new IndexRoute(),
  new ImageRoute(),
  new BookingRoute(),
  // new AuthRoute(),
  // new UserRoute(),

  // -----------------start --------------------------//
  new AuthRoute(),
  new UserRoute(),
  new SiteRoute(),
  new ExpenseRoute(),
  new PaymentRoute(),
  new Employee_LaborRoute(),


]);

app.listen();
