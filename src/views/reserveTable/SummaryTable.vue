<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>รายละเอียดผู้จอง</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
        
        </ion-header>
  
       
            
      <ion-title2 size="large">รายละเอียดผู้จอง</ion-title2>      
  
     

    
  
      <ion-item>
    <ion-label >วันที่-เวลา</ion-label>
    <ion-input placeholder="25/1/2566"></ion-input>
  </ion-item>
  <ion-item fill="solid">
    <ion-label >ถึง-เวลา</ion-label>
    <ion-input placeholder="25/1/2566"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label >ชื่อ-สกุล</ion-label>
    <ion-input placeholder="xxx"></ion-input>
  </ion-item>
  <ion-item>
      <ion-label >จํานวน</ion-label>
      <ion-input type="number" placeholder="4"></ion-input>
    </ion-item>


    <ion-item>
      <ion-label >Email</ion-label>
      <ion-input type="email" placeholder="email@domain.com"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label >เบอร์ติดต่อ</ion-label>
      <ion-input type="tel" placeholder="888-888-8888"></ion-input>
    </ion-item>
 
 
    <ion-title2 size="large">สรุปโต็ะที่จอง</ion-title2> 
  <ion-grid :fixed="true">
    <ion-row>
      <ion-col>สถานะ</ion-col>
      <ion-col>ชื่อ-สกุล</ion-col>
      <ion-col>วันที่/เวลา</ion-col>
      <ion-col>จํานวน</ion-col>
    </ion-row>
    <ion-row>
      <ion-col>จอง</ion-col>
      <ion-col>xxxxxx</ion-col>
      <ion-col>1/1/2566</ion-col>
      <ion-col>4</ion-col>
    </ion-row>
  </ion-grid>
  
      </ion-content>
       <!-- @click="presentAlert" color="success"  -->
      <ion-button expand="block"  routerLink="/folder/reserveTable">
              <p>{{ handlerMessage }}</p>
  <p>{{ roleMessage }}</p>
             จอง
            </ion-button> 
    </ion-page>
  </template>
  <script lang="ts">
  import {  defineComponent } from 'vue';
  import { RouteLocationRaw } from 'vue-router';
  import { alertController,actionSheetController,IonCol, IonGrid, IonRow,IonNote,IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonCard, IonCardContent, IonCardHeader, IonLabel, IonCheckbox, IonList, IonRadio, IonRadioGroup, IonListHeader, IonText, IonInput, IonIcon, } from '@ionic/vue';
  import { star, addCircle,  removeCircle, } from 'ionicons/icons';
  import { ref } from 'vue';
  export default defineComponent({
    components: {
      IonButton,
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
      IonLabel,
       IonItem,
      // IonInput,
      // IonNote,
      IonCol, 
      IonGrid, 
      IonRow,
      
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
  
      
      ],
      
      filteredOrder: {},
    
    }
  },
    
    setup() {
      const handlerMessage = ref('');
      const roleMessage = ref('');

      const presentAlert = async () => {
        const alert = await alertController.create({
          header: 'ยืนยันการจอง',
          buttons: [
            {
              text: 'ยกเลิก',
              role: 'cancel',
             
            },
            {
              text: 'ยืนยัน',
              role: 'confirm',
              
              handler: () => {
                
                handlerMessage.value = '';
              },
            },
          ],
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        roleMessage.value = `Dismissed with role: ${role}`;
      };

      return {
        handlerMessage,
        roleMessage,
        presentAlert,
      };
    },
  




//     methods:{
//       toroute(rou: RouteLocationRaw) {
//         this.$router.push(rou)
//       },
//       // validateEmail(email) {
//       //   return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
//       // }, 
//       //  validate(ev) {
//       //    const value = ev.target.value;

//       // this.$refs.item.$el.classList.remove('ion-valid');
//       //   this.$refs.item.$el.classList.remove('ion-invalid');

//       //   if (value === '') return;

//       //   this.validateEmail(value)
//       //   ? this.$refs.item.$el.classList.add('ion-valid')
//       //   : this.$refs.item.$el.classList.add('ion-invalid');
//       //  },

//       //  markTouched() {
//       //    this.$refs.item.$el.classList.add('ion-touched')}},

 
//     checkValue() {
//       if (this.value1 !== '11') {
//         this.value1 = ''
//       }
//     }
  
// }





        },
  );


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
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  ion-col1 {
    background-color: #ffffff;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
  ion-col {
    background-color: #e41c37;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  ion-title2{
    padding: 45px;
    font-size: 30px;
    line-height:80px;
    
  }
  ion-datetime-button
  {
    line-height:80px;
    
    
  }
  ion-card-header {
    display: flex;
    flex-flow: column-reverse;
  }
  
  ion-item-group {
    padding: 10px;
  }
  ion-datetime-button{
    text-decoration: none;
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  </style>
  
