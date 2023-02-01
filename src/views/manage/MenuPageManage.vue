<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>จัดการร้าน</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">จัดการร้าน</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar>

      
      <ion-button expand="block" color="success"   >
      <ion-button   color="success"  interface="action-sheet" placeholder="จัดการร้าน " v-for="a in options" :key="a.link"  :link="a.link" @click="navigateToPage(a.link)"> {{ a.text }}
      </ion-button>
      </ion-button> 



    <ion-button expand="block" color="success"   >
      <ion-select    interface="action-sheet" placeholder="จัดการร้าน"  >
        <ion-select-option @click="navigateToPage(a.link)" v-for="a in options" :key="a.text"  :link="a.link" :routerLink="`/folder/${a.link}`"> 
           {{ a.text }}
          </ion-select-option>
      </ion-select> 
    </ion-button>
  <ion-item>
      <!-- <ion-label>Action Sheet Interface</ion-label> -->
    </ion-item>  
    <!-- A segment that is scrollable. It has two buttons, one for all menu and one for each category. -->
      <ion-segment :scrollable="true" value="all">
        <ion-segment-button value="all" @click="allMenu()">
          <ion-label>ทั้งหมด</ion-label>
        </ion-segment-button>

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
    IonLabel,
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
        {
          name: 'ข้าวราดผักพริกหยวก',
          price: '70',
          url: '/folder/ข้าวราดผักพริกหยวก',
          category: 2,
        },
        {
          name: 'ข้าวผัดอเมริกัน',
          price: '130',
          url: '/folder/ข้าวผัดอเมริกัน',
          category: 2,
        },
        {
          name: 'สุกี้',
          price: '70',
          url: '/folder/สุกี้',
          category: 3,
        },
        {
          name: 'ข้าวราดพะแนง',
          price: '70',
          url: '/folder/ข้าวราดพะแนง',
          category: 3,
        },
        {
          name: 'ข้าวต้ม',
          price: '60',
          url: '/folder/ข้าวต้ม',
          category: 4,
        },
        {
          name: 'ข้าวราดผัดผักรวมมิตร',
          price: '70',
          url: '/folder/ข้าวราดผัดผักรวมมิตร',
          category: 4,
        },
        {
          name: 'ข้าวราดผักคะน้าหมูกรอบ',
          price: '89',
          url: '/folder/ข้าวราดผักคะน้าหมูกรอบ',
          category: 5,
        },
        {
          name: 'ข้าวราดผักคะน้าปลาเค็ม',
          price: '75',
          url: '/folder/ข้าวราดผักคะน้าปลาเค็ม',
          category: 5,
        },
        {
          name: 'ผัดไทยห่อไข่',
          price: '79',
          url: '/folder/ผัดไทยห่อไข่',
          category: 6,
        },
        {
          name: 'ข้าวอบสับปะรด',
          price: '120',
          url: '/folder/ข้าวอบสับปะรด',
          category: 6,
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