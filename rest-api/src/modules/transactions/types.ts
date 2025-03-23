import { PaymentTypeEnum } from "./constants";

interface IPostTransaction {
  title: string;
  amount: number;
  type: PaymentTypeEnum;
}



export type { IPostTransaction };
