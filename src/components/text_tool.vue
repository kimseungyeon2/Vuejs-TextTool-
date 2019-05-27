<template lang="html">
  <v-layout row wrap>
    <tool></tool>
    <v-layout>
    <v-flex xl12 sm12 md12>
        <v-flex xl12 sm12 md12>
          <v-tooltip v-model="show" top>
            <template v-slot:activator="{ on }">
              <div id="text_box"
                contenteditable="true"
                v-on:mouseup="drag_text($event)"
              >
                <div class="" v-for="(tent,i) in c_getter" :key="i">
                  {{tent}}
                </div>
              </div>
            </template>
            <span id="tooltip"></span>
            <v-icon class="btn" small color="white" v-on:click="search(search_value,-1)">search</v-icon>
            <v-icon class="btn" small color="white" v-on:click="search_words()">find_replace</v-icon>
            <v-icon class="btn" small color="white" v-on:click="drag_text_close()">clear</v-icon>
          </v-tooltip>
          <v-flex xl12 sm12 md12>
            <v-btn fab small color="orange"
              v-on:click="download(content)"
            >
              <v-icon color="white">
                archive
              </v-icon>
            </v-btn>
          </v-flex>

        </v-flex>
    </v-flex>
    <v-flex xl4 sm4 md4 v-show="open_search">
      <v-layout justify-end>
        <v-btn fab small color="orange"
          @click="open_search = false"
        >
          <v-icon color="white">close</v-icon>
        </v-btn>
      </v-layout>
      <div class="" style="overflow:scroll; height:40%;">
        <v-card class="ma-2" v-for="(word,i) in words" :key="i">
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0">{{word.text}}</h4>
              <div>
                <v-btn icon small color="orange"
                  v-on:click="search(word.text,i)"
                >
                  <v-icon color="white">search</v-icon>
                </v-btn>
                <div class="">
                  {{word.content}}
                </div>
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange"
              @click="delete_words(i)"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import tool from '@/components/tool';
export default {
  components:{
    tool,
  },
  data(){
    return{
      search_value:'',
      content:'',
      show:true,
      open_search:false,
      words:[],
    }
  },
  methods:{
    ...mapActions(['file_call_action','content_action','text_box_action','search_words_action','drag_text_action','search_word_action']),
    drag_text(){
      this.show = true;//tooltip open
      document.getElementById('tooltip').innerHTML = document.getSelection();
      this.search_value = document.getElementById('tooltip').innerHTML;
      let data = {
        text:document.getElementById('tooltip').innerHTML,
        number: document.getElementById('text_box').innerHTML.indexOf(document.getElementById('tooltip').innerHTML),
      }
      this.drag_text_action(data);
    },
    drag_text_close(){
      this.show = false;
      let data = {
        text:'',
        number:0,
      }
      this.drag_text_action(data);
    },
    search(value,number){
      this.search_word_action(value).then(result=>{
        if(number != -1){
          this.words[number].content = result;
        }else{
          this.words.unshift({
            'text':value,
            'content':result,
          });
          this.open_search = true;
        }
      });
    },
    search_words(){
      this.search_words_action(document.getElementById('tooltip').innerHTML).then(result => {
        for (let i = 0; i < result.length; i++) {
          this.words.push({
            'text':result[i].text.content,
            'content':'',
          });
        }
        this.open_search = true;
      });
    },
    delete_words(number){
      this.words.splice(number,1);
    },
    download(content){//file download function
      for (let i = 0; i < this.c_getter.length; i++) {
        this.content = this.content + this.c_getter[i];
      }
      let blob = new Blob([content], { type: 'text/plain' });
      let objURL = window.URL.createObjectURL(blob);
      //Memory Off
      if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
      }
      window.__Xr_objURL_forCreatingFile__ = objURL;
      let a = document.createElement('a');
      a.download = this.$route.query.file;
      a.href = objURL;
      a.click();
    }
  },
  mounted:function(){
    this.text_box_action(document.getElementById('text_box'));
    this.file_call_action(this.$route.query.file).then(result=>{
      this.content_action(result);
    });
  },
  computed:{
    ...mapGetters({
      c_getter:'content_getter',
      t_b_getter:'text_box_getter',
    })
  },
  watch:{

  }
}
</script>

<style lang="css" scoped>
#text_box{
  width:100%;
  height:50%;
}
.btn:hover{
  background: white;
  border-radius: 100px;
}
</style>
