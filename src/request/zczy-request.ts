
interface ZczyRequestOptions {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export class ZczyRequest {

  options: ZczyRequestOptions;

  constructor(options: ZczyRequestOptions) {
    this.options = options;
  }
}
