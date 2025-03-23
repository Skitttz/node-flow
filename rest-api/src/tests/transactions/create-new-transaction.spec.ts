import { app } from "@@app/app";
import { PaymentTypeEnum } from "@@app/modules/transactions/constants";
import { HttpStatusCodeEnum } from "@@app/shared/constants";
import { AppRoutesEnum } from "@@app/shared/routes";
import { execSync } from "node:child_process";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  })
  
  afterAll(async () => {
    await app.close();
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  it('User should be able to create a new transaction', async() => {
    const response = await request(app.server)
    .post(AppRoutesEnum.TRANSACTIONS)
    .send({title:"Nullbank", amount: 250, type:PaymentTypeEnum.CREDIT})
  
  
    expect(response.statusCode).toEqual(HttpStatusCodeEnum.CREATED);
  })
})
