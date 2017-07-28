import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { BackandProvider } from '../../providers/backand/backand';

/**
 * Generated class for the BudgetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  doughnutChart: any;
  barChart: any;
  lineChart: any;

  transactions = []
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public backandService: BackandProvider) {
  	//this.createTotalExpenseDict()
  	
  }

  // private loadTransactions() {
  // 	this.backandService.getTransactions()
  // 	.subscribe(
  // 		data => {
  // 			console.log(data.data);
  // 			this.transactions = data.data;
  // 		},
  // 		err => this.logError(err)
  // 		);
  // }

  private loadTransactions(callback) {
  	// dictionary for storing total expenses by category

  	this.backandService.getTransactions()
  	.subscribe(data => {
  		// populate array with all transactions
  		this.transactions = data.data;
	  	var transactionDict = callback(this.transactions);
	  	var labelArr = Object.keys(transactionDict);
	  	var dataArr = [];

	  	for (var i = 0; i < labelArr.length; i++) {
	  		dataArr[i] = transactionDict[labelArr[i]];
	  	}
	  	this.makeCharts(labelArr, dataArr);
	  });
  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

  // public getCategories(transactions) {
  // 	let totalExpenseDict = {};
  // 	for (var i = 0; i < transactions.length; i++) {
	 //  		if (transactions[i].category in totalExpenseDict) {
	 //  			totalExpenseDict[transactions[i].category] = totalExpenseDict[transactions[i].category] + transactions[i].amount;
	 //  		}
	 //  		else {
	 //  			totalExpenseDict[transactions[i].category] = transactions[i].amount;
	 //  		}
	 // }
	 // console.log(totalExpenseDict)
  // }

  ionViewDidLoad() {
  	this.loadTransactions(transactions => {
  		let totalExpenseDict = {};
	  	for (var i = 0; i < transactions.length; i++) {
		  		if (transactions[i].category in totalExpenseDict) {
		  			totalExpenseDict[transactions[i].category] = totalExpenseDict[transactions[i].category] + transactions[i].amount;
		  		}
		  		else {
		  			totalExpenseDict[transactions[i].category] = transactions[i].amount;
		  		}
		 }
		console.log(totalExpenseDict)
  		return totalExpenseDict;
  	
  	});
  }
  public makeCharts(labelArr, dataArr) {
  	this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
            labels: labelArr,
            datasets: [{
                label: '# of Votes',
                data: dataArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
        }

    });

    this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        }
    });
   }s
}
