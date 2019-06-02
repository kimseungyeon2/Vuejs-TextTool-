<template lang="html">
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-card-title>
          <v-icon color="orange">insert_drive_file</v-icon>
          TEXT FILE UPLOAD
        </v-card-title>

        <v-container style="border:1px solid orange;" v-on:dragover.prevent v-on:drop="on_drop($event)">
          <v-layout  justify-center>
            <v-icon v-if="!file_name">
              add
            </v-icon>
            <v-btn large fab color="orange" v-else v-on:click="on_upload()">
              <v-icon large color="white">
                vertical_align_bottom
              </v-icon>
            </v-btn>
          </v-layout>
        </v-container>

        <div class="" v-show="drop_open">
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </div>
        <v-card-actions>
          <input id="file_element" type="file" name="text" v-on:change="on_change($event)" style="display:none;">
          <v-btn flat color="orange" v-on:click="file_select($event)">FILE_SELECT</v-btn>
          {{file_name}}
        </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data(){
    return{
      file_element:'',
      file_name:'',
      drop_open:false,
      file:'',
    }
  },
  methods:{
    ...mapActions(['upload_action','file_call_action']),
    on_drop(evt) { //on drop methods
      evt.stopPropagation();
      evt.preventDefault();

      this.file = evt.dataTransfer.files;
      this.create_file(this.file[0]);

    },
    create_file(file) { //create file video methods
      if (!file.type.match('text.*')) {//video filter
        alert('This is not TEXT FILE');
        return;
      } else {
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //   console.log(e.target.result);
        // }
        // reader.readAsDataURL(file);
        this.file_name = file.name;
      }
    },
    on_change(evt){
      this.file = evt.target.files;
      this.create_file(this.file[0]);
    },
    file_select() {
      this.file_element.click();
    },
    on_upload(){
      this.upload_action(this.file).then(result => {
        console.log(result.originalname.split('.')[0]);
        if(result){
          this.$router.push({
            name:'textTool',
            query:{file: result.originalname.split('.')[0]}
          });
        }else{
          this.$router.push({name:'home'});
        }
      });
    }
  },
  mounted:function(){
    this.file_element = document.getElementById('file_element');
  },
}
</script>

<style lang="css" scoped>
</style>
