<template>
  <div class="simplebox">
    <div>
      <p :id="'sec-' + el.id">
        <span
          ><font-awesome-icon icon="edit" class="fas fa-edit fa-lg il"/></span
        >{{ el.section }}
      </p>
      <p
        :id="el.id"
        contenteditable="true"
        @input="showSaveIcon(el.id)"
        v-html="el.verbiage"
      ></p>
    </div>
  </div>
</template>

<script type="module">
export default {
  name: 'LineItem',

  // @click="editX(el.section, el.verbiage, el.id)"
  components: {},
  props: {
    el: {
      required: true
    }
  }
}
</script>
<style>
.simplebox {
  border: solid seagreen 1px;
}
</style>
