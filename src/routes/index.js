import express from 'express';
import users from './users';

const router = express.Router();

router.use('/*', (req, res, next) => {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});

router.use('/users', users);

export default router;
