<template>
  <!-- Hiển thị danh sách sản phẩm -->
  <v-container fluid>
    <v-row>
      <!-- Lặp qua mỗi sản phẩm và hiển thị chi tiết sản phẩm -->
      <v-col v-for="(dishe, i) in dishes" :key="i" cols="12" md="3">
        <v-card class="product-card" color="#F7F2E5">
          <!-- Hiển thị hình ảnh sản phẩm -->
          <v-img :src="dishe.hinhanh" height="90" class="mt-6"></v-img>
          <v-card-item class="text-center">
            <!-- Hiển thị tên sản phẩm -->
            <v-card-subtitle>
              <span>{{ dishe.tensp }}</span>
            </v-card-subtitle>
            <!-- Hiển thị giá sản phẩm với định dạng tiền tệ -->
            <v-card-title class="text-caption" style="color: red;">
              {{ formatMoney(dishe.giasp) }}
            </v-card-title>
            <!-- Nút thêm sản phẩm vào giỏ hàng -->
            <v-row style="align-items: center;">
              <v-col cols="13">
                <v-btn icon @click="handleAddToCart(dishe)">
                  <v-icon color="#F97350">mdi-cart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import supabase from '../supabase'; // Import module supabase để tương tác với cơ sở dữ liệu
import anime from 'animejs/lib/anime.es.js'; // Import module animejs để thực hiện hiệu ứng

export default {
  data() {
    return {
      dishes: [],
    };
  },
  async created() {
    // Kiểm tra trạng thái đăng nhập
    this.checkLoginStatus();
    
    // Khi component được tạo, thực hiện lấy dữ liệu sản phẩm từ cơ sở dữ liệu Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'coffee'); // Lọc sản phẩm theo danh mục 'coffee'
    if (error) {
      console.error('Error fetching products:', error.message); // Hiển thị thông báo lỗi nếu có lỗi khi lấy dữ liệu
    } else {
      this.dishes = data; // Gán dữ liệu sản phẩm lấy được vào biến dishes
      console.log(this.dishes); // Kiểm tra dữ liệu sản phẩm nhận được từ cơ sở dữ liệu
    }
  },
  methods: {
    checkLoginStatus() {
      // Phương thức kiểm tra trạng thái đăng nhập
      const userToken = localStorage.getItem('userToken');
      this.isLoggedIn = !!userToken;
      
      // Nếu đã đăng nhập và có sản phẩm chờ thêm vào giỏ hàng, thực hiện thêm vào giỏ hàng ngay lập tức
      if (this.isLoggedIn && this.pendingProductToAdd) {
        this.addToCart(this.pendingProductToAdd);
        this.pendingProductToAdd = null; // Đặt lại sản phẩm chờ thêm vào giỏ hàng sau khi đã thêm thành công
      }
    },
    handleAddToCart(product) {
      if (!this.isLoggedIn) {
        this.pendingProductToAdd = product; // Lưu sản phẩm vào biến chờ thêm vào giỏ hàng
        this.showLoginModal = true; // Hiển thị modal yêu cầu đăng nhập
      } else {
        this.addToCart(product); // Thêm sản phẩm vào giỏ hàng nếu đã đăng nhập
      }
    },
    addToCart(product) {
      // Phương thức để thêm sản phẩm vào giỏ hàng và thực hiện hiệu ứng
      console.log("Sản phẩm đã chọn:", product);

      // Tạo một hình ảnh mờ của sản phẩm khi thêm vào giỏ hàng
      const productImage = document.createElement('img');
      productImage.src = product.hinhanh;
      productImage.style.width = '50px'; // Thiết lập kích thước hình ảnh
      productImage.style.position = 'absolute'; // Thiết lập vị trí hình ảnh
      productImage.style.zIndex = '1000';

      // Lấy vị trí của hình ảnh sản phẩm trên giao diện
      const rect = event.target.getBoundingClientRect();
      productImage.style.left = `${rect.left}px`;
      productImage.style.top = `${rect.top}px`;

      // Thêm hình ảnh mờ vào thân trang
      document.body.appendChild(productImage);

      // Thực hiện hiệu ứng di chuyển hình ảnh mờ đến biểu tượng giỏ hàng
      anime({
        targets: productImage, // Chọn phần tử hình ảnh sản phẩm để thực hiện hoạt hình
        translateX: window.innerWidth - rect.left - 70, // Di chuyển hình ảnh sang phải
        translateY: -rect.top + 10, // Di chuyển hình ảnh lên trên
        scale: 0.1, // Thu nhỏ hình ảnh xuống 10% kích thước ban đầu
        opacity: 0.7, // Đặt độ mờ của hình ảnh là 70%
        duration: 1000, // Thời gian thực hiện hoạt hình (1000 mili giây)
        easing: 'easeInOutQuad', // Hàm easing để chuyển động mượt mà
        complete: () => { // Hàm callback thực hiện sau khi hoạt hình hoàn thành
            document.body.removeChild(productImage); // Xóa hình ảnh sản phẩm khỏi DOM
            console.log('Sản phẩm đã được thêm vào giỏ hàng:', product); // In ra thông báo sản phẩm đã được thêm vào giỏ hàng

            // Lấy thông tin giỏ hàng hiện tại từ localStorage
            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1; // Tăng số lượng sản phẩm nếu đã tồn tại trong giỏ hàng
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng với số lượng 1
                cart.push({ ...product, quantity: 1 });
            }

            // Lưu giỏ hàng đã cập nhật vào localStorage
            localStorage.setItem('cartItems', JSON.stringify(cart));

            // In thông tin giỏ hàng hiện tại sau khi thêm sản phẩm vào
            console.log('Giỏ hàng hiện tại:', cart);
        },
      });
    },
    formatMoney(value) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      return formatter.format(value);
    }
  }
};
</script>

<style scoped>
/* CSS cho sản phẩm */
.product-card {
  background-color: #F7F2E5;
}
</style>

<style scoped>
.product-card {
  background-color: #F7F2E5; /* Light beige card background */
}
.text-caption {
  font-size: 14px;
}
.v-card-subtitle span,
.v-card-title {
  font-weight: bold;
  color: black; /* màu sản phẩm */
}
</style>
