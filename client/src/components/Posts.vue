
<template>
  <div class="posts">
    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-parent ">
            <article class="tile notification is-child box">
              <p class="title">{{posts.raceName}}</p>
              <p class="subtitle">{{posts.circuitName}}</br>&nbsp; {{posts.locationCity}}, {{posts.locationCountry}}</p>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading"><b>Date:</b>&nbsp;{{posts.lastDate}}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading"><b>Pole-Sitter:</b>&nbsp;{{posts.polesitter}}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading"><b>Fastest Lap:</b> &nbsp; {{posts.fastestLapHolder}} &nbsp; <b>|</b> &nbsp; Time: {{posts.fastestLapTime}} &nbsp; <b>|</b> &nbsp;
                      Lap: {{posts.fastestLap}} &nbsp; <b>|</b> &nbsp; Team: {{posts.fastLapConstructor}}
                      </p>
                    </div>
                  </div>
                </div>
              </nav>
              <p class="heading">Podium</p>
              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <article class="media">
                      <figure class="media-left">
                        <img class= 'image is-128x128' :src="'/static/images/'+posts.first.Driver.givenName+ '.jpeg'" />
                      </figure>
                    <div class="media-content">

                    <p class="subtitle">1st Place</p>
                    <p class="title is-size-4">{{posts.first.Driver.givenName}} {{posts.first.Driver.familyName}}</p>
                    <p class="is-7">Time: {{posts.first.Time.time}}</br> Fastest Lap: {{posts.first.FastestLap.Time.time}}</p>
                  </div>
                    </article>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <article class="media">
                      <figure class="media-left">
                        <img class= 'image is-128x128' :src="'../../static/images/'+posts.second.Driver.givenName+'.jpeg'" />
                      </figure>
                    <div class="media-content">
                    <p class="subtitle">2nd Place</p>
                    <p class="title is-size-4">{{posts.second.Driver.givenName}} {{posts.second.Driver.familyName}}</p>
                    <p class="is-7">Time: {{posts.second.Time.time}}</br> Fastest Lap: {{posts.second.FastestLap.Time.time}}</p>
                  </div>
                  </article>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <article class="media">
                      <figure class="media-left">
                          <img class='image is-128x128' :src="'../../static/images/'+ posts.third.Driver.givenName + '.jpeg'" />
                      </figure>
                    <div class="media-content">
                    <p class="subtitle">3rd Place</p>
                    <p class="title is-size-4">{{posts.third.Driver.givenName}} {{posts.third.Driver.familyName}}</p>
                    <p class="is-7">Time: {{posts.third.Time.time}}<br/> Fastest Lap: {{posts.third.FastestLap.Time.time}}</p>

                    </div>
                  </article>
                  </article>
                </div>
              </div>
              <p class="heading">
                Results
              </p>
              <div class="tile is-ancestor flow">
                <div class="tile is-parent">
                  <div class="container">


                  <div class="tile is-child box">
                  <div class="tile is-child scroll">

                    <div class="content">
                      <table class="table is-striped is-bordered ">
                        <thead>
                          <tr>
                            <th>Pos</th>
                            <th>Number</th>
                            <th>Driver</th>
                            <th>Car</th>
                            <th>Laps</th>
                            <th>Time/Retired</th>
                            <th>Pts</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-for="driver in posts.drivers">
                            <td >{{driver.position}}</td>
                            <td>{{driver.number}}</td>
                            <td>{{driver.Driver.givenName}} {{driver.Driver.familyName}}</td>
                            <td>{{driver.Constructor.name}}</td>
                            <td>{{driver.laps}}</td>
                            <td v-if="driver.status == 'Finished'">{{driver.Time.time}}</td>
                            <td v-else>{{driver.status}}</td>
                            <td >{{driver.points}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <p class="heading">
                Qualifying
              </p>
              <div class="tile is-ancestor scrollbox">
                <div class="tile is-parent">
                  <div class="tile is-child box">
                  <div class="tile is-child scroll">

                    <div class="content">
                      <table class="table is-striped is-bordered scrollbox">
                        <thead>
                          <tr>
                            <th>Pos</th>
                            <th>Number</th>
                            <th>Driver</th>
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="driver in posts.qualResults">
                            <td >{{driver.position}}</td>
                            <td>{{driver.number}}</td>
                            <td>{{driver.Driver.givenName}} {{driver.Driver.familyName}}</td>
                            <td>{{driver.Q1}}</td>
                            <td>{{driver.Q2}}</td>
                            <td>{{driver.Q3}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    </div>


</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: {}
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      console.log(response.data)
      this.posts = response.data
    }
  }
}
</script>

<style scoped>
body {
  margin: 0px;
}


p {
  display: flex;
  justify-content: flex-start;
}

.flow {
  max-height: 45%;
  overflow-y: hidden;
}

.scroll {
  max-height: 30em;
  overflow: scroll;
}
</style>
