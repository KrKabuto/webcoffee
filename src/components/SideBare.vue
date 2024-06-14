<template>
  <!-- Màu thanh trên cùng -->
  <v-system-bar color="#DCDCDC">
    <!-- Logo -->
    <img src="/public/logo 4 con ga tach nen.png" class="center-image">
    <v-spacer></v-spacer>
    <!-- Các liên kết mạng xã hội -->
    <a href="https://www.facebook.com/" class="social-link">
      <v-icon icon="mdi mdi-facebook" class="ms-2"></v-icon>
    </a>
    <a href="https://www.pinterest.com/" class="social-link">
      <v-icon icon="mdi mdi-pinterest" class="ms-2"></v-icon>
    </a>
    <a href="https://twitter.com/x" class="social-link">
      <v-icon icon="mdi mdi-twitter" class="ms-2"></v-icon>
    </a>
    <a href="https://www.instagram.com/" class="social-link">
      <v-icon icon="mdi mdi-instagram" class="ms-2"></v-icon>
    </a>
    <a href="https://www.youtube.com/" class="social-link">
      <v-icon icon="mdi mdi-youtube" class="ms-2"></v-icon>
    </a>
  </v-system-bar>

  <!-- Màu nền menu -->
  <v-app-bar height="100" flat color="#F7F2E5">
    <v-app-bar-title>
      <h2>Menu</h2>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <!-- Ô tìm kiếm -->
    <v-card
      color="#f2f2f2"
      flat
      outlined
      height="45"
      width="510"
      class="mt-4 pt-1" 
      style="box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);"
    >
    <!-- Ô tìm kiếm -->
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field
            class="search-input"
            v-model="searchKeyword"
            placeholder="Tìm kiếm ở đây ..."
            outlined
            dense
            @input="searchProducts"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <!-- Màu icon tìm kiếm -->
          <v-icon
            color="red" 
            icon="mdi mdi-magnify"
            size="large"
            class="mt-2 ml-4"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card>

    <v-spacer></v-spacer>
    <!-- Đăng nhập/Đăng ký hoặc Thông tin tài khoản -->
    <div v-if="!isLoggedIn">
       <!-- Nút đăng nhập -->
      <span class="ml-4 text-caption">Đăng nhập/Đăng kí</span><br />
      <v-btn append-icon="mdi-account" class="account" variant="text" 
        :color="activeButton === 'login' ? '#F97350' : ''" @click="goToLoginPage">
        ĐĂNG NHẬP
        <template v-slot:append>
          <v-icon></v-icon>
        </template>
      </v-btn>
    </div>
    <div v-else>
      <!-- Thông tin người dùng đã đăng nhập -->
      <v-avatar class="ml-4" size="40">
        <v-img :src="'/public/user.png'"></v-img>
      </v-avatar>
      <span class="ml-4">{{ userName }}</span><br />
      <v-btn append-icon="mdi-logout" class="account" variant="text" 
        :color="activeButton === 'logout' ? '#F97350' : ''" @click="logout">
        Đăng xuất
        <template v-slot:append>
          <v-icon></v-icon>
        </template>
      </v-btn>
    </div>
    <v-divider vertical inset class="mr-6"></v-divider>
    <!-- Giỏ hàng -->
    <v-btn 
      class="mr-6"
      variant="text" 
      :color="activeButton === 'basket' ? '#F97350' : ''" 
      @click="goToBasketPage"
    >
    <v-icon size="33">mdi mdi-cart-outline</v-icon>
    </v-btn>
  </v-app-bar>
  <!-- Thanh menu -->
  <v-app-bar height="48" flat color="#FAD06C">
    <!-- Các nút điều hướng đến trang con -->
    <v-btn 
      style="font-weight: bold;"
      variant="text" 
      :color="activeButton === 'home' ? '#F97350' : ''" 
      @click="goToHomePage"
    > Trang chủ </v-btn>
    <v-btn 
      style="font-weight: bold;"
      variant="text" 
      :color="activeButton === 'coffee' ? '#F97350' : ''" 
      class="account" 
      @click="goToCoffeePage"
    > Coffee </v-btn>
    <v-btn 
      style="font-weight: bold;"
      variant="text" 
      :color="activeButton === 'icream' ? '#F97350' : ''" 
      class="account" 
      @click="goToIcreamPage"
    > Kem tươi </v-btn>
    <v-btn 
      style="font-weight: bold;"
      variant="text" 
      :color="activeButton === 'juice' ? '#F97350' : ''" 
      class="account" 
      @click="goToJuicePage"
    > Nước ép </v-btn>
    <v-btn 
     style="font-weight: bold;"
      variant="text" 
      :color="activeButton === 'milk' ? '#F97350' : ''" 
      class="account" 
      @click="goToMilkPage"
    > Trà sữa </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>

 <!-- Danh sách sản phẩm gợi ý -->
<v-card :class="search-product-card" v-if="searchKeyword">
  <v-list class="search-product-list" v-if="filteredDishes.length > 0">
    <!-- Hiển thị danh sách sản phẩm -->
    <v-list-item v-for="dish in filteredDishes" :key="dish.id" @click="goToProductPage(dish)">
      <v-list-item-avatar>
        <v-img :src="'/public/' + dish.image" aspect-ratio="1"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ dish.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ dish.money }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <!-- Hiển thị thông báo khi không tìm thấy sản phẩm -->
  <v-list v-else class="search-product-list">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="no-results">Không tìm thấy sản phẩm</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-card>

</template>

<script>
import supabase from '../supabase';

export default {
  data() {
    return {
      // Các biến dữ liệu
      activeButton: null,
      searchKeyword: '',
      itemCount: 0,
      dishes: [],
      filteredDishes: [],
      showFooterAndSidebar: true,
      userName: '',
      userAvatar: '',
      isLoggedIn: false
    };
  },
  // Hàm được gọi khi component được tạo
  async created() {
    // Lấy danh sách sản phẩm từ database
    const { data, error } = await supabase
      .from('search')
      .select('*')
    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      this.dishes = data;
      console.log(this.dishes); // Kiểm tra dữ liệu nhận được
    }

    // Kiểm tra trạng thái đăng nhập khi component được tạo
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userName = user.name;
      this.isLoggedIn = true;
    }
  },
  methods: {
    // Điều hướng đến trang chính
    goToHomePage() {
      // Xác định nút "Trang chủ" là nút hoạt động hiện tại
      this.activeButton = 'home';
      // Điều hướng đến trang chính
      this.$router.push({ name: 'Home' }); 
    },
    // Điều hướng đến trang Coffee
    goToCoffeePage() {
      this.activeButton = 'coffee';
      this.$router.push('/coffee');
    },
    // Điều hướng đến trang Ice Cream
    goToIcreamPage() {
      this.activeButton = 'icream';
      this.$router.push('/icream');
    },
    // Điều hướng đến trang Juice
    goToJuicePage() {
      this.activeButton = 'juice';
      this.$router.push('/juice');
    },
    // Điều hướng đến trang Milk
    goToMilkPage() {
      this.activeButton = 'milk';
      this.$router.push('/milk');
    },
    // Điều hướng đến trang Giỏ hàng
    goToBasketPage() {
      this.activeButton = 'basket';
      this.$router.push('/basket');
    },
    // Điều hướng đến trang đăng nhập
    goToLoginPage() {
      this.activeButton = 'login';
      this.$router.push('/login');
    },
    // Tìm kiếm sản phẩm
    searchProducts() {
      // Kiểm tra xem từ khóa tìm kiếm có trống không
      if (this.searchKeyword.trim() === '') {
        // Nếu trống, không hiển thị kết quả
        this.filteredDishes = [];
      } else {
        // Nếu không trống, lọc danh sách sản phẩm theo từ khóa tìm kiếm
        this.filteredDishes = this.dishes.filter(dish => 
          dish.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      }
    },
    // di chuyển đến mục
    goToProductPage(dish) {
      switch (dish.category) {
        case 'coffee':
          this.$router.push({ name: 'Coffee', params: { id: dish.id } });
          break;
        case 'icream':
          this.$router.push({ name: 'Icream', params: { id: dish.id } });
          break;
        case 'juice':
          this.$router.push({ name: 'Juice', params: { id: dish.id } });
          break;
        case 'milk':
          this.$router.push({ name: 'Milk', params: { id: dish.id } });
          break;
        default:
          // Xử lý trường hợp loại sản phẩm không được xác định
          break;
      }
    },
    // Đăng xuất tài khoản
    logout() {
      // Xóa thông tin người dùng khỏi local storage
      localStorage.removeItem('user');
      // Cập nhật thông tin đăng nhập và tên người dùng
      this.userName = '';
      this.isLoggedIn = false;
      // Điều hướng về trang đăng nhập sau khi đăng xuất
      this.$router.push('/login');
    },
    // Điều hướng đến trang sản phẩm
    
  },
};
</script>

<style scoped>

.account {
  font-weight: bold;
}
/* thuộc tính hover cho trang */
.account:hover {
  color: #F97350;
}
/* thanh tìm kiếm */
.search-product-card {
  max-width: 90%; 
  margin: auto; 
  overflow-x: auto; 
}
.search-product-list {
  display: flex;
  flex-wrap: nowrap; 
  padding: 10px 0;
}
.v-list-item {
  min-width: 120px;
  margin-right: 10px;
}

.v-list-item-avatar {
  width: 80px;
  height: 80px;
}

.v-list-item-content {
  flex: 1; 
}

.v-list-item-title {
  font-size: 14px;
}

.v-list-item-subtitle {
  font-size: 12px; 
}
/* chữ không tìm thấy sp */
.no-results {
  margin: 0 auto; /* 0 ở đây có nghĩa là không có margin phía trên và phía dưới */
  text-align: center;
  color: red;
}
/* hình logo  */
.center-image {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 50px; 
  height: 50px; 
}
/* link icon */
.social-link:hover v-icon {
  color: #F97350;
}
</style>