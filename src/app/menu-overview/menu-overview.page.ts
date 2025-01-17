import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
import { VarConstants, } from "../config/variable-constants";
import * as HighCharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(HighCharts);
import Tree from 'highcharts/modules/treemap';
Tree(HighCharts);
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(HighCharts);
import { Chart } from 'angular-highcharts';
import { jsonEval } from '@firebase/util';
import { AuthConstants, } from "../config/auth-constants";
import { VariableService } from '../services/variables/variable.service';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
})
export class MenuOverviewPage implements OnInit {
  isDesktop: boolean;
  column: any;
  pie: any;
  gender:any = 'M';
  type:any = 'Current Smoker';
  age:any = '20';
  dm:any = 'No';
  constructor(
    private screensizeService: ScreenSizeService,
    public router: Router,
    private crudService: CrudService,
    public variable:VariableService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  maritalStatusCount: any;
  maritalStatusCount1: any;
  patientData: any;
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  ngOnInit() {
    this.patientData=[];
    this.crudService.getData('testAdd4').subscribe(
      res => {
        //console.log(res);
       // this.patientData = res;
        res.forEach(element => {
          if( element['LAST NAME'] != undefined){
            this.patientData.push(element);
          }
        });
      }
    );
    this.maritalStatusCount = [];
    let resP;
    this.crudService.getData('maritalStatusCount').subscribe(
      res => {
        this.maritalStatusCount=[];
        Object.keys(res).forEach((key) => {
          var value = res[key];
          this.maritalStatusCount.push({ name: value.statusTitle, y: value.statusCount });
        });
        this.populatePieChart();
        this.dataChange('a');
        this.dataprofile2=[];
      }
    );
  }

  v00=0;v01=0;v02=0;v03=0;v04=0;
  v10=0;v11=0;v12=0;v13=0;v14=0;
  v20=0;v21=0;v22=0;v23=0;v24=0;
  v30=0;v31=0;v32=0;v33=0;v34=0;
  v40=0;v41=0;v42=0;v43=0;v44=0;



  dataChange(data){
    console.log(this.dm);

    if(this.heatMap != undefined){
      this.heatMap.destroy();
    }
    if(this.gender != undefined && this.type != undefined && this.age != undefined ){
      this.dataprofile22=[];
      this.v00=0;this.v01=0;this.v02=0;this.v03=0;this.v04=0;
      this.v10=0;this.v11=0;this.v12=0;this.v13=0;this.v14=0;
      this.v20=0;this.v21=0;this.v22=0;this.v23=0;this.v24=0;
      this.v30=0;this.v31=0;this.v32=0;this.v33=0;this.v34=0;
      this.v40=0;this.v41=0;this.v42=0;this.v43=0;this.v44=0;
      let dataasdasda:any;
      this.crudService.getHeatMapData('testAdd4',this.gender,this.type,this.age,this.dm).subscribe(
        res=>{
          console.log(res);

          if (res.docs.length === 0) {
          } else {
            res.docs.forEach(doc => {
              this.dataprofile22.push(doc.data());
            })
          }
        },(error) => {
        },() =>{
          this.v00=0;this.v01=0;this.v02=0;this.v03=0;this.v04=0;
          this.v10=0;this.v11=0;this.v12=0;this.v13=0;this.v14=0;
          this.v20=0;this.v21=0;this.v22=0;this.v23=0;this.v24=0;
          this.v30=0;this.v31=0;this.v32=0;this.v33=0;this.v34=0;
          this.v40=0;this.v41=0;this.v42=0;this.v43=0;this.v44=0;
          this.dataprofile22.forEach(element => {
            //Variables
          let CHOLES = (element[this.variable.Cholesterol]/38.67);
          let SBP = element[this.variable.SBP];

          if( SBP >= 180 && CHOLES >= 4 && CHOLES < 5 ){
            this.v00 += 1;
          }else if(SBP >= 160 && SBP < 180 && CHOLES >= 4 && CHOLES < 5){
            this.v01 += 1;
          }else if(SBP >= 140 && SBP < 160 && CHOLES >= 4 && CHOLES < 5){
            this.v02 += 1;
          }else if(SBP >= 120 && SBP < 140 && CHOLES >= 4 && CHOLES < 5){
            this.v03 += 1;
          }else if(SBP >= 110 && SBP < 120 && CHOLES >= 4 && CHOLES < 5){
            this.v04 += 1;
          }

          if( SBP >= 180 && CHOLES >= 5 && CHOLES < 6 ){
            this.v10 += 1;
          }else if(SBP >= 160 && SBP < 180 && CHOLES >= 5 && CHOLES < 6){
            this.v11 += 1;
          }else if(SBP >= 140 && SBP < 160 && CHOLES >= 5 && CHOLES < 6){
            this.v12 += 1;
          }else if(SBP >= 120 && SBP < 140 && CHOLES >= 5 && CHOLES < 6){
            this.v13 += 1;
          }else if(SBP >= 110 && SBP < 120 && CHOLES >= 5 && CHOLES < 6){
            this.v14 += 1;
          }

          if( SBP >= 180 &&                   CHOLES >= 6 && CHOLES < 7 ){
            this.v20 += 1;
          }else if(SBP >= 160 && SBP < 180 && CHOLES >= 6 && CHOLES < 7){
            this.v21 += 1;
          }else if(SBP >= 140 && SBP < 160 && CHOLES >= 6 && CHOLES < 7){
            this.v22 += 1;
          }else if(SBP >= 120 && SBP < 140 && CHOLES >= 6 && CHOLES < 7){
            this.v23 += 1;
          }else if(SBP >= 110 && SBP < 120 && CHOLES >= 6 && CHOLES < 7){
            this.v24 += 1;
          }

          if( SBP >= 180 &&                   CHOLES >= 7 && CHOLES < 8 ){
            this.v30 += 1;
          }else if(SBP >= 160 && SBP < 180 && CHOLES >= 7 && CHOLES < 8){
            this.v31 += 1;
          }else if(SBP >= 140 && SBP < 160 && CHOLES >= 7 && CHOLES < 8){
            this.v32 += 1;
          }else if(SBP >= 120 && SBP < 140 && CHOLES >= 7 && CHOLES < 8){
            this.v33 += 1;
          }else if(SBP >= 110 && SBP < 120 && CHOLES >= 7 && CHOLES < 8){
            this.v34 += 1;
          }

          if( SBP >= 180 &&                   CHOLES >= 8 ){
            this.v40 += 1;
          }else if(SBP >= 160 && SBP < 180 && CHOLES >= 8 ){
            this.v41 += 1;
          }else if(SBP >= 140 && SBP < 160 && CHOLES >= 8 ){
            this.v42 += 1;
          }else if(SBP >= 120 && SBP < 140 && CHOLES >= 8){
            this.v43 += 1;
          }else if(SBP >= 110 && SBP < 120 && CHOLES >= 8){
            this.v44 += 1;
          }
          });


          this.populateHeatMap();
        }
      );
    }
  }
  dataprofile2:any;
  dataprofile22:any;












  populateColumnChart() {
    ////console.log(this.maritalStatusCount);
    this.column = new Chart({
      chart: {
        type: "column",
      },
      title: {
        text: 'Marital Status Count'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: ''
        }

      },

      legend: {
        layout: "horizontal",
        align: "center",
        verticalAlign: "bottom",
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> {point.percentage:.0f} %'
      },

      series: [
        {
          name: "Status Count",
          colorByPoint: true,
          type: undefined,
          data: this.maritalStatusCount
        }
      ], credits: { enabled: false },
    });
  }







  populatePieChart() {
    let piechart = HighCharts.chart('asdasdasd', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Marital Status Count'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} <br /> {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        type: undefined,
        data: this.maritalStatusCount
      }],credits: { enabled: false },
    });
    setTimeout(() => { piechart.reflow() }, 1000);
  }

  heatMap:any;


  populateHeatMap(){
/*
    HighCharts.setOptions({
      colors: ['#8B0000', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
     });
*/

    function getPointCategoryName(point, dimension) {
      var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
      return axis.categories[point[isY ? 'y' : 'x']];
    }

    this.heatMap = HighCharts.chart('heatmap', {

      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },


      title: {
        text: 'WPR B People w/ Diab'
      },

      xAxis: {
        categories: ['4', '5', '6', '7', '8']
      },

      yAxis: {
        categories: ['180', '160', '140', '120', '110'],
        title: null,
        reversed: true
      },
     colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: HighCharts.getOptions().colors[0]
      },
      tooltip: {
        formatter: function () {
          return '<b>' +getPointCategoryName(this.point, 'y')+' SBP <br />' +
          getPointCategoryName(this.point, 'x') +' mmo/l'+ '<br />total : '+this.point.value+'</b>';
        }
      },

      series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        type: undefined,

        // 8b0000 - dark red
        // FF0000 - red
       // FF8C00 - orange
        // FFFF00 - yellow
        // 00FF00 - green
        data: [
          {
            x: 0,y: 0,value: this.v00,color: "#FF0000"
          },{
            x: 0,y: 1,value: this.v01,color: "#FF8C00"
          },{
            x: 0,y: 2,value: this.v02,color: "#FFFF00"
          },{
            x: 0,y: 3,value: this.v03,color: "#00FF00"
          },{
            x: 0,y: 4,value: this.v04,color: "#00FF00"
          },

          {
            x: 1,y: 0,value: this.v10,color: "#8b0000"
          },{
            x: 1,y: 1,value: this.v11,color: "#FF0000"
          },{
            x: 1,y: 2,value: this.v12,color: "#FF8C00"
          },{
            x: 1,y: 3,value: this.v13,color: "#FFFF00"
          },{
            x: 1,y: 4,value: this.v14,color: "#00FF00"
          },


          {
            x: 2,y: 0,value: this.v20,color: "#8b0000"
          },{
            x: 2,y: 1,value: this.v21,color: "#8b0000"
          },{
            x: 2,y: 2,value: this.v22,color: "#FF0000"
          },{
            x: 2,y: 3,value: this.v23,color: "#FF8C00"
          },{
            x: 2,y: 4,value: this.v24,color: "#FFFF00"
          },

          {
            x: 3,y: 0,value: this.v30,color: "#8b0000"
          },{
            x: 3,y: 1,value: this.v31,color: "#8b0000"
          },{
            x: 3,y: 2,value: this.v32,color: "#8b0000"
          },{
            x: 3,y: 3,value: this.v33,color: "#FF0000"
          },{
            x: 3,y: 4,value: this.v34,color: "#FF8C00"
          },

          {
            x: 4,y: 0,value: this.v40,color: "#8b0000"
          },{
            x: 4,y: 1,value: this.v41,color: "#8b0000"
          },{
            x: 4,y: 2,value: this.v42,color: "#8b0000"
          },{
            x: 4,y: 3,value: this.v43,color: "#8b0000"
          },{
            x: 4,y: 4,value: this.v44,color: "#FF0000"
          },
      ],



        /*data: [
          [0, 0, this.v00,], [0, 1, this.v01], [0, 2, this.v02], [0, 3, this.v03],[0, 4, this.v04],
          [1, 0, this.v10], [1, 1, this.v11], [1, 2, this.v12], [1, 3, this.v13],[1, 4, this.v14],
          [2, 0, this.v20], [2, 1, this.v21], [2, 2, this.v22], [2, 3, this.v23],[2, 4, this.v24],
          [3, 0, this.v30], [3, 1, this.v31], [3, 2, this.v32], [3, 3, this.v33],[3, 4, this.v34],
          [4, 0, this.v40], [4, 1, this.v41], [4, 2, this.v42], [4, 3, this.v43],[4, 4, this.v44],

          ],*/
        dataLabels: {
          enabled: true,
         // color: '#000000'
        }
      }], credits: { enabled: false },



    });
    setTimeout(() => { this.heatMap.reflow() }, 1000);
  }



}
