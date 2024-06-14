<template>
  <!-- Container chứa nội dung trang -->
  <v-container class="fill-height">
    <!-- Thẻ responsive để điều chỉnh kích thước dựa trên kích thước màn hình -->
    <v-responsive class="align-center text-center fill-height">
      <!-- Logo của ứng dụng -->
      <v-img height="300" src="@/assets/logo.svg" />

      <!-- Tiêu đề chào mừng -->
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <!-- Tiêu đề chính -->
      <h1 class="text-h2 font-weight-bold">Vuetify</h1>

      <!-- Khoảng cách phía dưới tiêu đề -->
      <div class="py-14" />

      <!-- Dòng chứa các nút điều hướng -->
      <v-row class="d-flex align-center justify-center">
        <!-- Nút Components -->
        <v-col cols="auto">
          <v-btn
            href="https://vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Components
          </v-btn>
        </v-col>

        <!-- Nút Get Started -->
        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Get Started
          </v-btn>
        </v-col>

        <!-- Nút Community -->
        <v-col cols="auto">
          <v-btn
            href="https://community.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-account-group"
              size="large"
              start
            />

            Community
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
  //
</script>
