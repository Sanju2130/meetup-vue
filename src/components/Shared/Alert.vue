<template>
  <v-alert @input="onClose" type="error" dismissible :value="true">
      {{ text }}
    </v-alert>
</template>

<script>
    export default {
        props: ['text'],
        methods: {
            onClose () {
                this.$emit('dismiss')
            }
        }
    }
</script>
