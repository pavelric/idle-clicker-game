import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};