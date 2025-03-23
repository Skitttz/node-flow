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
  
  it('User should be able to get an account summary', async() => {

    const createTransaction = await request(app.server)
    .post(AppRoutesEnum.TRANSACTIONS)
    .send({title:"Nullbank", amount: 250, type:PaymentTypeEnum.CREDIT})
    .expect(HttpStatusCodeEnum.CREATED)

    const cookies = createTransaction.get('Set-Cookie') as string[];

    await request(app.server)
    .post(AppRoutesEnum.TRANSACTIONS)
    .send({title:"Spinfy", amount: 100, type:PaymentTypeEnum.DEBIT})
    .set('Cookie',cookies)
    .expect(HttpStatusCodeEnum.CREATED)

  
    const summary =  await request(app.server)
    .get(`/transactions${AppRoutesEnum.TRANSACTIONS_SUMMARY}`)
    .set('Cookie',cookies)
    .expect(HttpStatusCodeEnum.OK);

    expect(summary.body.summary).toEqual(
      expect.objectContaining({amount:150})
    )
  })
  
  })

