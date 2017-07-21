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
  				placeholder: 'Item'
  			},
  			{
  				name: 'description',
  				placeholder: 'Description'
  			},
  			{
  				name: 'payed to',
  				placeholder: 'Recipient'
  			},
  			{
  				name: 'amount',
  				placeholder: 'Enter amount in $'
  			},
        {
          name: 'category',
          placeholder: 'Select category'
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
  					this.saveTransaction(data.name, data.description, data.recipient, data.amount, data.category);
  				}
  			}
  		]
  	})
  	prompt.present()
  }

  public saveTransaction(name: string, description: string, recipient: string, amount: number, category: string) {
    this.backandService.addTransaction(name, description, recipient, amount, category).subscribe(
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
