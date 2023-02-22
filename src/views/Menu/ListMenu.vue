<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>รายการในตะกร้า</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">รายการในตะกร้า</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-select v-model="type" interface="action-sheet" placeholder="เลือกประเภทออเดอร์">
            <ion-select-option :value="1">โต๊ะ</ion-select-option>
            <ion-select-option :value="2">ห้องพัก</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-list v-if="type == 1">
        <ion-item>
          <ion-select v-model="numroom" interface="action-sheet" placeholder="เลือกโต๊ะของออเดอร์นี้">
            <ion-select-option v-for="i in listtable" :key="i.name" :value="i.name">{{ i.name }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-item v-if="type == 2">
        <ion-label>เลขห้อง: </ion-label>
        <ion-input v-model="numroom" type="number" :value=numroom placeholder="000"></ion-input>
      </ion-item>

      <!-- ใบออเดอร์ -->
      <ion-card>
        <ion-card-header>
          <ion-item lines="none">
            <ion-card-title>รายการอาหารในตะกร้า</ion-card-title>
            <ion-button slot="end" fill="clear" :routerLink="{
              name: 'menu2', params: {
                id: $route.params.id
              }
            }">
              เพิ่มรายการอาหาร
            </ion-button>
          </ion-item>
        </ion-card-header>

        <!-- list order -->
        <ion-card-content v-for="n in filteredOrder" :key="n" class="ion-text-center">
          <!-- {{ sumorder(n.menu) }} -->

          <!-- list menu -->
          <ion-item lines="none" v-for="i in n.menu" :key="i">
            <ion-label slot="start" text-wrap>
              x{{ i.quantity }}{{ i.menu_name }} <br>
              <!-- list optional -->
              <ion-text v-for="o in i.menu_option" :key="o" color="medium">{{ o }} &nbsp;</ion-text> <br>
            </ion-label>
            <!-- menu price -->
            <ion-label slot="end">{{ (i.price * i.quantity) }}</ion-label>
          </ion-item>

          <!-- order price -->
          <ion-text>
            <h1>รวม {{ sumpriceall }} บาท</h1>
            <!-- <h1>รวม {{ sumorder(n.menu) }} บาท</h1> -->
          </ion-text>

        </ion-card-content>
      </ion-card>

      <ion-item>
        <ion-input v-model="note" placeholder="เพิ่มหมายเหตุเมนูนี้ "></ion-input>
      </ion-item>

    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" color="success" @click="sentorder">
          <ion-text>
            สั่งอาหาร
          </ion-text>
        </ion-button>
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>

<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonList, IonText, IonInput, IonFooter,
  IonCol, IonGrid, IonRow, IonCard,
  IonCardContent, IonCardHeader, IonCardTitle,
  IonSegment, IonSegmentButton,
  IonSelect, IonSelectOption, alertController,
} from '@ionic/vue';
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
    // IonCol,
    // IonGrid,
    // IonRow,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    // IonCardSubtitle,
    IonCardContent,
    // IonSearchbar,
    IonLabel,
    IonList,
    IonItem,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonText,
    IonInput,
    IonFooter,
  },
  data() {
    return {
      listtable: [
        { name: 'A01' },
        { name: 'A02' },
        { name: 'A03' },
        { name: 'B01' },
        { name: 'B02' },
      ],
      filteredOrder: [],
      filteredOrder2: [] as any,
      listorderdata: [],
      note: "",
      sumpriceall: 0,
      counts: 0,
      counts2: 0,
      numroom: "",
      type: 1,
    }
  },
  methods: {
    async getOrderFromDatabase() {
      try {
        const response = await api.get(`/order.json`);
        this.listorderdata = Object.values(response.data);
        console.log("old", this.listorderdata);
        this.filteredOrder = this.listorderdata.filter((item: { idorder: string }) => item.idorder === this.$route.params.id)
        this.sumorder();
      } catch (error) {
        console.error(error);
      }
    },
    sumorder() {
      this.filteredOrder.forEach((item: { menu: object }) =>
        this.sumpriceall = Object.values(item.menu).reduce((sum, item: { price: number, quantity: number }) =>
          sum + item.price * item.quantity, 0
        )
      )
      console.log("Total price: ", this.sumpriceall)
    },

    addmenu() {
      console.log()
    },

    async sentorder() {
      if(this.numroom){
        await api.patch(`order/${this.$route.params.id}.json`, { 
          order_name: this.numroom, 
          statorder: 1,
          ordertype: (this.type == 1 ? "โต๊ะ" : "ห้อง"),
          note: this.note,
          timecomplete: new Date().toLocaleTimeString(),
        }).then(() => {
          this.$router.push("/MenuPage")
        })
      } else {
        const alert = await alertController.create({
          message: 'กรุณาเลือกประเภทของออเดอร์ และหมายเลขโต๊ะหรือหมายเลขห้อง',
          buttons: ['ตกลง']
        })
        await alert.present();
      }
    }
  },
  mounted() {
    this.getOrderFromDatabase();
  }
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

.ion-text-center {
  text-align: center;
}
</style>
