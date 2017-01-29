import express from 'express';
import users from './users';
import guiders from './guiders';
import reviews from './reviews';
import reservations from './reservations';

const router = express.Router();

router.use('/*', (req, res, next) => {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});

router.use('/users', users);
router.use('/guiders', guiders);
router.use('/reviews', reviews);
router.use('/reservations', reservations);

export default router;
