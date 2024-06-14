<template>
    <div>
      <v-toolbar color="#1F1F1F">
        <v-toolbar-title>Danh sách yêu thích</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-row class="center-row">
          <v-col v-for="(product, index) in favoriteItems" :key="index" cols="3">
            <v-card>
              <v-card-title style="font-size: 20px; font-weight: bold;" class="text-center">{{ product.name }}</v-card-title>
              <v-card-subtitle style="color: red; font-weight: bold;" class="text-center">{{ formatMoney(product.money) }}</v-card-subtitle>
              <v-card-text class="image-container">
                <img :src="product.image" alt="Product image" class="centered-image">
              </v-card-text>
              <!-- Nút xóa sản phẩm -->
              <v-card-actions>
                <v-btn class="delete-button" color="white" @click="removeFromFavorites(product)">Xóa</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Danh sách sản phẩm yêu thích
        favoriteItems: [],
      };
    },
    mounted() {
      // Lấy danh sách sản phẩm yêu thích từ localStorage khi component được tạo
      this.fetchFavoriteItems();
    },
    methods: {
      // Phương thức để lấy danh sách sản phẩm yêu thích từ localStorage
      fetchFavoriteItems() {
        // Lấy danh sách sản phẩm từ localStorage
        const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
        // Gán danh sách sản phẩm vào biến favoriteItems trong data
        this.favoriteItems = favoriteItems;
      },
      // Phương thức để xóa sản phẩm khỏi danh sách yêu thích
      removeFromFavorites(product) {
        // Lọc ra danh sách sản phẩm mới bằng cách loại bỏ sản phẩm được chọn
        this.favoriteItems = this.favoriteItems.filter(item => item.id !== product.id);
        // Lưu danh sách sản phẩm mới vào localStorage
        localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems));
      },
      // Phương thức để định dạng số tiền thành tiền tệ và thêm đơn vị đồng
      formatMoney(amount) {
      const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 3
      }).format(amount);
      return formattedAmount;
      }
    },
  };
  </script>
  
  <style scoped>
  /* ảnh  */
  .image-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Đảm bảo chiều cao cố định */
  }
  .centered-image {
    max-width: 120%;
    max-height: 120%;
  }
  /* nút xóa sp */
  .delete-button {
    color: white;
    background-color: #ff5252; /* Màu đỏ */
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
    width: 80px; /* Độ rộng của nút */
    height: 40px; /* Độ cao của nút */
    margin: auto; /* Căn giữa tuyệt đối */
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .delete-button:hover {
    background-color: #ff0000; /* Màu đỏ tương tác khi di chuột qua */
  }
  </style>
  