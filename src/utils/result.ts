export class ResultData {
  constructor(code = 200, msg?: string, data?: any) {
    this.code = code;
    this.msg = msg || 'ok';
    this.data = data || null;
  }

  code: number;

  msg?: string;

  data?: any;

  static ok(data?: any, msg?: string): ResultData {
    return new ResultData(200, msg, data);
  }

  static fail(code: number, msg?: string, data?: any): ResultData {
    return new ResultData(code || 500, msg || 'fail', data);
  }
}
