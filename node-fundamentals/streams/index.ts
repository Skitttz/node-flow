  import { Readable, ReadableOptions, Transform, TransformCallback, Writable, WritableOptions } from 'node:stream';

  // Streams generate from 1 to 100 with delay
  class NumberGeneratorStream extends Readable {
    private currentNumber: number;
    private maxNumber: number;
    private delayGenerateStream: number;
    constructor(currentNumber: number, maxNumber:number, delayGenerateStream:number,options: ReadableOptions = {}) {
      super(options);
      this.currentNumber = currentNumber;
      this.maxNumber = maxNumber;
      this.delayGenerateStream = delayGenerateStream;
    }

    private generateNumber(): void {
      setTimeout(() => {        
        if (this.currentNumber > this.maxNumber) {
          this.push(null);
          return;
        }
        const number = this.currentNumber++;
        const buffer = Buffer.from(String(number) + '\n');
        this.push(buffer);

      }, this.delayGenerateStream)
    }

    _read() :void {
      this.generateNumber();
    }
  }


  //Stream transform numbers into negative
  class NegativeTransformStream extends Transform{
    constructor(options: ReadableOptions = {}) {
      super(options);
    }

    _transform(chunk: Buffer,enconding: BufferEncoding,callback:TransformCallback):void {
      const input = chunk.toString().trim();
      const inputNumber = Number(input);
      if(isNaN(inputNumber)){
        callback(new Error(`Invalid number ${input}`))
        return;
      }

      const negativeNumber = -inputNumber;
      const buffer = Buffer.from(negativeNumber.toString());
      callback(null,buffer);
    }
  }

  //Stream writes numbers in multiplied by number
  class MultiplyByStream extends Writable{
    private numberMultiply: number;
    constructor(numberMultiply: number, options:WritableOptions = {}){
      super(options);
      this.numberMultiply = numberMultiply;
    }
    _write(chunk:Buffer, enconding: BufferEncoding, callback: TransformCallback) : void{
      const input = chunk.toString().trim();
      const inputNumber = Number(input);

      if(isNaN(inputNumber)) {
        callback(new Error(`Invalid number: ${input}`)) 
        return;
      }

      console.log(inputNumber * this.numberMultiply)
      callback();
    }
  }
  
  new NumberGeneratorStream(1,10,1000)
  .pipe(new NegativeTransformStream())
  .pipe(new MultiplyByStream(10));