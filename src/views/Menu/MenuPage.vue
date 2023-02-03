<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>สั่งอาหาร</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">สั่งอาหาร</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar>

      <!-- A segment that is scrollable. It has two buttons, one for all menu and one for each category. -->
      <ion-segment :scrollable="true" value="all">
        <ion-segment-button value="all" @click="allMenu()">
          <ion-label>ทั้งหมด</ion-label>
        </ion-segment-button>
        <ion-segment-button v-for="i in categorymenudata" :key="i.Key" :value="i.Key" @click="filterMenu(i.Key)">
          <ion-label>{{ i.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid>
        <ion-row>
          <!-- <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name" :routerLink="i.name">
          <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name" :routerLink="i.name"> -->
          <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name">
            <router-link :to="{
              name: 'option', params: {
                name: i.name, category: i.categorykey
              }
            }">
              <ion-card>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <ion-card-header>
                  <ion-card-title>{{ i.name }}</ion-card-title>
                  <ion-card-subtitle>{{ i.price }} THB</ion-card-subtitle>
                </ion-card-header>
              </ion-card>
            </router-link>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button routerLink="/ListMenu">
        <ion-icon :icon="fastFood"></ion-icon>
      </ion-fab-button>
    </ion-fab>

  </ion-page>
</template>

<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonLabel, IonSegment, IonSegmentButton, IonFab, IonFabButton,
} from '@ionic/vue';
import { fastFood, time, } from 'ionicons/icons';
import axios from 'axios';

const dataurl = "https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/"
// const datamenu: MyData[] = [];

export default defineComponent({
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    // IonCardContent,
    IonSearchbar,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonFab,
    IonFabButton,
  },
  data() {
    return {
      listmenu: [
        {
          name: 'ข้าวเปล่า',
          price: '10',
          url: '/folder/ข้าวเปล่า',
          Key: 'M01',
        },
        {
          name: 'ราดหน้า',
          price: '70',
          url: '/folder/ราดหน้า',
          Key: 'M01',
        },
        {
          name: 'ข้าวราดผักพริกหยวก',
          price: '70',
          url: '/folder/ข้าวราดผักพริกหยวก',
          Key: 'M02',
        },
        {
          name: 'ข้าวผัดอเมริกัน',
          price: '130',
          url: '/folder/ข้าวผัดอเมริกัน',
          Key: 'M02',
        },
        {
          name: 'สุกี้',
          price: '70',
          url: '/folder/สุกี้',
          Key: 'M03',
        },
        {
          name: 'ข้าวราดพะแนง',
          price: '70',
          url: '/folder/ข้าวราดพะแนง',
          Key: 'M03',
        },
        {
          name: 'ข้าวต้ม',
          price: '60',
          url: '/folder/ข้าวต้ม',
          Key: 'M04',
        },
        {
          name: 'ข้าวราดผัดผักรวมมิตร',
          price: '70',
          url: '/folder/ข้าวราดผัดผักรวมมิตร',
          Key: 'M04',
        },
        {
          name: 'ข้าวราดผักคะน้าหมูกรอบ',
          price: '89',
          url: '/folder/ข้าวราดผักคะน้าหมูกรอบ',
          Key: 'M04',
        },
        {
          name: 'ข้าวราดผักคะน้าปลาเค็ม',
          price: '75',
          url: '/folder/ข้าวราดผักคะน้าปลาเค็ม',
          Key: 'M05',
        },
        {
          name: 'ผัดไทยห่อไข่',
          price: '79',
          url: '/folder/ผัดไทยห่อไข่',
          Key: 'M05',
        },
        {
          name: 'ข้าวอบสับปะรด',
          price: '120',
          url: '/folder/ข้าวอบสับปะรด',
          Key: 'M05',
        },
      ],
      categorymenu: [
        {
          name: 'อาหารจานเดียว',
          category: 1,
        },
        {
          name: 'ยำ',
          category: 2,
        },
        {
          name: 'กับข้าว',
          category: 3,
        },
        {
          name: 'ต้ม',
          category: 4,
        },
        {
          name: 'ทอด',
          category: 5,
        },
        {
          name: 'เครื่องดื่ม',
          category: 6,
        },
      ],
      filteredMenu: [],
      categorymenudata: [],
      // listmenudata: [],
      listmenudataarray: [],
      // listmenudata2: {},
    }
  },

  setup() {
    return {
      fastFood,
    }
  },

  methods: {
    async getCategoryFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}categorymenu.json`);
        this.categorymenudata = response.data
      } catch (error) {
        console.error(error);
      }
      console.log("getCategoryFromDatabase categorymenudata " + JSON.stringify(this.categorymenudata))
    },
    async getMenuFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}listmenu.json`);
        console.log("x getMenuFromDatabase", JSON.stringify(response.data));
        this.listmenudataarray = Object.values(response.data);
        console.log("xx getMenuFromDatabase", this.listmenudataarray);

        // this.listmenudata = Object.entries(this.listmenudata);
        // console.log("xxx",JSON.stringify(this.listmenudata));
        // console.log("xxxx",JSON.stringify(this.listmenu));
      } catch (error) {
        console.error(error);
      }
      // console.log("getMenuFromDatabase listmenudata " + JSON.stringify(this.listmenudata))
      this.allMenu();
    },

    allMenu() {
      // this.getMenuFromDatabase()
      this.filteredMenu = this.listmenudataarray
      console.log("allMemu listmenudata ", this.filteredMenu)
      // console.log(JSON.stringify(this.filteredMenu))
      // console.log("???")
    },
    filterMenu(iddata: string) {
      // console.log("filterMenu 1 categorymenudata " + JSON.stringify(this.categorymenudata))
      // console.log("iddata 2 iddata " + iddata)
      // console.log("filterMenu 3 listmenudata " + JSON.stringify(this.listmenudata))
      // console.log("filterMenu 4 filteredMenu " + this.filteredMenu)
      // const listmenudata2 = Object.entries(JSON.stringify(this.listmenudata));
      // const listmenudata2 = Object.keys(this.listmenudata).map(key => listmenudata);
      // const listmenudata2 = JSON.stringify(this.listmenudata);
      // console.log("filterMenu xx listmenudata " + listmenudata2);
      // this.filteredMenu = listmenudata2.filter(item => item.categorykey === iddata)
      this.filteredMenu = this.listmenudataarray.filter((item: { categorykey: string; }) => item.categorykey === iddata)
      console.log("filteredMenu filteredMenu", this.filteredMenu);
      // console.log("filterMenu 5 filteredMenu " + this.filteredMenu)
    },
  },

  created() {
    this.getCategoryFromDatabase();
    this.getMenuFromDatabase();
  },

  // beforeMount() {
  //   this.allMenu();
  //   console.log("allMemu listmenudata " + JSON.stringify(this.listmenudata))
  // },

  // mounted() {
  //   this.allMenu();
  //   console.log("allMemu listmenudata " + JSON.stringify(this.listmenudata))
  // },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

ion-col {
  /* background-color: #3c4c4a; */
  /* border: solid 0.5px #fff; */
  border-radius: 5px;
  color: #fff;
  text-align: center;
}

ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>