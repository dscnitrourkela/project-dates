import axios from 'axios';
import {
  Request,
  Response,
} from 'express';

import {
  INSTAMOJO_BASE_URL,
  INSTAMOJO_CLIENT_ID,
  INSTAMOJO_CLIENT_SECRET,
} from '@constants';

const generateToken = async (): Promise<string> => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('grant_type', 'client_credentials');
  encodedParams.set('client_id', INSTAMOJO_CLIENT_ID as string);
  encodedParams.set('client_secret', INSTAMOJO_CLIENT_SECRET as string);

  const options = {
    method: 'POST',
    url: `${INSTAMOJO_BASE_URL}/oauth2/token/`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: encodedParams,
  };

  const response = await axios.request(options);
  return response.data.access_token;
};

export const generatePaymentLink = async (req: Request, res: Response) => {
  const { amount, purpose, redirectUrl } = req.body;
  if (!amount || !purpose || !redirectUrl)
    return res.status(400).json({ error: 'Missing Arguments' });
  try {
    const token = await generateToken();
    if (!token)
      return res.status(500).json({ error: 'Could not generate token' });

    const encodedParams = new URLSearchParams();
    encodedParams.set('allow_repeated_payments', 'false');
    encodedParams.set('amount', amount);
    encodedParams.set('purpose', purpose);
    encodedParams.set('redirect_url', redirectUrl);

    const options = {
      method: 'POST',
      url: `${INSTAMOJO_BASE_URL}/v2/payment_requests/`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: encodedParams,
    };

    const paymentLink = await axios.request(options);

    return res
      .status(200)
      .json({ success: true, data: paymentLink.data.longurl });
  } catch (error) {
    return res.status(500).send(error);
  }
};
