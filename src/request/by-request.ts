
interface ByRequestOptions {
  baseURL?: string;
  timeout: number;
  headers: Record<string, string>;
}

export class ByRequest {

  options: ByRequestOptions;

  constructor(options: ByRequestOptions) {
    this.options = options;
  }
}
