import { IsString, IsNumber } from 'danet/validation.ts';

export class Article {
  readonly _id = crypto.randomUUID();
  @IsString()
  public title: string;

  @IsString() 
  public content: string;

  @IsNumber()
  public price: number;



  constructor(title: string, content: string,price:number) {
    this.title = title;
    this.content = content;
    this.price = price;
  }
}
