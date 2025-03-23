import { z } from "zod"
import { PaymentTypeEnum } from "../constants"

const makeTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(Object.values(PaymentTypeEnum) as [string, ...string[]])
})


const transactionByIdSchema = z.object({
  id: z.string().uuid(),
})



export { makeTransactionBodySchema, transactionByIdSchema }

