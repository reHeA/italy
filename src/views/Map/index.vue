<script  lang="ts" setup>
import { nextTick, onMounted, ref, components } from 'vue';
import ButNav from '@/components/ButNav/index.vue';
import * as echarts from 'echarts';
import Italy from './Italy.json';
onMounted(() => {
  nextTick(() => {
    initMap();
  });
});
const initMap = () => {
  const chartDom: HTMLElement | null = document.getElementById('main');
  const charts = echarts.init(chartDom);
  const Veniceicon: string = '';
  var Firenzeicon: string = '';
  var iconBs: string = '';
  var Palermoicon: string = '';
  var iconlm: string = '';
  var iconsln: string = '';
  var iconml: string = '';
  const data: any = Italy;
  echarts.registerMap('italy', data);
  var geoCoordMap = {
    威尼斯: [12.322281, 45.441252],
    佛罗伦萨: [11.256387, 43.788085],
    巴勒莫: [13.358278, 38.131369],
    罗马: [12.457817, 41.955193],
    比萨: [10.39732, 43.741939],
    米兰: [9.189982, 45.474316],
    萨莱诺: [14.765024, 40.685509]
  };
  var data1 = [
    {
      name: '威尼斯'
    },
    {
      name: '佛罗伦萨'
    },
    {
      name: '巴勒莫'
    }
  ];
  var data2 = [
    {
      name: '米兰'
    },
    {
      name: '罗马'
    },
    {
      name: '比萨'
    },
    {
      name: '萨莱诺'
    }
  ];
  var Palermo = [
    {
      value: [13.358278, 38.531369, 350],
      type: 'Palermo'
    }
  ];
  var Venice = [
    {
      value: [12.322281, 45.841252, 350],
      type: 'Venice'
    }
  ];

  var Firenze = [
    {
      value: [11.256387, 44.088085, 350],
      type: 'Firenze'
    }
  ];
  var milan = [
    {
      value: [9.189982, 45.974316, 300],
      type: 'milan'
    }
  ];

  var luoma = [
    {
      value: [12.457817, 42.355193, 300],
      type: 'luoma'
    }
  ];

  var sln = [
    {
      value: [14.765024, 41.085509, 300],
      type: 'sln'
    }
  ];

  var bisa = [
    {
      value: [10.29732, 44.441939, 300],
      type: '比萨'
    }
  ];

  const option = {
    backgroundColor: '#0f375f',
    tooltip: {
      show: false
    },

    geo: {
      show: true,
      map: 'italy',

      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      zoom: 1.2,
      roam: false,
      itemStyle: {
        normal: {
          areaColor: 'transparent',
          borderColor: '#3fdaff',
          borderWidth: 1,
          shadowColor: 'rgba(63, 218, 255, 0.5)',
          shadowBlur: 10
        },
        emphasis: {
          areaColor: '#2B91B7'
        }
      }
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 12,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          show: false,
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#05C3F9',
            shadowBlur: 10,
            shadowColor: '#05C3F9'
          }
        },
        zlevel: 1
      },

      {
        name: '威尼斯',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: Venice,
        symbol: Veniceicon,
        label: {
          show: false,
          normal: {
            show: false,
            position: 'right',
            color: '#fff',
            fontSize: '8'
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ea6347',
            borderWidth: 2,
            borderColor: '#f4b391'
          }
        }
      },
      {
        name: '佛罗伦萨',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: Firenze,
        symbol: Firenzeicon,
        label: {
          normal: {
            show: false,

            position: 'right',
            color: '#fff',
            fontSize: '8'
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#00ff00',
            borderWidth: 2,
            borderColor: '#55E355'
          }
        }
      },

      {
        name: '巴勒莫',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: Palermo,
        symbol: Palermoicon,
        label: {
          normal: {
            show: false,
            position: 'right',
            color: '#fff',
            fontSize: '8'
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ea6347',
            borderWidth: 2,
            borderColor: '#f4b391'
          }
        }
      },
      {
        name: '比萨',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: bisa,
        symbol: iconBs,
        label: {
          normal: {
            show: true,
            formatter: '比萨',
            position: 'left',
            color: '#fff',
            fontSize: '12',
            offset: [15, 0]
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ea6347',
            borderWidth: 2,
            borderColor: '#f4b391'
          }
        },
        silent: true
      },
      {
        name: '米兰',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: milan,
        symbol: iconml,
        label: {
          normal: {
            show: true,
            formatter: '米兰',
            position: 'left',
            color: '#fff',
            fontSize: '12',
            offset: [5, 0]
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ea6347',
            borderWidth: 2,
            borderColor: '#f4b391'
          }
        },
        silent: true
      },
      {
        name: '罗马',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: luoma,
        symbol: iconlm,
        label: {
          normal: {
            show: true,
            formatter: '罗马',
            position: 'left',
            color: '#fff',
            fontSize: '12'
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ea6347',
            borderWidth: 2,
            borderColor: '#f4b391'
          }
        },
        silent: true
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: sln,
        symbol: iconsln,
        label: {
          normal: {
            show: true,
            formatter: '萨莱诺',
            position: 'left',
            color: '#fff',
            fontSize: '12',
            offset: [10, 0]
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ea6347',
            borderWidth: 2,
            borderColor: '#f4b391'
          }
        },
        silent: true
      }
    ]
  };
  charts.setOption(option);
};
</script>
<template>
  <div id="main" ref="map"></div>
  <ButNav />
</template>
<style scoped>
#main {
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
.logo {
  position: fixed;
  z-index: 1;
  top: 16px;
  right: 16px;
  background-repeat: no-repeat;
  width: 144px;
  height: 100px;
}
</style>
