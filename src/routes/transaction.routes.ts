import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const repositories = transactionsRepository.all();

    return response.status(200).json(repositories);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const { title, value, type } = request.body;

    const transaction = createTransactionService.execute({
      title,
      value: Number(value),
      type,
    });

    return response.status(201).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
