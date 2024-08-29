import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const response = await axios.get('https://dashboard-api-dusky.vercel.app/api/get', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from server:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};