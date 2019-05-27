<template>
  <v-app>
    <v-layout>
     <v-flex xs12 sm12>
       <v-card>
         <v-toolbar color="orange" dark>
           <v-toolbar-side-icon
            @click.stop="drawer = !drawer"
           ></v-toolbar-side-icon>
           <v-toolbar-title>TEXT TOOL</v-toolbar-title>
           <v-spacer></v-spacer>
           <v-btn icon router :to="{name:'upload'}">
             <v-icon>vertical_align_bottom</v-icon>
           </v-btn>
         </v-toolbar>
         <v-list two-line>
           <router-view></router-view>
         </v-list>
       </v-card>
     </v-flex>


     <v-navigation-drawer
       v-model="drawer"
       absolute
       temporary
     >
       <v-list class="pa-1">
         <v-list-tile avatar>
           <v-list-tile-avatar>
             <img src="https://i.pinimg.com/originals/74/55/37/745537d70eb39eb6538a3dac47c4b5be.jpg">
           </v-list-tile-avatar>

           <v-list-tile-content>
             <v-list-tile-title>Menu</v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </v-list>

       <v-list class="pt-0" dense>
         <v-divider></v-divider>

         <v-list-tile
           v-for="item in items"
           :key="item.title"
           @click=""
         >
           <v-list-tile-action>
             <v-icon color="orange">{{ item.icon }}</v-icon>
           </v-list-tile-action>

           <v-list-tile-content>
             <v-list-tile-title>{{ item.title }}</v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </v-list>
     </v-navigation-drawer>
   </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      drawer: null,
        items: [
          { title: 'upload', icon: 'vertical_align_bottom' },
        ]
    }
  }
}
</script>
