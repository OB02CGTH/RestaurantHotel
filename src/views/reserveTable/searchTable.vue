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
     

 <!-- <ion-searchbar  v-if="i.statorder === 1" placeholder="ค้นหาโต็ะ" ></ion-searchbar> -->
      <div>
      
  <ion-modal :keep-contents-mounted="true">  
    <ion-datetime id="datetime"></ion-datetime>
  </ion-modal>
 
 <!-- <img v-bind:lang="language" src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/128/calendar-icon.png" class="image-preview2"> -->
  <ion-datetime-button datetime="datetime"> </ion-datetime-button>
   <ion-button color="success" routerLink="/folder/detailsTable" >จองเพิ่ม</ion-button> 
      <ion-button color="success" >ลบ</ion-button>
  
  
       
  </div> 

    
  






  
      <ion-grid>
        <ion-row> 
             <ion-col :sizeXs="12" :sizeMd="6" v-for="i,indexi in filteredOrder" :key="indexi">
            <ion-card>

              <ion-card-header v-if="i.statorder != 3">
                  <ion-card-title>{{ i.ordertype }}: {{ i.ordernum }}</ion-card-title>
              </ion-card-header>
              <ion-card-header v-else color="danger">
                  <ion-card-title>{{ i.ordertype }}: {{ i.ordernum }}</ion-card-title>
              </ion-card-header>
             
              <ion-card-content>
                <ion-item lines="none" v-for="(n, indexn) in i.menu" :key="indexn">
                  <ion-label v-if="n.statmenu != 4" slot="start">{{ n.name }}</ion-label>
                  <ion-label v-else slot="start" color="danger">{{ n.name }}</ion-label>
                  <ion-label v-if="n.statmenu != 4" slot="end">{{  n.quantity }}</ion-label>
                  <ion-label v-else slot="end" color="danger">{{  n.quantity }}</ion-label>

                </ion-item>
              
              </ion-card-content>
              <div class="container">
    <ion-button  v-if="i.statorder === 1" fill="clear" color="danger" @click="presentActionSheet">เเก้ไข</ion-button>
    <code>{{ result }}</code>
  </div>
  
              <ion-button  v-if="i.statorder === 1" expand="block" color="success" routerLink="/folder/reserveTable">ถึงร้านเเล้ว</ion-button >
              <!-- <ion-button v-if="i.statorder === 3" expand="block" color="warning">แก้ไขออเดอร์</ion-button> -->
              
              <!-- <div v-if="i.statorder === 3">
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
              </div> -->

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
import { actionSheetController,
  IonDatetime, IonDatetimeButton, IonModal, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, IonSegment, IonSegmentButton, IonItem, IonButton, IonCheckbox, IonFooter, IonText, IonToggle,
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
    // IonSegment,
    // IonSegmentButton,
    IonItem,
    IonButton,
    // IonCheckbox,
    // IonFooter,
    // IonText,
    // IonToggle,
    IonDatetime, IonDatetimeButton, IonModal,

  },
  
  setup() {
      const result = ref('');

      const presentActionSheet = async () => {
        const actionSheet = await actionSheetController.create({
        
          buttons: [
            {
              text: 'เเก้ไข',
              data: {
                action: 'correct',
              },
            },
            {
              text: 'ลบ',
              role: 'destructive',
              data: {
                action: 'delete',
              },
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
      
    
      ordermenu: [
        {
          ordertype: 'รหัสการจอง',
          ordernum: 'A01', 
          menu: [
            { name: 'เวลา', quantity: "25/1/2566",  statmenu: 1, },
            { name: 'ถึง', quantity: "25/1/2566", statmenu: 1, },
            { name: 'ชื่อ-สกุล', quantity: "xxxx",  statmenu: 1, },
            { name: 'เบอร์ติดต่อ', quantity: "xxxx", statmenu: 1, },
            { name: 'จํานวน', quantity: 10, statmenu: 1, },
          ],
          statorder: 1,
          // url: '/folder/Menu1',
        },
    
        {
          ordertype: 'รหัสการจอง',
          ordernum: 'A05', 
          menu: [
            { name: 'เวลา', quantity: "15/1/2566",  statmenu: 1, },
            { name: 'ถึง', quantity: "15/1/2566", statmenu: 1, },
            { name: 'ชื่อ-สกุล', quantity: "xxxx",  statmenu: 1, },
            { name: 'เบอร์ติดต่อ', quantity: "xxxx", statmenu: 1, },
            { name: 'จํานวน', quantity: 15, statmenu: 1, },
          ],
          statorder: 2,
          // url: '/folder/Menu1',
        },
      
      ],
      categorymenu: [
        { name: 'กำลังเตรียม', statorder: 1, },
        { name: 'ประวัติการจอง', statorder: 2, },
       
      ],
      filteredOrder: {},
    
    }
  },
  methods: 
    {toroute(rou: RouteLocationRaw) {
      this.$router.push(rou)
    },
    filterOrder(iddata: number) {
      console.log(iddata)
      this.filteredOrder = this.ordermenu.filter(item => item.statorder === iddata)
    },
    // sumprice(menu: { name: string;  quantity: number; }[]) {
    //   let sum = 0;
    //   for (const i in menu) {
    //     const menuobject = menu[i];
    //     sum += menuobject.price * menuobject.quantity
    //   }
    //   return sum;
    // },
    
  },
  beforeMount() {
    this.filterOrder(1)
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
ion-button{
  border-radius: 5px;
  color: rgb(26, 255, 18);
  text-align: center;
}
ion-col {
  width: 29px;
  height: 29px;
}

.image-preview2 {
  width: 29px;
  height: 29px;
}
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>
