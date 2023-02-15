<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>ออเดอร์</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ออเดอร์</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar> -->

      <ion-segment :scrollable="true" :value="categorymenu[0].name">
        <ion-segment-button v-for="i in categorymenu" :key="i.statorder" :value="i.name"
          @click="filterOrder(i.statorder)">
          <ion-label>{{ i.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid>
        <ion-row>
          <ion-col :sizeXs="12" :sizeMd="6" v-for="i in filteredOrder" :key="i.order_id">
            <ion-card>
              <ion-card-header>

                <ion-item>
                  <ion-card-title>{{ i.ordertype }}: ???</ion-card-title>
                  <ion-checkbox slot="end" v-if="i.statorder === 3"></ion-checkbox>
                </ion-item>

              </ion-card-header>
              <ion-card-content>
                <ion-item lines="none" v-for="n in i.menu" :key="n.name">
                  <ion-label slot="start">
                    x{{ n.quantity }}{{ n.menu_name }} <br>
                    <ion-item lines="none">
                      <!-- <ion-text>
                        {{ n.menu_option }}
                      </ion-text> -->
                      <ion-text v-for="op, indexo in n.menu_option" :key="indexo" color="medium">
                        {{ op }}
                        &nbsp;
                      </ion-text> <br>
                    </ion-item>
                  </ion-label>
                  <ion-label slot="end">{{ n.price * n.quantity }}</ion-label>
                </ion-item>

                <ion-text v-if="i.note" slot="start">
                  <p>หมายเหตุออเดอร์: {{ i.note }}</p>
                </ion-text>

                <ion-text>
                  <h1>รวม {{ sumprice(i.menu) }} บาท</h1>
                </ion-text>
              </ion-card-content>
              <ion-button v-if="i.statorder === 2" expand="block" color="secondary">นำเสิร์ฟ</ion-button>
              <div v-if="i.statorder === 3">
                <ion-grid>
                  <ion-row>
                    <ion-col :sizeXs="4">
                      <ion-button expand="block" color="secondary" routerLink="/folder/MenuPage">สั่งเพิ่ม</ion-button>
                    </ion-col>
                    <ion-col :sizeXs="8">
                      <ion-button expand="block" color="success">ชำระ</ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>

    <ion-footer v-if="filteredOrder[0].statorder === 3">
      <ion-toolbar>
        <ion-button v-show="isChecked = false" :disabled="true" expand="block" color="primary">ชำระหลายบิล</ion-button>
        <ion-button v-show="isChecked = true" expand="block" color="primary">ชำระหลายบิล</ion-button>
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>

<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonSegment, IonSegmentButton, IonItem, IonButton, IonCheckbox, IonFooter, IonText,
} from '@ionic/vue';
import axios from 'axios';

const dataurl = "https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/"

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
    IonCheckbox,
    IonFooter,
    IonText,
  },
  data() {
    return {
      ordermenu: [
        {
          ordertype: 'โต๊ะ',
          ordernum: 'A01',
          menu: [
            { name: 'ราดหน้า', price: 70, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: '???' },
            { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'สุกี้', price: 70, quantity: 2, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
          ],
          statorder: 1,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'โต๊ะ',
          ordernum: 'A02',
          menu: [
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'ข้าวอบสับปะรด', price: 120, quantity: 1, },
          ],
          statorder: 2,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'ห้อง',
          ordernum: '222',
          menu: [
            { name: 'ข้าวต้ม', price: 60, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2', 'ตัวเลือก3'], note: null },
            { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2', 'ตัวเลือก3', 'ตัวเลือก4',], note: null },
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
          ],
          statorder: 3,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'ห้อง',
          ordernum: '205',
          menu: [
            { name: 'ข้าวต้ม', price: 60, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: '???' },
            { name: 'สุกี้', price: 70, quantity: 2, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, option: ['ตัวเลือก1', 'ตัวเลือก2',], note: null },
          ],
          statorder: 3,
          // url: '/folder/Menu1',
        },
      ],
      categorymenu: [
        { name: 'กำลังเตรียม', statorder: 1, },
        { name: 'รอนำเสิร์ฟ', statorder: 2, },
        { name: 'รอชำระ', statorder: 3, },
      ],
      filteredOrder: [],
      listorderdata: [],
    }
  },
  methods: {
    async getCategoryFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}order.json`);
        this.listorderdata = Object.values(response.data);
        console.log("x", this.listorderdata);
      } catch (error) {
        console.error(error);
      }
      this.filterOrder(1);
    },
    // toroute(rou: RouteLocationRaw) {
    //   this.$router.push(rou)
    // },
    filterOrder(iddata: number) {
      console.log(iddata)
      this.filteredOrder = this.listorderdata.filter((item: { statorder: number; }) => item.statorder === iddata)
      console.log("xx", this.filteredOrder);
    },
    sumprice(menu: { name: string; price: number; quantity: number; }[]) {
      let sum = 0;
      for (const i in menu) {
        const menuobject = menu[i];
        sum += menuobject.price * menuobject.quantity
      }
      return sum;
    },
  },
  created() {
    this.getCategoryFromDatabase();
  },
  // beforeMount() {
  //   this.filterOrder(1)
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