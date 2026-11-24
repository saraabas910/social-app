import express from 'express';
import './lib/database/connection.js';
import userRoutes from '../src/modules/user/route.js';
import authRoutes from './modules/auth/route.js';
import cookieParser from 'cookie-parser';
import postRouter from './modules/post/route.js';
import commentRouter from './modules/comment/route.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});