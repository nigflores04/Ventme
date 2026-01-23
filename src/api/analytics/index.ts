// https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}.

const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;

import axios from "axios";

export const trackEvent = async (data: any) => {
  try {
      const response = await axios.post(`https://graph.facebook.com/v22.0/${pixelId}/events?access_token=${accessToken}`,  data, {
 headers: {
          'Content-Type': 'application/json',
      }});
    return response.data;
  } catch (error) {
    throw error;
  }
};



// vent Time
// Event Name
// Event Source URL

// event_name
// event_time
// user_data

// event_source_url



// em: Email — Hashing required
// ph: Phone Number — Hashing required
// fn: First Name — Hashing required
// ln: Last Name — Hashing required
// ge: Gender — Hashing required
// db: Date of Birth — Hashing required
// ct: City — Hashing required
// st: State — Hashing required
// zp: Zip Code — Hashing required
// country: Country — Hashing required
// external_id: External ID — Hashing recommended
// client_ip_address: Client IP Address — Do not hash
// client_user_agent: Client User Agent — Do not hash
// fbc: Click ID — Do not hash
// fbp: Browser ID — Do not hash
// subscription_id: Subscription ID — Do not hash
// fb_login_id: Facebook Login ID — Do not hash
// lead_id: Lead ID — Do not hash
// anon_id: Install ID — Do not hash (Note: This parameter is for app events only)
// madid: Mobile Advertiser ID — Do not hash (Note: This parameter is for app events only)
// page_id: Page ID — Do not hash
// page_scoped_user_id: Page scoped user ID — Do not hash
// ctwa_clid: Click to WhatsApp ID — Do not hash
// ig_account_id: IG account ID — Do not hash
// ig_sid: Click to Instagram ID — Do not hash



// {
// "data": [
//     {
//         "event_name": "Purchase",
//         "event_time": 1761148115,
//         "action_source": "website",
//         "user_data": {
//             "em": [
//                 "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
//             ],
//             "ph": [
//                 null
//             ]
//         },
//         "attribution_data": {
//             "attribution_share": "0.3"
//         },
//         "custom_data": {
//             "currency": "USD",
//             "value": "142.52"
//         },
//         "original_event_data": {
//             "event_name": "Purchase",
//             "event_time": 1761148115
//         }
//     }
// ]
// }