<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>เพิ่มเมนู</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">เพิ่มเมนู</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <ion-card>


<ion-icon name="add-circle-outline"></ion-icon>
        
            <ion-list>
                <ion-title size="large">หมวดหมู่</ion-title>
  </ion-list>




            <ion-list>
    <ion-item>
        
        <ion-list>
    <ion-item>
      <ion-select  placeholder="เลือกหมวดหมู่">
        <IonSelectOption value="apples">อาหารข้าวเดียว</IonSelectOption>
        <IonSelectOption value="oranges">ก๋วยเตี๋ยว</IonSelectOption>
        <IonSelectOption value="bananas">นํ้า</IonSelectOption>
      </ion-select>
    </ion-item>
  </ion-list>
  
    </ion-item> 
    <ion-card>
    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
   


  </ion-card>
  <ion-item>
    <ion-label >ใส่ชื่อเมนูอาหาร</ion-label>
    <ion-input placeholder="ชื่อเมนู"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label >ใส่ราคาเมนูอหาร</ion-label>
    <ion-input placeholder="ราคา"></ion-input>
  </ion-item>
  </ion-list>
          <ion-card-header>
            <ion-label color="dark">
              <h1>{{ $route.params.id }}</h1>
            </ion-label>
          </ion-card-header>
         
          <ion-card-content>
            <ion-label color="dark">
              <h2>เพิ่มรายละเอียด</h2>
            </ion-label>
             <ion-item>
 
        <ion-select placeholder="รายละเอียด" :multiple="true">
        <ion-select-option value="oranges">เส้น</ion-select-option>
        <ion-select-option value="bananas">นํ้า</ion-select-option>
        <ion-select-option value="bananas1">พิเศษ</ion-select-option>
      </ion-select>
    </ion-item>
            <ion-item v-for="i in choicetabie" :key="i.nameoption">
              <ion-list>
                <ion-list-header>
                  <ion-item lines="none">
                    <ion-text>
                      {{ i.nameoption }}
                    </ion-text>
                    <ion-text v-if="i.request === 2" slot="end" color="medium">*ไม่ต้องเป็น</ion-text>
                    <ion-text v-if="i.request === 1" slot="end" color="medium">*ต้องเลือก1ชิ้น</ion-text>
                    <ion-text v-if="i.requestmax > 0" slot="end" color="medium">*เลือกได้{{ i.requestmax }}ชิ้น</ion-text>
                    <ion-button size="small" slot="end"  color="danger">ลบ</ion-button>
                  </ion-item>
                </ion-list-header>
  
                <ion-radio-group v-if="i.checktype === 1" >
                  <ion-item v-for="n in i.suboption" :key="n.namesub" lines="none">
                    <ion-radio slot="start"></ion-radio>
                    <ion-text><h3>{{ n.namesub }}</h3></ion-text>
                    <ion-text slot="end"><h3>+{{ n.price }}</h3></ion-text>
                    <ion-button size="small" slot="end"  color="danger">ลบ</ion-button>
                  </ion-item>
                </ion-radio-group>
  
                <div v-if="i.checktype === 2">
                  <ion-item  v-for="n in i.suboption" :key="n.namesub" lines="none">
                    <ion-checkbox slot="start"></ion-checkbox>
                    <ion-text><h3>{{ n.namesub }}</h3></ion-text>
                    <ion-text slot="end"><h3>+{{ n.price }}</h3></ion-text>
                    <ion-button size="small" slot="end"  color="danger">ลบ</ion-button>
                  </ion-item>
                </div>
                
                <div v-if="i.checktype === 3">
                  <ion-item  v-for="n in i.suboption" :key="n.namesub" lines="none">
                    <ion-checkbox slot="start"></ion-checkbox>
                    <ion-text><h3>{{ n.namesub }}</h3></ion-text>
                    <ion-text slot="end"><h3>+{{ n.price }}</h3></ion-text>
                    <ion-button size="small" slot="end"  color="danger">ลบ</ion-button>
                  </ion-item>
                </div>
              </ion-list>
            </ion-item>
  
            <!-- <ion-item>
              <ion-input placeholder="เพิ่มหมายเหตุเมนูนี้ "></ion-input>
            </ion-item> -->
            
            <!-- <ion-item class="ion-align-items-center ion-justify-content-center">
              <ion-icon :icon="removeCircle"></ion-icon>
              <ion-text>1</ion-text>
              <ion-icon :icon="addCircle"></ion-icon>
            </ion-item> -->
  
          
  
          </ion-card-content>
          
        </ion-card>
        <ion-button expand="block" fill="clear" color="danger" routerLink="/folder/manage">
              <ion-icon ></ion-icon>
          ย้อนกลับ
            </ion-button> 
        
        <ion-button expand="block" color="success" routerLink="/folder/manage">
              <ion-icon slot="start" :icon="addCircle"></ion-icon>
              เพิ่มเมนู
            
            </ion-button>
      </ion-content>  
      
           
    </ion-page>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent } from 'vue';
  // import { RouteLocationRaw, useRoute } from 'vue-router';
  import {  IonSelect, IonSelectOption ,IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonCheckbox, IonList, IonRadio, IonRadioGroup, IonListHeader, IonText, IonInput, IonIcon, } from '@ionic/vue';
  import { star, addCircle, removeCircle, } from 'ionicons/icons';
  
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
      IonCard,
      IonCardContent,
      IonCardHeader,
      // IonCardSubtitle, 
      // IonCardTitle,
      IonLabel,
      IonCheckbox,
      IonItem,
      IonList,
      IonRadio,
      IonRadioGroup,
      IonListHeader,
      IonText,
      IonInput,
      IonIcon,
       IonSelect, IonSelectOption
    },
    data(){
      return {
        choicetabie: [
          {
            nameoption: 'เส้น',
            request: 0,   //จำเป็นต้องเลือก
            requestmax: 3,
            checktype: 2, //Type CheckBox
            suboption: [
              {namesub: 'ตัวเลือกย่อย 1', price: 0},
              {namesub: 'ตัวเลือกย่อย 2', price: 5},
              {namesub: 'ตัวเลือกย่อย 3', price: 10},
            ],
          },
          {
            nameoption: 'นํ้า',
            request: 1,   //จำเป็นต้องเลือก
            requestmax: 0,
            checktype: 1, //Type Radio
            suboption: [
              {namesub: 'ตัวเลือกย่อย 1', price: 0},
              {namesub: 'ตัวเลือกย่อย 2', price: 0},
              {namesub: 'ตัวเลือกย่อย 3', price: 0},
            ],
          },
          {
            nameoption: 'พิเศษ',
            request: 2,   //จำเป็นต้องเลือก
            requestmax: 0,
            checktype: 2, //Type Radio
            suboption: [
              {namesub: 'ตัวเลือกย่อย 1', price: 0},
              {namesub: 'ตัวเลือกย่อย 2', price: 0},
              {namesub: 'ตัวเลือกย่อย 3', price: 0},
            ],
          },
        ]
      }
    },
    setup() {
      return {
        star,
        addCircle,
        removeCircle,
      }
    },
  
    // methods:{
    //   toroute(rou: RouteLocationRaw) {
    //     this.$router.push(rou)
    //   }
    // }
  })
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
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
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
  
  ion-card-header {
    display: flex;
    flex-flow: column-reverse;
  }
  
  ion-item-group {
    padding: 10px;
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  </style>
  
