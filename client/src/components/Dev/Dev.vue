<template>
  <div class="simple-page">
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <Container 
                :group-name="'test'"
                :get-child-payload="i => getPayload(i, 'items')"
                @drop="onDrop('items', $event)"
            >
                <Draggable v-for="item in items" :key="item.id" :should-accept-drop="true">
                    <div class="draggable-item">
                        <h3 class="word">
                            {{item.data}}
                        </h3>
                    </div>
                </Draggable>
            </Container>
        </div>
        <div class="md-layout-item">
            <Container
                :group-name="'test'"
                :get-child-payload="i => getPayload(i, 'items2')"
                @drop="onDrop('items2', $event)"
            >
                <Draggable v-for="item in items2" :key="item.id" :should-accept-drop="true">
                    <div class="draggable-item">
                        <h3 class="word">
                            {{item.data}}
                        </h3>
                    </div>
                </Draggable>
            </Container>
        </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: 'Dev',
  data () {
    return {
      items: [
        {
          id : 1,
          data : 'zauuuuu'
        },
        {
          id : 2,
          data : 'qưeqweqweqwe'
        },
        {
          id : 3,
          data : 'Hello'
        },
        {
          id : 4,
          data : 'Heellooo'
        },
        {
          id : 5,
          data : 'al,sdla,sdl'
        }
      ],
      items2: [
        {
          id : 11,
          data : 'zxczxc'
        },
        {
          id : 21,
          data : '123'
        }
      ]
    }
  },
  methods : {
      onDrop(collection, dropResult) {
        this[collection]= this.applyDrag(this[collection], dropResult);
      },
      getPayload (i, arr) {
        return this[arr][i];
      },
      applyDrag(array, { removedIndex, addedIndex, payload }) {
        if (removedIndex === null && addedIndex === null) return array;

        const result = [...array];
        let itemToAdd = payload;

        if (removedIndex !== null) {
          itemToAdd = result.splice(removedIndex, 1)[0];
        }

        if (addedIndex !== null) {
          result.splice(addedIndex, 0, itemToAdd);
        }

        return result;
      },
  },
  components: {
      Container,
      Draggable
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.word {
  border: 1px solid #678;
  padding: 5px 10px;
  background-color: white;
  margin-right: 5px;
}
</style>
