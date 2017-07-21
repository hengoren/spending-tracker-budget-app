import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { BackandProvider } from '../../providers/backand/backand';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	transactions = []

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public backandService: BackandProvider) {
  	this.loadTransactions()
  }

  private loadTransactions() {
  	this.backandService.getTransactions()
  	.subscribe(
  		data => {
  			this.transactions = data.data
  		},
  		err => this.logError(err)
  		);
  }

  public transactionSelected(item: {}) {
  	console.log('selected item: ', item)
  }

  public createTransaction() {
  	let prompt = this.alertCtrl.create({
  		title: 'New transaction',
  		message: "What did your weakass buy?",
  		inputs: [
  			{
  				name: 'name',
  				placeholder: 'Name'
  			},
  			{
  				name: 'description',
  				placeholder: 'Description'
  			},
  			{
  				name: 'receiver',
  				placeholder: 'Who did you make this payment to?'
  			},
  			{
  				name: 'amount',
  				placeholder: 'Enter amount in $'
  			}
  		],
  		buttons: [
  			{
  				text: 'Cancel',
  				handler: data => {
  					console.log('Cancel clicked');
  				}
  			},
  			{
  				text:'Save',
  				handler: data => {
  					this.saveTransaction(data.name, data.description, data.receiver, data.amount);
  				}
  			}
  		]
  	})
  	prompt.present()
  }

  public saveTransaction(name: string, description: string, receiver: string, amount: number) {
    this.backandService.addTransaction(name, description, receiver, amount).subscribe(
      data => {
        this.transactions.push(data);
      },
      err => this.logError(err)
    );
  }

  public removeTransaction(id: string) {
    this.backandService.removeTransaction(id).subscribe(
      data => {
        this.loadTransactions();
      },
      err => this.logError(err)
    );
  }
 
  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

}
