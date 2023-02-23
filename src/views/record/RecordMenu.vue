<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>ประวัติออเดอร์ทั้งหมด</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ประวัติออเดอร์ทั้งหมด</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-text v-if="filteredOrder.length == 0" id="container">
        <h2>ยังไม่มีประวัติออเดอร์</h2>
      </ion-text>

      <!-- <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar> -->

      <ion-grid>
        <ion-row>
          <ion-col :sizeXs="12" :sizeMd="6" v-for="i in filteredOrder" :key="i.order_id">
            <ion-card>

              <ion-card-header>
                <ion-card-title>{{ i.ordertype }}: {{ i.order_name }}</ion-card-title>
                <!-- <ion-checkbox slot="end" v-if="i.statorder === 3"></ion-checkbox> -->
                <p>เสร็จเมื่อ : {{ i.datecomplete }} {{ i.timecomplete }}</p>
              </ion-card-header>

              <ion-card-content>
                <ion-item lines="none" v-for="n in i.menu" :key="n.menu_name">
                  <ion-label slot="start">
                    x{{ n.quantity }}{{ n.menu_name }} <br>
                    <ion-label lines="none">
                      <ion-text v-for="O, indexo in n.menu_option" :key="indexo" color="medium" class="ion-text-wrap"> {{
                        O }} &nbsp;</ion-text> <br>
                      <!-- <p v-for="op, indexo in n.menu_option" :key="indexo" color="medium">
                        {{ op }}
                        <br>
                      </p> -->
                    </ion-label>
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

const api = axios.create({ baseURL: 'https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/' });
// const dataurl = "https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/"

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
    // IonLabel,
    // IonSegment,
    // IonSegmentButton,
    IonItem,
    // IonButton,
    // IonCheckbox,
    // IonFooter,
    IonText,
    // IonToggle
  },
  data() {
    return {
      categorymenu: [
        { name: 'ประวัติออเดอร์', statorder: 0, },
      ],
      filteredOrder: [],
      listorderdata: [],
      toggleValue: false,
      page: 0,
    }
  },
  methods: {
    async getCategoryFromDatabase() {
      try {
        const response = await api.get(`/order.json`);
        this.listorderdata = Object.values(response.data);
        this.filteredOrder = this.listorderdata.filter((item: { statorder: number }) => item.statorder === 10)
        // this.filterOrder(this.page);
        console.log("I", this.filteredOrder);
      } catch (error) {
        console.error(error);
      }
    },
    // toroute(rou: RouteLocationRaw) {
    //   this.$router.push(rou)
    // },
    // filterOrder(iddata: number) {
    //   // console.log(iddata)
    //   // this.page = iddata; 
    //   // this.filteredOrder = this.listorderdata.filter((item: { statorder: number}) => item.statorder === iddata)
    //   // console.log("xx", this.filteredOrder);
    // },
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