export class PString {
  value: undefined | string;
  type: string;

  constructor(defaultParam?: string) {
    this.value = defaultParam;
  }
}

export class PNumber {
  value: undefined | number;
  type: number;

  constructor(defaultParam?: number) {
    this.value = defaultParam;
  }
}

export class PBoolean {
  value: undefined | boolean;
  type: boolean;

  constructor(defaultParam?: boolean) {
    this.value = defaultParam;
  }
}
