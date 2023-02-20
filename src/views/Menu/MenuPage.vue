<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>สั่งอาหาร</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">สั่งอาหาร</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-searchbar placeholder="ค้นหาเมนู"></ion-searchbar>

      <!-- A segment that is scrollable. It has two buttons, one for all menu and one for each category. -->
      <ion-segment :scrollable="true" value="all">
        <ion-segment-button value="all" @click="allMenu()">
          <ion-label>ทั้งหมด</ion-label>
        </ion-segment-button>
        <ion-segment-button v-for="i in categorymenudata" :key="i.Key" :value="i.Key" @click="filterMenu(i.Key)">
          <ion-label>{{ i.name }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-grid>
        <ion-row>
          <!-- <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name" :routerLink="i.name"> -->
          <!-- <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name" :routerLink="i.name"> -->
          <ion-col :sizeXs="6" :sizeMd="2.4" v-for="i in filteredMenu" :key="i.name"
            @click="toOptonal(i.Key, i.name, i.categorykey)">
            <!-- <router-link style="text-decoration: none;" :to="{
                name: 'option', params: {
                  id: i.Key, name: i.name, category: i.categorykey
                }
              }"> -->
            <ion-card>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <ion-card-header>
                <ion-card-title>{{ i.name }}</ion-card-title>
                <ion-card-subtitle>{{ i.price }} THB</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
            <!-- </router-link> -->

          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>

    <router-link v-if="$route.params.id"  :to="{ name: 'listmenu', params: { id: $route.params.id } }">
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="fastFood"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </router-link>

  </ion-page>
</template>

<script lang="ts">
// import { Item } from '@ionic/core/dist/types/components/item/item';
import { ref, defineComponent } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonLabel, IonSegment, IonSegmentButton, IonFab, IonFabButton, IonButton
} from '@ionic/vue';
import { fastFood, time, } from 'ionicons/icons';
import axios from 'axios';

const dataurl = "https://restaurant-e109e-default-rtdb.asia-southeast1.firebasedatabase.app/"
// const datamenu: MyData[] = [];

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
    IonCardSubtitle,
    IonCardTitle,
    // IonCardContent,
    IonSearchbar,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonFab,
    IonFabButton,
    // IonButton,
  },
  data() {
    return {
      filteredMenu: [],
      categorymenudata: [],
      // listmenudata: [],
      listmenudataarray: [],
      // listmenudata2: {},
    }
  },

  setup() {
    return {
      fastFood,
    }
  },

  methods: {
    async getCategoryFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}categorymenu.json`);
        this.categorymenudata = response.data
      } catch (error) {
        console.error(error);
      }
      console.log("getCategoryFromDatabase categorymenudata " + JSON.stringify(this.categorymenudata))
    },
    async getMenuFromDatabase() {
      try {
        const response = await axios.get(`${dataurl}listmenu.json`);
        this.listmenudataarray = Object.values(response.data);
        this.allMenu();
      } catch (error) {
        console.error(error);
      }
      // console.log("getMenuFromDatabase listmenudata " + JSON.stringify(this.listmenudata))
    },

    allMenu() {
      // this.getMenuFromDatabase()
      this.filteredMenu = this.listmenudataarray.sort((a: { name: string }, b: { name: string }) => (a.name < b.name) ? -1 : 1)
      console.log("allMemu listmenudata ", this.filteredMenu)
      // console.log(JSON.stringify(this.filteredMenu))
      // console.log("???")
    },
    filterMenu(iddata: string) {
      console.log("filteredMenu filteredMenu", this.filteredMenu);
      this.filteredMenu = this.listmenudataarray.filter((item: { categorykey: string }) => item.categorykey === iddata).sort((a: { name: string }, b: { name: string }) => (a.name < b.name) ? -1 : 1)
      console.log("filteredMenu2 filteredMenu", this.filteredMenu);
    },

    toOptonal(Key: string, name: string, categorykey: string) {
      if (this.$route.params.id) {
        this.$router.push({
          name: 'option2', params: {
            id: Key, name: name, category: categorykey, idorder: this.$route.params.id
          }
        });
      } else {
        this.$router.push({
          name: 'option', params: {
            id: Key, name: name, category: categorykey
          }
        });
      }
    },
  },

  created() {
    this.getCategoryFromDatabase();
    this.getMenuFromDatabase();
  },

  // beforeMount() {
  //   this.allMenu();
  //   console.log("allMemu listmenudata " + JSON.stringify(this.listmenudata))
  // },

  // mounted() {
  //   this.allMenu();
  //   console.log("allMemu listmenudata " + JSON.stringify(this.listmenudata))
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