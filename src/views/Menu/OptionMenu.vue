<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>ตัวเลือกอาหาร</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ตัวเลือกอาหาร</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
        <ion-card-header>
          <ion-label color="dark">
            <h1>{{ $route.params.id }}</h1>
          </ion-label>
        </ion-card-header>

        <ion-card-content>
          <ion-label color="dark">
            <h2>ตัวเลือกอาหาร</h2>
          </ion-label>

          <ion-item v-for="i in choicetabie" :key="i.nameoption">
            <ion-list>
              <ion-list-header>
                <ion-item lines="none">
                  <ion-text>
                    {{ i.nameoption }}
                  </ion-text>
                  <ion-text v-if="i.request === 1" slot="end" color="medium">*จำเป็นต้องเลือก</ion-text>
                  <ion-text v-if="i.requestmax > 0" slot="end" color="medium">*เลือกได้สูงสุด {{ i.requestmax }}
                    ชิ้น</ion-text>
                </ion-item>
              </ion-list-header>

              <ion-radio-group v-if="i.checktype === 1">
                <ion-item v-for="n in i.suboption" :key="n.namesub" lines="none">
                  <ion-radio slot="start"></ion-radio>
                  <ion-text>
                    <h3>{{ n.namesub }}</h3>
                  </ion-text>
                  <ion-text slot="end">
                    <h3>+{{ n.price }}</h3>
                  </ion-text>
                </ion-item>
              </ion-radio-group>

              <div v-if="i.checktype === 2">
                <ion-item v-for="n in i.suboption" :key="n.namesub" lines="none">
                  <ion-checkbox slot="start"></ion-checkbox>
                  <ion-text>
                    <h3>{{ n.namesub }}</h3>
                  </ion-text>
                  <ion-text slot="end">
                    <h3>+{{ n.price }}</h3>
                  </ion-text>
                </ion-item>
              </div>

            </ion-list>
          </ion-item>

          <ion-item>
            <ion-input placeholder="เพิ่มหมายเหตุเมนูนี้ "></ion-input>
          </ion-item>

          <!-- <ion-item class="ion-align-items-center ion-justify-content-center">
            <ion-icon :icon="removeCircle"></ion-icon>
            <ion-text>1</ion-text>
            <ion-icon :icon="addCircle"></ion-icon>
          </ion-item> -->

          <ion-button expand="block" color="success" routerLink="/folder/MenuPage">
            <ion-icon slot="start" :icon="addCircle"></ion-icon>
            เพิ่ม
            <ion-label>: [ราคา]</ion-label>
          </ion-button>

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
// import { RouteLocationRaw, useRoute } from 'vue-router';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonCheckbox, IonList, IonRadio, IonRadioGroup, IonListHeader, IonText, IonInput, IonIcon, } from '@ionic/vue';
import { star, addCircle, removeCircle, constructOutline, } from 'ionicons/icons';
import axios from 'axios';

const dataurl = "https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/"

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
    IonIcon

  },
  data() {
    return {
      choicetabie: [
        {
          nameoption: 'ตัวเลือก 1',
          request: 0,   //จำเป็นต้องเลือก
          requestmax: 3,
          checktype: 2, //Type CheckBox
          suboption: [
            { namesub: 'ตัวเลือกย่อย 1', price: 0 },
            { namesub: 'ตัวเลือกย่อย 2', price: 5 },
            { namesub: 'ตัวเลือกย่อย 3', price: 10 },
          ],
        },
        {
          nameoption: 'ตัวเลือก 2',
          request: 1,   //จำเป็นต้องเลือก
          requestmax: 0,
          checktype: 1, //Type Radio
          suboption: [
            { namesub: 'ตัวเลือกย่อย 1', price: 0 },
            { namesub: 'ตัวเลือกย่อย 2', price: 0 },
            { namesub: 'ตัวเลือกย่อย 3', price: 0 },
          ],
        },
      ],
      menudata: [],
      filteredmenu: [],
    }
  },
  setup() {
    return {
      star,
      addCircle,
      removeCircle,
    }
  },
  methods: {
    async getMenuFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}listmenu.json`);
        console.log("x getMenuFromDatabase", JSON.stringify(response.data));
        this.menudata = Object.values(response.data);
        console.log("xx getMenuFromDatabase", this.menudata);
        this.filtermenu();
      } catch (error) {
        console.error(error);
      }
    },
    async getOptionFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}listmenu.json`);
        console.log("x getMenuFromDatabase", JSON.stringify(response.data));
        this.menudata = Object.values(response.data);
        console.log("xx getMenuFromDatabase", this.menudata);
        this.filtermenu();
      } catch (error) {
        console.error(error);
      }
    },
    filtermenu() {
      this.filteredmenu = this.menudata.filter((item: { name: string; }) => item.name == this.$route.params.id)
      console.log("filter", this.filteredmenu)
    }
    //   toroute(rou: RouteLocationRaw) {
    //     this.$router.push(rou)
    //   }
  },
  created() {
    this.getMenuFromDatabase();
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