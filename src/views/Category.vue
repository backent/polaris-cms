<script setup lang="ts">
import Form from '@/components/category/Form.vue'
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <div class="d-flex justify-space-between">
              Categories
              <Form />
            </div>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>
                    No.
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>name 1</td>
                  <td>Delete</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
      
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>