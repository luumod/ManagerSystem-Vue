class C_Error extends Error {
  message: string;
  code: number;
  codestr: string;

  constructor(message: string, code: number, codestr: string) {
    super(message);
    this.message = message;
    this.code = code;
    this.codestr = codestr;
  }

  toString(): string {
    return `C_Error: { message: "${this.message}", code: ${this.code}, codestr: "${this.codestr}" }`;
  }
}

export default C_Error;
