import axios from 'axios';
import { companyName, smsApiKey } from '@/utils/consts';

export function generateOtp(otp_length: number) {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export async function smsCarrierSender (smsData) {

  const phoneWithCode = `91${smsData.phone}`

  try {
      await axios.post(`https://mail-sender.vingb.com/send_sms_view/${smsApiKey}/`, {
        "phone":phoneWithCode,
        "message":`${smsData.otp} is the OTP to access \n${companyName}.\n\nPlease do not share this with anyone`,
        "sender":"OSPERB"
      })
      // console.log('SMS sent successfully!');
  
  } catch (error) {
    console.log(error);
  }
}

