import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BudgetDataServiceService } from '../budget-data-service.service';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;
@Component({
  selector: 'app-visualize-data',
  templateUrl: './visualize-data.component.html',
  styleUrls: ['./visualize-data.component.scss']
})
export class VisualizeDataComponent implements OnInit, AfterViewInit {
  budgetDataArray: any[] = [];
  years: any[] = [];
  columnNames: any[] = [];
  currentColName = null;
  selectedYear = null;

  constructor(private budgetData: BudgetDataServiceService) { }
  ngAfterViewInit(): void {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.budgetData.getData().subscribe(data => {
      const list = data.split('\n');
      const headers: string[] = list[0].split(',').map((x) => x.replace(/\s/g, ''));
      this.columnNames = headers.slice(3);
      const set = new Set();


      for (let i = 1; i < list.length; i++) {
        const row = list[i].split(',');
        const budget: any = {};
        headers.forEach((header, index) => {
          budget[header] = row[index];
        });
        if (budget['FiscalYear']) {
          set.add(budget['FiscalYear']);
          this.budgetDataArray.push(budget);
        }
      }

      this.years = [...set];

    });
  }

  getFilteredData(data: any[], year: any, colName: any) {
    if (!year || !colName) {
      return;
    }
    const filteredData = data.filter((d) => d['FiscalYear'] == year).map((e) => {
      return {
        x: e['State_UT'],
        y: e[colName]
      }
    })
    this.drawChart(filteredData, colName)
  }

  drawChart(data: any[], colName: string) {
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);
    let option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: data.map((d) => d.x),
        name: 'States',
        nameLocation: 'middle',
        nameGap: 60,
        axisLabel: {
          rotate: 35
        },
        nameTextStyle:{
          textBorderType:'solid',
          textBorderWidth:1,
          textBorderColor:'black',
        }
      },
      yAxis: {
        type: 'value',
        name: colName,
        nameLocation: 'middle',
        nameGap: 60,
        nameTextStyle:{
          textBorderType:'solid',
          textBorderWidth:1,
          textBorderColor:'black',
        }
      },
    
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        }
      },
      series: [
        {
          data: data.map((d) => d.y),
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }
  selectionChanged() {
    this.getFilteredData(this.budgetDataArray, this.selectedYear, this.currentColName)
  }


}
