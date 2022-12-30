export class PBearer {
  prefix: string;
  type: string;

  constructor(prefix: string = "Bearer") {
    this.prefix = prefix;
  }
}
