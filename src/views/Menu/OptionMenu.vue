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
            <h1>{{ $route.params.name }}</h1>
          </ion-label>
        </ion-card-header>

        <ion-card-content>
          <ion-label color="dark">
            <h2>ตัวเลือกอาหาร</h2>
          </ion-label>

          <ion-item v-for="i in filteredoption" :key="i">
            <ion-list>

              <!-- Title -->
              <ion-list-header>
                <ion-item lines="none">
                  <ion-text>
                    {{ i.name }}
                  </ion-text>
                  <ion-text v-if="i.request === 1" slot="end" color="medium">*จำเป็นต้องเลือก</ion-text>
                  <ion-text v-if="i.requestmax > 0" slot="end" color="medium">*เลือกได้สูงสุด {{ i.requestmax }}
                    ชิ้น</ion-text>
                </ion-item>
              </ion-list-header>

              <!-- Option Radio -->
              <ion-radio-group v-if="i.typecheck === 1" @ionChange="radioChanged">
                <ion-item v-for="n in i.suboption" :key="n.name" lines="none">
                  <ion-radio slot="start" :value="n"></ion-radio>
                  <ion-text>
                    <h3>{{ n.name }}</h3>
                  </ion-text>
                  <ion-text slot="end">
                    <h3>+{{ n.price }}</h3>
                  </ion-text>
                </ion-item>
              </ion-radio-group>

              <!-- Option CheckBox -->
              <div v-if="i.typecheck === 2">
                <ion-item v-for="n in i.suboption" :key="n.name" lines="none">
                  <ion-checkbox slot="start" :value="n" @ionChange="checkboxChanged($event)"></ion-checkbox>
                  <ion-text>
                    <h3>{{ n.name }}</h3>
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

          <!-- <router-link :to="{
            name: 'menu2', params: {
              order: idorder
            }
          }"> -->
          <ion-button expand="block" color="success" @click="createOrder" routerLink="/MenuPage">
            <ion-icon slot="start" :icon="addCircle"></ion-icon>
            เพิ่ม
            <ion-label>: {{ menudata.price+radioprice+checkboxprice }}</ion-label>
          </ion-button>
          <!-- </router-link> -->

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
// import { RouteLocationRaw, useRoute } from 'vue-router';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonItemGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonCheckbox, IonList, IonRadio, IonRadioGroup, IonListHeader, IonText, IonInput, IonIcon, RadioGroupCustomEvent, CheckboxCustomEvent, } from '@ionic/vue';
import { star, addCircle, removeCircle, constructOutline, shapesSharp, compassOutline, } from 'ionicons/icons';
import axios from 'axios';
import { Method } from '@babel/types';
import { toastController } from '@ionic/core';
import { Item } from '@ionic/core/dist/types/components/item/item';

const dataurl = "https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/";
const api = axios.create({ baseURL: 'https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/' });

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
      idorder: "",
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
      ], //
      categorydata: [],
      optiondata: [] as any,
      filteredoption: [],
      menudata: [] as any,
      order: {
        note: null,
        ordertype: "โต๊ะ",
        statorder: 1,
        menu: {
          menu_id: this.$route.params.id,
          menu_name: this.$route.params.name,
          price: "",
          quantiry: "",
          menu_option: this.optionselect,

        },
      }, //
      optionselect: [] as any,
      // optionselectold: [] as any,
      radio: "",
      radioprice: 0,
      checkboxprice: 0,
      totalprice: 0,
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

    //get all data and filter option details
    async filteroption() {
      await this.getCategoryFromDatabase();
      await this.getOptionFromDatabase();
      await this.getMenuFromDatabase();
      const category = this.categorydata.map((item: { id: string }) => item.id);
      this.filteredoption = this.optiondata.filter((item: { id: string }) => category.includes(item.id))
      console.log("filteredoption", this.filteredoption)
      // console.log(this.neworder.menu_id);
    },

    //get id option in category
    async getCategoryFromDatabase() {
      try {
        // const response = await axios.get(`${dataurl}categorymenu/${this.$route.params.category}/Optionmenu.json`);
        const response = await api.get(`categorymenu/${this.$route.params.category}/Optionmenu.json`);
        this.categorydata = Object.values(response.data);
        // console.log("I I OptionMenu", this.categorydata);
      } catch (error) {
        console.error(error);
      }
    },

    //get option details
    async getOptionFromDatabase() {
      try {
        // const response = await axios.get(`${dataurl}optionmenu.json`);
        const response = await api.get(`optionmenu.json`);
        this.optiondata = Object.values(response.data);
        // console.log("II I AllOption", this.optiondata);
      } catch (error) {
        console.error(error);
      }
    },

    async getMenuFromDatabase() {
      try {
        // const response = await axios.get(`${dataurl}listmenu.json`);
        const response = await api.get(`listmenu.json`);
        this.menudata = Object.values(response.data);
        this.menudata = this.menudata.filter((item: { Key: string }) => item.Key === this.$route.params.id);
        this.menudata = this.menudata[0];
        this.totalprice = this.menudata.price
        // console.log("III II Menu", this.menudata.price);
      } catch (error) {
        console.error(error);
      }
    },

    radioChanged(event: RadioGroupCustomEvent) {
      // const valuetarger = event.target.value
      console.log("RadioI", event.target.value)
      this.radio = event.target.value.name;
      this.radioprice = event.target.value.price;

      console.log("RadioII", this.radio)
      console.log("RadioII", this.radioprice)
    },

    checkboxChanged(event: CheckboxCustomEvent) {
      // const valuetarger = event.target.value
      console.log("Checkbox", event.target.value)
      if (this.optionselect.find((element: any) => element === event.target.value.name)) {
        this.optionselect.pop(event.target.value.name)
        this.checkboxprice -= event.target.value.price

        console.log(true)
        console.log(this.optionselect)
        console.log(this.checkboxprice)
      }
      else {
        console.log(false)
        this.optionselect.push(event.target.value.name)
        this.checkboxprice += event.target.value.price
        console.log(this.optionselect)
        console.log(this.checkboxprice)
      }
    },

    async createOrder() {
      this.optionselect.push(this.radio)
      this.totalprice = this.menudata.price + this.radioprice + this.checkboxprice
      await api.post("order.json", {
        idorder: "",
        note: "",
        ordertype: "โต๊ะ",
        statorder: 1,
        menu: [
          {
            menu_id: this.$route.params.id,
            menu_name: this.$route.params.name,
            price: this.totalprice,
            quantity: 1,
            menu_option: this.optionselect,
          }
        ],
      })
        .then(response => {
          console.log(response.data);
          api.patch(`order/${response.data.name}.json`, { idorder: response.data.name })
          this.idorder = response.data.name;
        })
        .catch(error => {
          console.log(error)
        })
    }
  },


  created() {
    this.filteroption();
    console.log(this.$route.params.id);
    console.log(this.$route.params.name);
    console.log(this.$route.params.category);
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
