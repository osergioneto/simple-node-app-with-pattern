import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  private hasFund(value: number): void {
    const { total } = this.transactionsRepository.getBalance();

    if (value > total) {
      throw Error("You can't create a outcome without a valid balance.");
    }
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      this.hasFund(value);
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
