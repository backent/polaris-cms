<script setup lang="ts">
import router from '@/router';


function login() {
  router.push({ name: 'home' })
}

</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col md="5">
        <v-card class="cs-card">
          <v-card-title>
            <div class="title">Login</div>
            <div class="subtitle">Welcome to web admin, please put your login crendential. If you don't know, please contact the technical support.</div>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Username"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Password"
                    type="password"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="card-action">
            <v-btn style="width: 100%;" @click="login">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.cs-card {
  color: gray;

  .title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .subtitle {
    font-size: 14px;
    white-space: initial;
    line-height: 16px;
    letter-spacing: .02em;
  }
}
</style>