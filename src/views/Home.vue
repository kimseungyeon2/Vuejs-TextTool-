<template>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      >
      <h2 style="color:orange;">{{item.explain}}</h2>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://cdnweb01.wikitree.co.kr/webdata/editor/201301/22/img_20130122153527_5f8cc202.jpg',
            explain:'Text Tool',
          },
          {
            src: 'https://i.pinimg.com/originals/9c/29/9c/9c299c738d389cfba56fae218efb1bd0.jpg',
            explain:'Audio Tool',
          },
          {
            src: 'http://cfile215.uf.daum.net/image/2216F6505508F6E107C7F0',
            explain:'Image Tool',
          }
        ]
      }
    },
    mounted:function(){
      
    }
  }
</script>
<style scoped="true">
h2{

}
</style>
