<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>รายการการจองโต๊ะ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">รายการการจองโต๊ะ</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-segment :scrollable="true" :value="categorymenu[0].name">
        <ion-segment-button v-for="i in categorymenu" :key="i.name" :value="i.name" @click="filterOrder(i.statorder)">
          <ion-label>{{ i.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-searchbar placeholder="ค้นหาโต๊ะ"></ion-searchbar>
      <ion-button expand="block" color="success" routerLink="/folder/detailsTable">จองโต๊ะเพิ่ม</ion-button>
      
      <ion-grid>
        <ion-row>
          <ion-col :sizeXs="12" :sizeMd="6" v-for="i, indexi in table_filtered" :key="indexi">
            <ion-card >
              <ion-card-header>
                <ion-card-title>รหัสการจอง: {{ i.id }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <ion-item lines="none">
                  <div slot="start">เวลาที่กำหนด:</div>
                  <div slot="end">{{ i.setdate }}</div>
                </ion-item>
                <ion-item lines="none">
                  <div slot="start">ชื่อ:</div>
                  <div slot="end">{{ i.name }}</div>
                </ion-item>
                <ion-item lines="none">
                  <div slot="start">จำนวน:</div>
                  <div slot="end">{{ i.amount }}</div>
                </ion-item>
                <ion-item lines="none">
                  <div slot="start">เบอร์โทร:</div>
                  <div slot="end">{{ i.phone }}</div>
                </ion-item>
                <ion-item lines="none">
                  <div slot="start">อีเมล:</div>
                  <div slot="end">{{ i.email }}</div>
                </ion-item>
              </ion-card-content>

                <ion-button v-if="i.state == 1" fill="clear" expand="block" color="danger"
                  @click="presentActionSheet(i.id)">
                  จัดการ
                </ion-button>

                <!-- <code>{{ result }}</code> -->

              <ion-button v-if="i.state == 1" expand="block" color="success" @click="success(i.id)"
                routerLink="/folder/reserveTable">ถึงร้านเเล้ว</ion-button>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
    <!-- 
    <ion-footer v-if="filteredOrder[0].statorder === 3">
      <ion-toolbar>
        <ion-button v-show="isChecked = false" :disabled="true" expand="block" color="primary">ชำระหลายบิล</ion-button>
        <ion-button v-show="isChecked = true" expand="block" color="primary">ชำระหลายบิล</ion-button>
      </ion-toolbar>
    </ion-footer> -->

  </ion-page>
</template>

<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import {
  actionSheetController,
  IonDatetime, IonDatetimeButton, IonModal, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonSegment, IonSegmentButton, IonItem, IonButton, IonCheckbox, IonFooter, IonText, IonToggle,
} from '@ionic/vue';
import { Item } from '@ionic/core/dist/types/components/item/item';
import { pricetag } from 'ionicons/icons';
import axios from 'axios';

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
    // IonSegment,
    // IonSegmentButton,
    IonItem,
    IonButton,
    // IonCheckbox,
    // IonFooter,
    // IonText,
    // IonToggle,
    // IonDatetime, IonDatetimeButton, IonModal,

  },

  setup() {
    const result = ref('');

    const presentActionSheet = async (idorder: string) => {
      const actionSheet = await actionSheetController.create({

        buttons: [
          {
            text: 'เเก้ไข',
            handler: () => {
              // this.$router.push({
              //   name: 'edittable', params: {
              //     idtable: idorder
              //   }
              // })
              // api.delete(`ordertable/${idorder}.json`)  
            }
          },
          {
            text: 'ลบ',
            handler: async () => {  
              console.log("remove ", idorder);
              await api.delete(`ordertable/${idorder}.json`);
              location.reload();
            } 
          },
        ],
      });

      await actionSheet.present();

      const res = await actionSheet.onDidDismiss();
      result.value = JSON.stringify(res, null, 2);
    };

    return {
      result,
      presentActionSheet,
    };
  },


  data() {
    return {
      idstate: 1,
      ls_table: [],
      table_filtered: [],
      ordermenu: [
        {
          ordertype: 'รหัสการจอง',
          ordernum: 'A01',
          menu: [
            { name: 'เวลา', quantity: "25/1/2566", statmenu: 1, },
            { name: 'ถึง', quantity: "25/1/2566", statmenu: 1, },
            { name: 'ชื่อ-สกุล', quantity: "xxxx", statmenu: 1, },
            { name: 'เบอร์ติดต่อ', quantity: "xxxx", statmenu: 1, },
            { name: 'จํานวน', quantity: 10, statmenu: 1, },
          ],
          statorder: 1,
        },

        {
          ordertype: 'รหัสการจอง',
          ordernum: 'A05',
          menu: [
            { name: 'เวลา', quantity: "15/1/2566", statmenu: 1, },
            { name: 'ถึง', quantity: "15/1/2566", statmenu: 1, },
            { name: 'ชื่อ-สกุล', quantity: "xxxx", statmenu: 1, },
            { name: 'เบอร์ติดต่อ', quantity: "xxxx", statmenu: 1, },
            { name: 'จํานวน', quantity: 15, statmenu: 1, },
          ],
          statorder: 2,
        },

      ],
      categorymenu: [
        { name: 'การจอง', statorder: 1, },
        { name: 'ประวัติการจอง', statorder: 2, },
      ],
      filteredOrder: {},

    }
  },
  methods:
  {
    toroute(rou: RouteLocationRaw) {
      this.$router.push(rou)
    },
    async getOrderTableFromDatabase() {
      try {
        const response = await api.get(`/ordertable.json`);
        // console.log(response.data);
        this.ls_table = Object.values(response.data);
        // console.log("get " + JSON.stringify(this.ls_table));
        this.filterOrder(1);
      } catch (error) {
        console.error(error);
      }
    },
    filterOrder(iddata: number) {
      console.log(iddata)
      this.table_filtered = this.ls_table.filter((item: { state: number }) => item.state == iddata)
      // console.log("filter " + JSON.stringify(this.ls_table));
    },
    async success(idorder: string) {
      console.log("id", idorder);
      await api.patch(`ordertable/${idorder}.json`,{state: 2});
      // this.filterOrder(1);
      location.reload();
    },

    // async remove(idorder: string) {
    //   await api.delete(`ordertable/${idorder}.json`)
    // }
    

  },
  beforeMount() {
    this.filterOrder(1);
    this.getOrderTableFromDatabase();
  },
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

code {
  white-space: pre-wrap;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

ion-button {
  border-radius: 5px;
  color: rgb(26, 255, 18);
  text-align: center;
}

ion-col {
  border-radius: 5px;
  color: #fff;
  text-align: center;
}

.image-preview2 {
  width: 29px;
  height: 29px;
}

ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}</style>
