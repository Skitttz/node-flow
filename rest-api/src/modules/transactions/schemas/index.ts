import { PaymentTypeEnum } from "@@transactions/constants"
import { z } from "zod"

const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(Object.values(PaymentTypeEnum) as [string, ...string[]])
})


const transactionByIdSchema = z.object({
  id: z.string().uuid(),
})



export { createTransactionBodySchema, transactionByIdSchema }

