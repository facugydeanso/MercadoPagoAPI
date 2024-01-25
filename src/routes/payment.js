import {Router} from 'express';
import {createOrder, receiveWebhook} from '../controllers/controller.js';

const router = Router();

// With router we can use all the HTTP methods (get, post, put, delete)

router.post('/create-order', createOrder);

router.get('/success', (req, res) => res.send('Success payment'));

router.get('/failure', (req, res) => res.send('Failure payment'));

router.get('/pending', (req, res) => res.send('Pending payment'));

router.post('/webhook', receiveWebhook);

export default router;

