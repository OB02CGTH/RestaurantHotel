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
        <ion-title size="large">รายละเอียดผู้จอง</ion-title>
      </ion-header>



      <ion-accordion-group>
        <ion-accordion value="start">
          <ion-item slot="header">
            <ion-label>วันที่-เวลา</ion-label>
            <ion-note slot="end"></ion-note>
          </ion-item>
          <ion-datetime v-model="setdate" slot="content" presentation="date-time" locale="th-TH" onIonChange={this.onStartChange}
            minute-values="0,15,30,45">
          </ion-datetime>
        </ion-accordion>
        <ion-accordion value="end">
          <ion-item slot="header">
            <ion-label>ถึง-เวลา</ion-label>
            <ion-note slot="end"></ion-note>
          </ion-item>
          <ion-datetime v-model="regisdate" slot="content" presentation="date-time" locale="th-TH" onIonChange={this.onEndChange}
            minute-values="0,15,30,45">
          </ion-datetime>
        </ion-accordion>
        <ion-item>
          <ion-label position="floating">ชื่อ-สกุล</ion-label>
          <ion-input v-model="name" placeholder="กรุณากรอกชื่อ-สกุล"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">จํานวนคน</ion-label>
          <ion-input v-model="amount" type="number" placeholder="0"></ion-input>
        </ion-item>


        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email" placeholder="email@domain.com"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">เบอร์ติดต่อ</ion-label>
          <ion-input v-model="phone" type="tel" placeholder="888-888-8888"></ion-input>
        </ion-item>
      </ion-accordion-group>
      <ion-button fill="clear" expand="block" color="danger" routerLink="/folder/reserveTable">
        <ion-icon></ion-icon>
        ย้อนกลับ
      </ion-button>

      <!-- <ion-button expand="block" color="success" routerLink="/folder/summarytable">
        <ion-icon slot="start" :icon="addCircle"></ion-icon>
        จอง
      </ion-button> -->
      <ion-button expand="block" color="success" @click="createTableorder()">
        <ion-icon slot="start" :icon="addCircle"></ion-icon>
        จอง
      </ion-button>
    </ion-content>

  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { IonDatetime, IonNote, IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonCard, IonCardContent, IonCardHeader, IonLabel, IonCheckbox, IonList, IonRadio, IonRadioGroup, IonListHeader, IonText, IonInput, IonIcon, IonAccordion, IonAccordionGroup, } from '@ionic/vue';
import { star, addCircle, removeCircle, } from 'ionicons/icons';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/' });

export default defineComponent({
  components: {
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonInput,
    IonAccordion,
    IonAccordionGroup,
    IonNote,
    //  IonList,
  },
  data() {
    return {
      id: '',
      setdate: '',
      settime: '',
      regisdate: '',
      registime: '',
      name: '',
      amount: 0,
      email: '',
      phone: '',
      state: 1,
    }
  },
  setup() {
    return {
      star,
      addCircle,
      removeCircle,
      value1: ''
    }
  },
  methods: {
    checkvalue() {
      console.log(this.setdate, this.regisdate, this.name, this.amount, this.email, this.phone)
    },
    toroute(rou: RouteLocationRaw) {
      this.$router.push(rou)
    },
    checkValue() {
      if (this.value1 !== '11') {
        this.value1 = ''
      }
    },
    async createTableorder() {
      await api.post(`ordertable.json`,{
          id: "",
          setdate: this.setdate,
          regisdate: this.regisdate,
          name: this.name,
          amount: this.amount,
          email: this.email,
          phone: this.phone,
          state: this.state,
      })
      .then(async response => {
        await api.patch(`ordertable/${response.data.name}.json`, { id: response.data.name })
        this.id = response.data.name;
        this.$router.push("/folder/reserveTable").then(() => {
          location.reload();
        });
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
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

ion-title2 {
  padding: 45px;
  font-size: 30px;
  line-height: 80px;

}

ion-datetime-button {
  line-height: 80px;


}

ion-card-header {
  display: flex;
  flex-flow: column-reverse;
}

ion-item-group {
  padding: 10px;
}

ion-datetime-button {
  text-decoration: none;
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
  
