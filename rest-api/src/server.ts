import fastify from "fastify";
import crypto from 'node:crypto';
import { knex } from "./database";

const app = fastify();


app.get('/hello', async() => {
  const transactions = await knex('transactions').insert({
id:crypto.randomUUID(),
title: 'Transaction test',
amount: 1000,
  }).returning('*');
  return transactions
});


app.listen({
  port:3333
}).then(() => {
  console.log('HTTP Server is Running! 🚀')})