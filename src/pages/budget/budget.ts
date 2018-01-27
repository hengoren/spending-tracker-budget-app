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
	  	var labelArr = ["Luxury", "Groceries", "Transportation  ", "Miscellaneous", "Food", "Recreation"]
	  	var dataArr = [];

	  	for (var i = 0; i < Object.keys(transactionDict).length; i++) {
        var idx_val = i + 1
        var keystr = idx_val.toString()
        var month_values = Object.keys(transactionDict[keystr]).map(function(key){
          return transactionDict[keystr][key]
        });
        dataArr[i] = month_values;
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
  		let totalExpenseDict = {'1':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '2':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '3':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '4':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '5':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '6':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '7':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '8':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '9':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '10':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '11':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}, 
      '12':{"Luxury":0, "Groceries":0, "Transportation  ":0, "Miscellaneous":0, "Food":0, "Recreation":0}};
      // let totalExpenseDict = {}
	  	for (var i = 0; i < transactions.length; i++) {
          var local_date = new Date(transactions[i].createdAt)
          var local_month = local_date.getMonth() + 1
          var month_key = local_month.toString()
		  		if (transactions[i].category in totalExpenseDict[month_key]) {
		  			totalExpenseDict[month_key][transactions[i].category] = totalExpenseDict[month_key][transactions[i].category] + transactions[i].amount;
		  		}
		  		else {
		  			totalExpenseDict[month_key][transactions[i].category] = transactions[i].amount;
		  		}
		 }
  //    for (var i = 0; i < transactions.length; i++) {
  //         if (transactions[i].category in totalExpenseDict) {
  //           totalExpenseDict[transactions[i].category] = totalExpenseDict[transactions[i].category] + transactions[i].amount;
  //         }
  //         else {
  //           totalExpenseDict[transactions[i].category] = transactions[i].amount;
  //         }
  //    }
		// console.log(totalExpenseDict)
  		return totalExpenseDict;
  	
  	});
  }
  public makeCharts(labelArr, dataArr) {
    
    var donut_dataArr = []
    for (var cat = 0; cat < labelArr.length; cat++) {
      var to_append = 0
      for (var month = 0; month < dataArr.length; month++) {
        to_append += dataArr[month][cat]
      }
      donut_dataArr.push(to_append)
    }

  	this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
            labels: labelArr,
            datasets: [{
                label: 'label',
                data: donut_dataArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                    
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'

                    
                ]
            }]
        }

    });

    var bar_line_dataArr = []
    for (var cat = 0; cat < labelArr.length; cat++) {
      bar_line_dataArr.push([])
      for (var month = 0; month < dataArr.length; month++) {
        bar_line_dataArr[cat].push(dataArr[month][cat])
      } 
    }


    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    
                    
                    
                    label: labelArr[0],
                    data: bar_line_dataArr[0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: labelArr[1],
                    data: bar_line_dataArr[1],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: labelArr[2],
                    data: bar_line_dataArr[2],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                },
                {
                label: labelArr[3],
                    data: bar_line_dataArr[3],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: labelArr[4],
                    data: bar_line_dataArr[4],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: labelArr[5],
                    data: bar_line_dataArr[5],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{stacked: true}],
                yAxes: [{stacked: true}]
            },
            tooltips: {
              mode: 'label'
            }
        }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {

                    label: labelArr[0],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255, 99, 132, 0.4)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: bar_line_dataArr[0],
                    spanGaps: false,
                },
                {
                    label: labelArr[1],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: bar_line_dataArr[1],
                    spanGaps: false,
                },
                {
                    label: labelArr[2],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255, 206, 86, 0.4)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 206, 86, 1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
                    pointHoverBorderColor: 'rgba(255, 206, 86, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: bar_line_dataArr[2],
                    spanGaps: false,
                },
                {
                    label: labelArr[3],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: bar_line_dataArr[3],
                    spanGaps: false,
                },
                {
                    label: labelArr[4],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(153, 102, 255, 0.4)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(153, 102, 255, 1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
                    pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: bar_line_dataArr[4],
                    spanGaps: false,
                },
                {
                    label: labelArr[5],
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255, 159, 64, 0.4)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 159, 64, 1)',
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
                    pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: bar_line_dataArr[5],
                    spanGaps: false,
                }
            ]
        }
    });
   }s
}
