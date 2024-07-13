import { getProductByIdHandler, updateProductHandler, deleteProductHandler } from '../handlers/productHandler';
import dbMiddleware from '../middlewares/dbMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return getProductByIdHandler(req, res);
  } else if (req.method === 'PUT') {
    return updateProductHandler(req, res);
  } else if (req.method === 'DELETE') {
    return deleteProductHandler(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default dbMiddleware(authMiddleware(handler));
