<template lang="html">
  <v-toolbar dense color="white">

    <v-btn-toggle
      class="transparent"
      multiple
    >
      <v-btn :value="1" flat
        @click="text_decorate($event)"
      >
        <v-icon color="orange" :value="1">format_bold</v-icon>
      </v-btn>

      <v-btn :value="2" flat
        @click="text_slant($event)"
      >
        <v-icon color="orange" :value="1">format_italic</v-icon>
      </v-btn>

      <v-btn :value="3" flat id="color_fix"
        v-on:click="open_color_fix()"
      >
        <v-icon :color="color_fill">format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-divider
      class="mx-2"
      vertical
    ></v-divider>

    <v-btn-toggle
      class="transparent"
    >
      <v-btn :value="1" flat
        v-on:click="text_sort('left')"
      >
        <v-icon color="orange">format_align_left</v-icon>
      </v-btn>

      <v-btn :value="2" flat
        v-on:click="text_sort('center')"
      >
        <v-icon color="orange">format_align_center</v-icon>
      </v-btn>

      <v-btn :value="3" flat
        v-on:click="text_sort('right')"
      >
        <v-icon color="orange">format_align_right</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-divider
      class="mx-2"
      vertical
    ></v-divider>

    <v-btn-toggle>
      <v-btn :value="1" flat>
        <v-icon color="orange">folder</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290" height="500">
        <template v-slot:activator="{ on }">
        </template>
        <v-card>
          <h3 style="color:orange;">COLOR FIX</h3>
          <v-card-title class="headline">
            <label for="color-input" id="color-label" style="background-color: red"></label>
            <div id="color-picker">
              <canvas id="color-block" height="150" width="150"
                v-on:mousedown="mousedown($event)"
                v-on:mouseup="mouseup($event)"
                v-on:mousemove="mousemove($event)"
              ></canvas>
              <canvas id="color-strip" height="150" width="30"
                v-on:click="click($event)"
              ></canvas>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" flat v-on:click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-toolbar>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data(){
    return{
      drag_:{
        startNode:'',
        endNode:'',
        startOffset:'',
        endOffset:'',
      },
      //color fillter values
      drag_text:'',
      drag_text_number:'',
      color_fill:'black',
      dialog:false,
      drag:false,
      ctx:{
        block:'',
        strip:'',
      },
      canvas_length:{
        width1:'',
        width2:'',
        height1:'',
        height2:'',
      },
      location:{
        x:'',
        y:'',
      },
      rgbaColor:'',
    }
  },
  methods:{
    drag_selection(){
      this.drag_.startNode = document.getSelection().anchorNode;
      this.drag_.endNode = document.getSelection().focusNode;
      this.drag_.startOffset = document.getSelection().anchorOffset;
      this.drag_.endOffset = document.getSelection().focusOffset;
      console.log(this.drag_.startNode);
      console.log(this.drag_.endNode);
      console.log(this.drag_.startOffset);
      console.log(this.drag_.endOffset);
    },
    text_sort(value){
      this.t_b_getter.style.textAlign = value;
    },
    text_decorate(event){
      if(this.d_t_getter){//0=! true
        document.execCommand("bold");
      }else{//0= flase
        if(this.t_b_getter.style.fontWeight == 'bold'){
          this.t_b_getter.style.fontWeight = 'normal';
        }else{
          this.t_b_getter.style.fontWeight = 'bold';
        }
      }
    },
    text_slant(event){
      if(this.d_t_getter){
        document.execCommand("italic");
      }else{
        if(this.t_b_getter.style.fontStyle == 'italic'){
          this.t_b_getter.style.fontStyle = 'normal';
        }else{
          this.t_b_getter.style.fontStyle = 'italic';
        }
      }
    },
    //color fillter methods
    open_color_fix(){
      this.drag_selection();//drag selection
      this.dialog = true;
    },
    click(evt){
      this.location.x = evt.offsetX;
      this.location.y = evt.offsetY;
      let imageData = this.ctx.strip.getImageData(this.location.x,this.location.y,1,1).data;
      this.rgbaColor = 'rgba('+imageData[0]+','+imageData[1]+','+imageData[2]+',1)';
      this.fillGradient();
    },
    fillGradient(){
      this.ctx.block.fillStyle = this.rgbaColor;
      this.ctx.block.fillRect(0,0,this.canvas_length.width1,this.canvas_length.height1);

      let grdWhite = this.ctx.strip.createLinearGradient(0,0,this.canvas_length.width1,0);
      grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
      grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
      this.ctx.block.fillStyle = grdWhite;
      this.ctx.block.fillRect(0,0,this.canvas_length.width1,this.canvas_length.height1);

      let grdBlack = this.ctx.strip.createLinearGradient(0, 0, 0, this.canvas_length.height1);
      grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
      grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
      this.ctx.block.fillStyle = grdBlack;
      this.ctx.block.fillRect(0, 0, this.canvas_length.width1, this.canvas_length.height1);
    },
    mousedown(evt){
      this.drag = true;
      this.changeColor(evt);
    },
    mousemove(evt){
      if(this.drag){
        this.changeColor(evt);
      }
    },
    mouseup(evt){
      this.drag = false;
      if(this.d_t_getter){//drag select colof change
        let range = document.createRange();

        range.setStart(this.drag_.startNode,this.drag_.startOffset);
        range.setEnd(this.drag_.endNode,this.drag_.endOffset);

        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('foreColor', false, this.rgbaColor);
      }else{
        this.t_b_getter.style.color = this.rgbaColor;
      }
      this.color_fill = this.rgbaColor;
    },
    changeColor(evt){
      this.location.x = evt.offsetX;
      this.location.y = evt.offsetY;
      let imageData = this.ctx.block.getImageData(this.location.x,this.location.y,1,1).data;
      this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
      document.getElementById('color-label').style.backgroundColor = this.rgbaColor;
    }
  },
  mounted:function(){
    let colorBlock = document.getElementById('color-block');
    this.ctx.block = colorBlock.getContext('2d');//getContext: draw plate
    this.canvas_length.width1 = colorBlock.width;
    this.canvas_length.height1 = colorBlock.height;

    let colorStrip = document.getElementById('color-strip');
    this.ctx.strip = colorStrip.getContext('2d');//getContext: draw plate
    this.canvas_length.width2 = colorStrip.width;
    this.canvas_length.height2 = colorStrip.height;

    // let colorLabel = document.getElementById('color-label');

    this.location.x = 0;
    this.location.y = 0;
    this.drag = false;
    this.rgbaColor = 'rgba(255,0,0,1)';// rgbaColor : red

    this.ctx.block.rect(0, 0, this.canvas_length.width1, this.canvas_length.height1);//draw Rectangle(직사각형)
    this.fillGradient();

    this.ctx.strip.rect(0, 0, this.canvas_length.width2, this.canvas_length.height2);//draw Rectangle(직사각형)
    let grd1 = this.ctx.strip.createLinearGradient(0, 0, 0, this.canvas_length.height1);//draw LinearGradient
    grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');//addColorStrop: color range
    this.ctx.strip.fillStyle = grd1;//fillStyle:도형을 채우는 색을 설정
    this.ctx.strip.fill();//

  },
  updated:function(){
    console.log("up");
    this.drag_selection();
  },
  computed:{
    ...mapGetters({
      t_b_getter:'text_box_getter',
      d_t_getter:'drag_text_getter',
      d_t_n_getter:'drag_text_number_getter',
    })
  },
  watch:{
    d_t_getter: function(data){
      this.drag_text =this.d_t_getter;
      this.drag_text_number = this.d_t_n_getter;
    }
  }
}
</script>

<style lang="css" scoped>
canvas{
  border:3px solid white;
  border-radius: 100px;
}
#color-label {
  border-radius: 100px;
  margin-left: 15px;
  left:200px;
  top:18%;
  position: absolute;
  height: 30px;
  width: 50px;
}
canvas:hover {
  cursor: crosshair;
}
</style>
