

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>ตั้งค่า</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">ตั้งค่า</ion-title>
          </ion-toolbar>
        </ion-header>
  

    <ion-card-title   >
            <ion-card>
              <ion-card-header>
                <ion-button fill="clear"  routerLink="/folder/managemenuincategory">เวลาเปิด-ปิดร้าน</ion-button>   
              </ion-card-header>            
        </ion-card>
   </ion-card-title>
   <ion-card-title   >
            <ion-card>
              <ion-card-header>
                <ion-button fill="clear"  routerLink="/folder/managemenuincategory">ความช่วยเหลือ</ion-button>   
              </ion-card-header>            
        </ion-card>
   </ion-card-title>
      </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" fill="clear" color="success" routerLink="/folder/menupage">
              <ion-icon ></ion-icon>
          ย้อนกลับ
            </ion-button> 
        <ion-button expand="block" color="danger" routerLink="/folder/ManageAddCategory">
          <ion-text>
            ออกจากระบบ
          </ion-text>
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import {
  IonButtons,IonContent,IonHeader, IonMenuButton, IonPage, IonTitle,IonToolbar, IonItem, IonButton, IonLabel, IonList, IonText, IonInput, IonFooter,
 IonCard, 
  IonCardHeader, IonCardTitle,
 
} from '@ionic/vue';
import { fastFood, } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonButtons,
    // IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
   
    IonButton,
    IonText,
    IonFooter,
  },
  data() {
    return {
      // options: [
      //   { link: '/folder/managemenuincategory',
      
      //   name: 'เวลาเปิด-ปิดร้าน' },
      //   { link: '/folder/managemenuincategory',
    
      //   name: 'ยํา' },
      //   { link: '/folder/managemenuincategory',
    
      //   name: '' }
      // ],
      // filteredMenu: {}
    }
  },

   
  

  setup() {
    return {
      fastFood,
    }
  },

  methods: {
// A function that is used to navigate to a different page.


// navigateToPage(link: RouteLocationRaw) {
//   this.$router.push(link)
//     },


    
// toroute(rou: RouteLocationRaw): void {
//       this.$router.push(rou)
//     },
//     allMenu() {
//       this.filteredMenu = this.options
//     },
   
//   },

//   beforeMount() {
//     this.allMenu()
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

.ion-text-center {
  text-align: center;
}
</style>