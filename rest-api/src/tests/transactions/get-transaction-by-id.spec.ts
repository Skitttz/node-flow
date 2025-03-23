import { app } from "@@app/app";
import { PaymentTypeEnum } from "@@app/modules/transactions/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { execSync } from "child_process";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  })
  
  afterAll(async () => {
    await app.close();
  })

  beforeEach(async() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  it('User should be able to view a specific transaction', async() => {

    const createTransaction = await request(app.server)
    .post(AppRoutesEnum.TRANSACTIONS)
    .send({title:"Nullbank", amount: 2000, type:PaymentTypeEnum.CREDIT})
    .expect(HttpStatusCodeEnum.CREATED)

    const cookies = createTransaction.get('Set-Cookie') as string[];
    
    const listTransaction =  await request(app.server)
    .get(AppRoutesEnum.TRANSACTIONS)
    .set('Cookie',cookies)
    .expect(HttpStatusCodeEnum.OK);

    const transactionId : string = listTransaction.body.transactions[0].id;

    const getTransactionByID =  await request(app.server)
    .get(`${AppRoutesEnum.TRANSACTIONS}/${transactionId}`)
    .set('Cookie',cookies)
    .expect(HttpStatusCodeEnum.OK);

    
    expect(getTransactionByID.body.transaction).toEqual(
      expect.objectContaining({title:"Nullbank", amount: 2000})
    )
  
  })
})
