

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>จัดการหมวดหมู่</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">หมวดหมู่</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- <ion-list>
        <ion-item>
          <ion-select interface="action-sheet" placeholder="หมวดหมู่">
            <ion-select-option v-for="i in listtable" :key="i.name" :value="i.name">{{ i.name }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list> -->


      <ion-card>
        <ion-card-header>
          <ion-item lines="none">
            <ion-card-title>อาหารข้าวเดียว</ion-card-title>
            <ion-button slot="end" fill="clear" routerLink="/folder/managemenuincategory">
                เเก้ไข
            </ion-button>
            <ion-button slot="end" fill="clear" routerLink="/folder/ManageListCategory">
                ลบ
            </ion-button>
          </ion-item>
        </ion-card-header>

       
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-item lines="none">
            <ion-card-title>ยํา</ion-card-title>
            <ion-button slot="end" fill="clear" routerLink="/folder/managemenuincategory">
                เเก้ไข
            </ion-button>
            <ion-button slot="end" fill="clear" routerLink="/folder/ManageListCategory">
                ลบ
            </ion-button>
          </ion-item>
        </ion-card-header>

       
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-item lines="none">
            <ion-card-title>กับข้าว</ion-card-title>
            <ion-button slot="end" fill="clear" routerLink="/folder/managemenuincategory">
                เเก้ไข
            </ion-button>
            <ion-button slot="end" fill="clear" routerLink="/folder/ManageListCategory">
                ลบ
            </ion-button>
          </ion-item>
        </ion-card-header>

       
      </ion-card>

    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" fill="clear" color="danger" routerLink="/folder/managemenuincategory">
              <ion-icon ></ion-icon>
          ย้อนกลับ
            </ion-button> 
        <ion-button expand="block" color="success" routerLink="/folder/ManageAddCategory">
          <ion-text>
            เพิ่มหมวดหมู่
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
  IonButtons,IonContent,IonHeader, IonMenuButton, IonPage, IonTitle,IonToolbar, IonItem, IonButton, IonLabel, IonList, IonText, IonInput, IonFooter,
  IonCol, IonGrid, IonRow, IonCard, 
  IonCardContent, IonCardHeader, IonCardTitle,
  IonSegment, IonSegmentButton,
  IonSelect, IonSelectOption,
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
    // IonCol,
    // IonGrid,
    // IonRow,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    // IonCardSubtitle,
    // IonCardContent,
    // IonSearchbar,
    // IonLabel,
    // IonList,
    IonItem,
    IonButton,
    // IonSelect,
    // IonSelectOption,
    IonText,
    // IonInput,
    IonFooter,
  },
  data() {
    return {
      ordermenu: {
        ordertype: 'โต๊ะ',
        ordernum: 'od01',
        menu: [
          { name: 'ราดหน้า', price: 70, quantity: 1, },
          { name: 'ข้าวผัดอเมริกัน', price: 130, quantity: 1, },
          { name: 'สุกี้', price: 70, quantity: 2, },
        ],
        // url: '/folder/Menu1',
      },
      listtable: [
        { name: 'โต๊ะ: A01' },
        { name: 'โต๊ะ: A02' },
        { name: 'โต๊ะ: A03' },
        { name: 'โต๊ะ: B01' },
        { name: 'โต๊ะ: B02' },
      ],
      // filteredOrder: {}
    }
  },
  methods: {
    sumprice(menu: {
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
  // beforeMount(){
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

.ion-text-center {
  text-align: center;
}
</style>
