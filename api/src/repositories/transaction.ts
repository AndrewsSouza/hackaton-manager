import knex from '../database/connection'
import { Request, Response, NextFunction } from 'express'
import { Transaction } from 'knex'

export default class TransactionSingleton {
    private static trx: Transaction | undefined

    private constructor() { }

    static async getInstance(): Promise<Transaction> {
        if (!!TransactionSingleton.trx && !TransactionSingleton.trx.isCompleted()) {
            return TransactionSingleton.trx
        }

        TransactionSingleton.trx = await knex.transaction()

        return TransactionSingleton.trx
    }

    static async closeTransaction(req: Request, res: Response, next: NextFunction): Promise<any> {
        if (!!TransactionSingleton.trx && !TransactionSingleton.trx.isCompleted()){
            await TransactionSingleton.trx?.commit()
        }

        next()
    }
} 