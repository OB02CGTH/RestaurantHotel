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
          <ion-datetime slot="content" presentation="date-time" onIonChange={this.onStartChange}
            minute-values="0,15,30,45"></ion-datetime></ion-accordion>
        <ion-accordion value="end">
          <ion-item slot="header">
            <ion-label>ถึง-เวลา</ion-label>
            <ion-note slot="end"></ion-note>
          </ion-item>
          <ion-datetime slot="content" presentation="date-time" onIonChange={this.onEndChange}
            minute-values="0,15,30,45"></ion-datetime> </ion-accordion>
        <ion-item>
          <ion-label position="floating">ชื่อ-สกุล</ion-label>
          <ion-input placeholder="กรุณากรอกชื่อ-สกุล"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">จํานวนคน</ion-label>
          <ion-input type="number" placeholder="0"></ion-input>
        </ion-item>


        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" placeholder="email@domain.com"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">เบอร์ติดต่อ</ion-label>
          <ion-input type="tel" placeholder="888-888-8888"></ion-input>
        </ion-item>
      </ion-accordion-group>
      <ion-button fill="clear" expand="block" color="danger" routerLink="/folder/reserveTable">
        <ion-icon></ion-icon>
        ย้อนกลับ
      </ion-button>

      <ion-button expand="block" color="success" routerLink="/folder/summarytable">
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

    }
  },

  setup() {
    return {
      star,
      addCircle,
      removeCircle,
      value1: ''
    }
  }
  ,
  methods: {
    toroute(rou: RouteLocationRaw) {
      this.$router.push(rou)
    },
    // validateEmail(email) {
    //   return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    // }, 
    //  validate(ev) {
    //    const value = ev.target.value;

    // this.$refs.item.$el.classList.remove('ion-valid');
    //   this.$refs.item.$el.classList.remove('ion-invalid');

    //   if (value === '') return;

    //   this.validateEmail(value)
    //   ? this.$refs.item.$el.classList.add('ion-valid')
    //   : this.$refs.item.$el.classList.add('ion-invalid');
    //  },

    //  markTouched() {
    //    this.$refs.item.$el.classList.add('ion-touched')}},


    checkValue() {
      if (this.value1 !== '11') {
        this.value1 = ''
      }
    }

  }

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
}</style>
  
