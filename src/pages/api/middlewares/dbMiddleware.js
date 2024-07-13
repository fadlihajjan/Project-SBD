import connectToDatabase from '../utils/db';

const dbMiddleware = handler => async (req, res) => {
  await connectToDatabase();
  return handler(req, res);
};

export default dbMiddleware;