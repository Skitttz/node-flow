import { randomUUID } from "node:crypto";

export class UniqueID {
  private id: string;

  toString(){
    return this.id;
  }

  toValue(){
    return this.id;
  }

  constructor(id?:string){
    this.id = id ?? randomUUID();
  }

  public equals(id: UniqueID){
    return id.toValue() === this.id;
  }
}