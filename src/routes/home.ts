import express, { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response, _next) => {
  res.json({ text: 'hello express & webapck' });
});

export default router;
