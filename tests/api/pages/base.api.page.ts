import { APIRequestContext } from '@playwright/test';

export class BaseApi {
  protected request: APIRequestContext;
  protected readonly apiBaseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiBaseURL = process.env.API_URL!;
  }

  protected addParamURL(url: string, param: string, value: string) {
    return url.replace(param, value);
  }

  protected addPropertyHeade(header: object, property: string, value: string) {
    return (header[property] = value);
  }

  protected async makeGET(url: string, head?: any, body?: object, params?: any) {
    return await this.request.post(url, {
      headers: head,
      data: body,
      params: params,
    });
  }

  protected async makePOST(url: string, head?: any, body?: object, params?: any) {
    return await this.request.post(url, {
      headers: head,
      data: body,
      params: params,
    });
  }

  protected async makePUT(url: string, head?: any, body?: object, params?: any) {
    return await this.request.post(url, {
      headers: head,
      data: body,
      params: params,
    });
  }

  protected async makeDELETE(url: string, head?: any, body?: object, params?: any) {
    return await this.request.post(url, {
      headers: head,
      data: body,
      params: params,
    });
  }
}
