import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { BaseApi } from './base.api.page';
import login from '../../../utils/endpoints/login';
import header from '../../../utils/header';

export class API extends BaseApi {
  //---- Response ----//
  protected response: APIResponse;
  protected responseBody: JSON;
  //---- Endpoints----//
  protected loginEndpoint: string;

  constructor(request: APIRequestContext) {
    super(request);
    this.loginEndpoint = this.apiBaseURL + login.login;
  }

  async getUserInformation(requestBody: object) {
    this.response = await this.makePOST(this.loginEndpoint, header, requestBody);
    this.responseBody = await this.response.json();
    await expect(this.response).toBeOK();
    return 'Bearer ' + this.responseBody['token'];
  }
}
