<template>
  <div class="lastGrandPrixTitle">
    <p class="title">Last Grand Prix</p>
    <p class="subtitle">Circuit Name</p>
    <nav class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Date:</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Pole-Sitter:</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Fastest Lap:</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Conditions:</p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import LastGrandPrixService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data
    }
  }
}
</script>
