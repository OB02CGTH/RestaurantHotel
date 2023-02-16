<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>ออเดอร์เชฟ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ออเดอร์เชฟ</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar> -->

      <ion-segment :scrollable="true" :value="page">
        <ion-segment-button v-for="c, index in categorymenu" :key="index" :value="c.statorder"
          @click="filterOrder(c.statorder)">
          <ion-label>{{ c.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-item v-if="page === 1">
        <ion-label slot="start">เสร็จบางเมนู</ion-label>
        <ion-toggle v-model="toggleValue" slot="end"></ion-toggle>
      </ion-item>

      <ion-grid>
        <ion-row>
          <ion-col :sizeXs="12" :sizeMd="6" v-for="(i, indexi) in filteredOrder" :key="indexi">
            <ion-card>

              <!-- Title -->
              <ion-card-header v-if="i.statorder != 4">
                <ion-card-title>{{ i.ordertype }}: {{ i.ordernum }}</ion-card-title>
              </ion-card-header>
              <ion-card-header v-else color="danger">
                <ion-card-title>{{ i.ordertype }}: {{ i.ordernum }}</ion-card-title>
              </ion-card-header>

              <!-- Optional -->
              <ion-card-content>
                <div v-for="(n, indexn) in i.menu" :key="indexn">

                  <!-- Menu Normal -->
                  <ion-item v-if="n.statmenu != 4" lines="none">
                    <ion-label slot="start" text-wrap>
                      x{{ n.quantity }}{{ n.menu_name }} <br>
                      <ion-text v-for="O, indexo in n.menu_option" :key="indexo" color="medium" class="ion-text-wrap">{{
                        O
                      }} &nbsp;</ion-text> <br>
                      <!-- <ion-text v-if="n.note">{{ n.note }}</ion-text> -->
                    </ion-label>
                    <ion-label slot="end">{{ n.price * n.quantity }}</ion-label>
                    <!-- <ion-button v-if="toggleValue && i.statorder === 1" @click="menusuc(indexi, indexn)" slot="end" fill="outline">เสร็จ</ion-button> -->
                  </ion-item>

                  <!-- Menu not raady -->
                  <ion-item v-else lines="none">
                    <ion-label slot="start" color="danger" text-wrap>
                      x{{ n.quantity }}{{ n.menu_name }} <br>
                      <ion-text v-for="O, indexo in n.menu_option" :key="indexo" color="medium" class="ion-text-wrap">{{
                        O
                      }} &nbsp;</ion-text> <br>
                      <!-- <ion-text v-if="n.note">{{ n.note }}</ion-text> -->
                    </ion-label>
                    <ion-label slot="end" color="danger">{{ n.price * n.quantity }}</ion-label>
                    <!-- <ion-button v-if="toggleValue && i.statorder === 1" @click="menusuc(indexi, indexn)" slot="end" fill="outline">เสร็จ</ion-button> -->
                  </ion-item>

                </div>

                <ion-text v-if="i.note" slot="start">
                  <p>หมายเหตุออเดอร์: {{ i.note }}</p>
                </ion-text>

                <ion-text>
                  <h1>รวม {{ sumprice(i.menu) }} บาท</h1>
                </ion-text>
              </ion-card-content>

              <ion-button v-if="i.statorder === 1" @click="readytoserve(i.idorder)" expand="block" color="success">พร้อมเสิร์ฟ</ion-button>
              <!-- <ion-button v-if="i.statorder === 4" expand="block" color="warning">แก้ไขออเดอร์</ion-button> -->

            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonSegment, IonSegmentButton, IonItem, IonButton, IonCheckbox, IonFooter, IonText, IonToggle,
} from '@ionic/vue';
import axios from 'axios';
import { pricetag } from 'ionicons/icons';

const api = axios.create({ baseURL: 'https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/' });

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
    IonCardTitle,
    // IonCardSubtitle,
    IonCardContent,
    // IonSearchbar,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonItem,
    IonButton,
    // IonCheckbox,
    // IonFooter,
    IonText,
    IonToggle,
  },
  data() {
    return {
      ordermenu: [
        {
          ordertype: 'โต๊ะ',
          ordernum: 'A01',
          menu: [
            { name: 'ราดหน้า', price: 70, quantity: 1, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: '???' },
            { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'สุกี้', price: 70, quantity: 2, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
          ],
          statorder: 1,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'ห้อง',
          ordernum: '205',
          menu: [
            { name: 'ข้าวต้ม', price: 60, quantity: 1, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'สุกี้', price: 70, quantity: 2, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: '???' },
          ],
          statorder: 1,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'โต๊ะ',
          ordernum: 'A02',
          menu: [
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, statmenu: 2, option: ['ตัวเลือก1', 'ตัวเลือก2', 'ตัวเลือก3'], note: null },
            { name: 'ข้าวอบสับปะรด', price: 120, quantity: 1, statmenu: 2, option: ['ตัวเลือก1', 'ตัวเลือก2', 'ตัวเลือก3', 'ตัวเลือก4',], note: null },
          ],
          statorder: 2,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'ห้อง',
          ordernum: '222',
          menu: [
            { name: 'ข้าวต้ม', price: 60, quantity: 1, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: '???' },
            { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, statmenu: 3, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, statmenu: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
          ],
          statorder: 3,
          // url: '/folder/Menu1',
        },
      ],
      orderdata: [],
      categorymenu: [
        { name: 'ออเดอร์ใหม่', statorder: 1, },
        { name: 'รอเสิร์ฟ', statorder: 2, },
        { name: 'รอแก้ไข', statorder: 4, },
      ],
      filteredOrder: [],


      toggleValue: false,
      page: 0,
    }
  },
  methods: {
    // toroute(rou: RouteLocationRaw) {
    //   this.$router.push(rou)
    // },
    async getOrderFromDatabase() {
      try {
        const response = await api.get(`/order.json`);
        this.orderdata = Object.values(response.data);
        this.filterOrder(1);
      } catch (error) {
        console.error(error);
      }
    },

    filterOrder(iddata: number) {
      console.log(iddata);
      this.page = iddata;
      this.filteredOrder = this.orderdata.filter((item: { statorder: number }) => item.statorder === iddata)
      console.log(this.filteredOrder);
    },

    sumprice(menu: { name: string; price: number; quantity: number; }[]) {
      let sum = 0;
      for (const i in menu) {
        const menuobject = menu[i];
        sum += menuobject.price * menuobject.quantity
      }
      return sum;
    },

    async readytoserve(idorder: string) {
      await api.patch(`order/${idorder}.json`, {statorder: 2})
      this.getOrderFromDatabase();
    },
  },
  created() {
    this.getOrderFromDatabase();
  },
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