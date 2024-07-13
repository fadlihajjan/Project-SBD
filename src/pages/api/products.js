import { getAllProductsHandler, createProductHandler } from './handlers/productHandler';
import dbMiddleware from './middlewares/dbMiddleware';
import authMiddleware from './middlewares/authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getAllProductsHandler(req, res);
  } else if (req.method === 'POST') {
    return createProductHandler(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default dbMiddleware(authMiddleware(handler));
