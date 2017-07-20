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
  auth_token: {header_name: string, header_value: string} = {header_name: 'e5bb81cf-6bb9-4974-ae20-bc71176163d5', header_value: '2d6893c2-a1fa-4a73-b745-9b1ac1789a87'};
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

  public getTodos() {
  	return this.http.get(this.api_url + '1/objects/todos?returnObject=true', {
  		headers: this.authHeader()
  	})
  	.map(res => res.json())
  }

  public addTodo(name: string) {
  	let data = JSON.stringify({name: name})

  	return this.http.post(this.api_url + '1/objects/todos?returnObject=true', data, 
  	{
  		headers: this.authHeader()
  	})
  	.map(res => {
  		return res.json()
  	});
  }

  public removeTodo(id: string) {
    return this.http.delete(this.api_url + '/1/objects/todos/' + id,
    {
      headers: this.authHeader()
    })
    .map(res => {
      return res.json();
    });
  }

}
