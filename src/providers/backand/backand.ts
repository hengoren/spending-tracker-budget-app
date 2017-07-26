import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BackandProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BackandProvider {
  auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: 'e5bb81cf-6bb9-4974-ae20-bc71176163d5'};
  api_url: string = 'https://api.backand.com'
  app_name: string = 'budget5897'

  constructor(public http: Http) {
    console.log('Hello BackandProvider Provider');
  }

  private authHeader() {
  	var authHeader = new Headers();
  	authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
  	return authHeader;
  }

  public getTransactions() {
  	return this.http.get(this.api_url + '/1/objects/transaction?returnObject=true', {
  		headers: this.authHeader()
  	})
  	.map(res => res.json())
  }

  public addTransaction(expense: string, description: string, recipient: string, amount: number, category: string) {
  	let data = JSON.stringify({expense: expense, description: description, recipient: recipient, amount: amount, category: category})

  	return this.http.post(this.api_url + '/1/objects/transaction?returnObject=true', data, 
  	{
  		headers: this.authHeader()
  	})
  	.map(res => {
  		return res.json()
  	});
  }

  public removeTransaction(id: string) {
    return this.http.delete(this.api_url + '/1/objects/transaction/' + id,
    {
      headers: this.authHeader()
    })
    .map(res => {
      return res.json();
    });
  }

}
