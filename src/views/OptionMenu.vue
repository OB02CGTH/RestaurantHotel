<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Menu 2</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
        <ion-card-header>
          <ion-label color="dark">
            <h1>เมนู 1</h1>
          </ion-label>
        </ion-card-header>

        <ion-card-content>
          <ion-label color="dark">
            <h2>ตัวเลือกอาหาร</h2>
          </ion-label>
          <ion-item>
            <ion-list>
              <ion-list-header>
                <ion-item lines="none">
                  <ion-label>
                    <h2>ตัวเลือก 1</h2>
                  </ion-label>
                  <ion-label slot="end" color="medium">*?????</ion-label>
                </ion-item>
              </ion-list-header>
              <ion-item lines="none">
                <ion-checkbox slot="start"></ion-checkbox>
                <ion-label>
                  <h3>ตัวเลือกย่อย 1</h3>
                </ion-label>
                <ion-label slot="end">ราคา</ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-checkbox slot="start"></ion-checkbox>
                <ion-label>
                  <h3>ตัวเลือกย่อย 2</h3>
                </ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-checkbox slot="start"></ion-checkbox>
                <ion-label>
                  <h3>ตัวเลือกย่อย 3</h3>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-item>
          <ion-item>
            <ion-list>
              <ion-list-header>
                <ion-item lines="none">
                  <ion-label>
                    <h2>ตัวเลือก 2</h2>
                  </ion-label>
                  <ion-label slot="end" color="medium">*จำเป็นต้องเลือก</ion-label>
                </ion-item>
              </ion-list-header>
              <ion-radio-group>
                <ion-item lines="none">
                  <ion-radio slot="start"></ion-radio>
                  <ion-label>
                    <h3>ตัวเลือกย่อย 1</h3>
                  </ion-label>
                </ion-item>
                <ion-item lines="none">
                  <ion-radio slot="start"></ion-radio>
                  <ion-label>
                    <h3>ตัวเลือกย่อย 2</h3>
                  </ion-label>
                </ion-item>
                <ion-item lines="none">
                  <ion-radio slot="start"></ion-radio>
                  <ion-label>
                    <h3>ตัวเลือกย่อย 3</h3>
                  </ion-label>
                </ion-item>
              </ion-radio-group>
            </ion-list>
          </ion-item>

          <ion-item>
            <ion-input placeholder="เพิ่มหมายเหตุเมนูนี้ "></ion-input>
          </ion-item>

          <ion-button expand="block" color="success">
            <ion-icon slot="start" :icon="addCircle"></ion-icon>
            เพิ่ม
            <ion-label>: [ราคา]</ion-label>
          </ion-button>
        </ion-card-content>
      </ion-card>
      <!-- <div id="container">
        <strong class="capitalize">{{ $route.params.id }}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonCheckbox, IonList, IonRadio, IonRadioGroup, IonListHeader, } from '@ionic/vue';
import { star, addCircle, removeCircle, } from 'ionicons/icons';

export default defineComponent({
  components: {
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
  },
  setup() {
    return {
      star,
      addCircle,
      removeCircle,
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
