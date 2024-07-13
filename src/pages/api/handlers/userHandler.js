import User from '../models/user';
import jwt from 'jsonwebtoken';
import meta from '../utils/metaResponse';

export const registerUserHandler = async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    const user = await User.create({ name, username, password, email });
    res.status(201).json(meta(201, 'User registered successfully'));
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to register user', undefined, error.message));
  }
};

export const loginUserHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id, name:user.name }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });
      const mapping = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      };
      const responseMap = {
        user: mapping,
        token,
      };
      res.status(200).json(meta(200, 'User logged in successfully', responseMap));
    } else {
      res.status(401).json(meta(401, 'Invalid credentials', undefined, 'Invalid credentials'));
    }
  } catch (error) {
    res.status(500).json(meta(500, 'Failed to login', undefined, error.message));
  }
};
