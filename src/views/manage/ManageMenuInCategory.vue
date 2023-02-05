<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>เมนูในหมวดหมู่</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">เมนูในหมวดหมู่</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar>
  
        
       
  
  
    
    <ion-item>
        <!-- <ion-label>Action Sheet Interface</ion-label> -->
      </ion-item>   
  
      <!-- A segment that is scrollable. It has two buttons, one for all menu and one for each category. -->
        <ion-segment :scrollable="true" value="all">
          
  
          <ion-segment-button v-for="i in categorymenu" :key="i.name" :value="i.name" @click="filterMenu(i.category)">{{ i.name }}
            
          </ion-segment-button>
          
        </ion-segment>
  
        <ion-grid>
          <ion-row>
            <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name" :routerLink="i.url">
              <ion-card>
                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                <ion-card-header>
                  <ion-card-title>{{ i.name }}</ion-card-title>
                  <ion-card-subtitle>{{ i.price }} THB</ion-card-subtitle>
                </ion-card-header>
                <ion-item >
                  
          <ion-button  fill="clear" color="danger" >เเก้ไข</ion-button>
          <ion-toggle v-model="toggleValue" slot="end"></ion-toggle>
        </ion-item>
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
    IonButton ,IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonLabel, IonSegment, IonSegmentButton, IonFab, IonFabButton,
  } from '@ionic/vue';
  import { fastFood, } from 'ionicons/icons';
  // import { Select } from '@ionic/core/dist/types/components/select/select';
  
  export default defineComponent({
    components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
      IonButton ,
      IonCol,
      IonGrid,
      IonRow,
      IonCard,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      // IonCardContent,
      IonSearchbar,
      // IonLabel,
      IonSegment,
      IonSegmentButton,
      // IonFab,
      // IonFabButton,
    },
    data() {
      return {
        
   
        options: [
          { link: 'managelistmenu', 
          text: 'เพิ่มเมนู' },
          { link: 'managelistcategory',
           text: 'จัดการหมวดหม่' },
          { link: 'managelistdetails',
           text: 'รายละเอียดเพิ่มเติม' }
        ],
  
        
        listmenu: [
          {
            name: 'ข้าวเปล่า',
            price: '10',
            url: '/folder/ข้าวเปล่า',
            category: 1,
            
          },
          {
            name: 'ราดหน้า',
            price: '70',
            url: '/folder/ราดหน้า',
            category: 1,
          },
         
        ],
        categorymenu: [
          {
            name: 'อาหารจานเดียว',
            category: 1,
          },
         
        ],
        filteredMenu: {}
      }
    },
  
    setup() {
      return {
        fastFood,
      }
    },
  
    methods: {
  // A function that is used to navigate to a different page.
  
  
  navigateToPage(link: RouteLocationRaw) {
    this.$router.push(link)
      },
  
  
      
  toroute(rou: RouteLocationRaw): void {
        this.$router.push(rou)
      },
      allMenu() {
        this.filteredMenu = this.listmenu
      },
      filterMenu(iddata: number) {
        console.log(iddata)
        this.filteredMenu = this.listmenu.filter(item => item.category === iddata)
      },
    },
  
    beforeMount() {
      this.allMenu()
    },
    // created(){
    //   this.filterMenu(1)
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