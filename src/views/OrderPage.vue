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
        <ion-segment-button v-for="i in categorymenu" :key="i.name" :value="i.name" @click="filterOrder(i.statorder)">
          <ion-label>{{ i.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid>
        <ion-row>
          <ion-col :sizeXs="12" :sizeMd="6" v-for="i in filteredOrder" :key="i.ordernum">
            <ion-card>
              <ion-card-header>
                <!-- <ion-toolbar> -->
                <ion-card-title>{{ i.ordertype }}: {{ i.ordernum }}</ion-card-title>
                <!-- </ion-toolbar> -->
                <!-- <ion-card-subtitle>{{i.price}} THB</ion-card-subtitle> -->
              </ion-card-header>
              <ion-card-content>
                <ion-item lines="none" v-for="n in i.menu" :key="n.name">
                  <ion-label slot="start">x{{ n.quantity }}{{ n.name }}</ion-label>
                  <ion-label slot="end">{{ n.price * n.quantity }}</ion-label>
                </ion-item>
                <!-- <ion-label slot="end">รวม *???</ion-label> -->
                <ion-label slot="end">รวม {{ sumprice(i.menu) }} บาท</ion-label>
              </ion-card-content>
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
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, onIonViewDidEnter, IonLabel, IonSegment, IonSegmentButton, IonItem, IonButton
} from '@ionic/vue';
import { Item } from '@ionic/core/dist/types/components/item/item';
import { pricetag } from 'ionicons/icons';

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
    // IonButton,
  },
  data() {
    return {
      ordermenu: [
        {
          ordertype: 'โต๊ะ',
          ordernum: 'A01',
          menu: [
            { name: 'ราดหน้า', price: 70, quantity: 1, },
            { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, },
            { name: 'สุกี้', price: 70, quantity: 2, },
          ],
          statorder: 1,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'โต๊ะ',
          ordernum: 'A02',
          menu: [
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, },
            { name: 'ข้าวอบสับปะรด', price: 120, quantity: 1, },
          ],
          statorder: 2,
          // url: '/folder/Menu1',
        },
        {
          ordertype: 'ห้อง',
          ordernum: '222',
          menu: [
            { name: 'ข้าวต้ม', price: 60, quantity: 1, },
            { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, },
            { name: 'ผัดไทยห่อไข่', price: 79, quantity: 1, },
          ],
          statorder: 3,
          // url: '/folder/Menu1',
        },
      ],
      categorymenu: [
        { name: 'กำลังเตรียม',statorder: 1, },
        { name: 'นำเสิร์ฟ',statorder: 2, },
        { name: 'รอชำระ',statorder: 3, },
      ],
      filteredOrder: {}
    }
  },
  methods: {
    toroute(rou: RouteLocationRaw) {
      this.$router.push(rou)
    },
    filterOrder(iddata: number) {
      console.log(iddata)
      this.filteredOrder = this.ordermenu.filter(item => item.statorder === iddata)
    },
    sumprice(menu: {
    // import { Item } from '@ionic/core/dist/types/components/item/item';
    name: string; price: number; quantity: number;
    }[]) {
      let sum = 0;
      for (const i in menu) {
        const menuobject = menu[i];
        sum += menuobject.price*menuobject.quantity
      }
      return sum;
    },
  },
  beforeMount(){
    this.filterOrder(1)
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