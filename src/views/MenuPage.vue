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

      <ion-grid>
        <ion-row>
          <ion-col
          :offsetMd="0.05"
          :sizeXs="4"
          :sizeMd="2.5"
          v-for="i in counts" :key="i">
            <ion-card>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <ion-card-header>
                <ion-card-title>{{i.name}}</ion-card-title>
                <ion-card-subtitle>{{i.price}} THB</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem
} from '@ionic/vue';

// const countt = ['Family', 'Friends', 'Notes', 'Notes', 'Notes', 'Notes', 'Notes', 'Notes'];
const counts = [
  {
    name: 'ข้าวต้ม',
    price: '40',
    url: '/folder/menu1',
  },
  {
    name: 'ส้มตำ',
    price: '60',
    url: '/folder/menu1',
  },
  {
    name: 'ข้าวผัด',
    price: '50',
    url: '/folder/menu1',
  },
  {
    name: 'ก๋วยเตี๋ยว',
    price: '60',
    url: '/folder/menu1',
  },
  {
    name: 'ข้าวเปล่า',
    price: '10',
    url: '/folder/menu1',
  },
]
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
  background-color: #3c4c4a;
  border: solid 0.5px #fff;
  border-radius: 5px;
  color: #fff;
  text-align: center;
}

ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>