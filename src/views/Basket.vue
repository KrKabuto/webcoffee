<template>
  <div>
    <v-toolbar color="#1F1F1F">
      <v-toolbar-title>Giỏ hàng</v-toolbar-title>
      <v-spacer></v-spacer>                  
    </v-toolbar>
    <v-container>
      <!-- Hiển thị danh sách sản phẩm đã thêm vào giỏ hàng -->
      <v-row>
        <v-col v-for="(product, index) in cartItems" :key="index" cols="4">
          <v-card>
            <v-card-title style="font-size: 20px; font-weight: bold;" class="text-center">{{ product.tensp }}</v-card-title>
            <v-card-subtitle style="color: red; font-weight: bold;" class="text-center">{{ formatMoney(product.giasp) }} x {{ product.quantity }}</v-card-subtitle>
            <v-card-text class="image-container">
              <img :src="product.hinhanh" alt="Product image" class="centered-image">
            </v-card-text>
            <!-- Thêm phần chọn số lượng -->
            <v-row class="quantity-row mb-2 align-center">
              <v-col cols="3" class="quantity-col">
                <v-btn icon @click="decreaseQuantity(product)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <!-- cho phép nhập số lượng từ bàn phím -->
              <v-col cols="2" class="quantity-col ">
                <!-- Sử dụng input thay vì v-text-field để cho phép nhập từ bàn phím -->
                <input type="number" v-model="product.quantity" min="1" @change="updateQuantity(product)">
              </v-col>
              <v-col cols="3" class="quantity-col">
                <v-btn icon @click="increaseQuantity(product)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- Nút xóa sản phẩm -->
            <v-btn class="delete-button" @click="removeFromCart(product)">Xóa</v-btn>
            <!-- đếm số lượng -->
            <!-- <div class="totalQuantity">{{ totalQuantity }}</div> -->
            <!-- Hiển thị tổng tiền của sản phẩm -->
            <div class="text-center">Tổng: {{ formatMoney(calculateProductTotal(product)) }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Hiển thị tổng tiền của tất cả sản phẩm -->
    <div class="text-center">Tổng tiền: {{ formatMoney(calculateTotalAmount) }}</div>
    <!-- Nút thanh toán -->
    <v-btn class="payment-button" color="primary" @click="goToPaymentPage">Thanh toán</v-btn>
    <Footer/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Danh sách sản phẩm trong giỏ hàng
      cartItems: [],
    };
  },
  computed: {
    // Tính tổng tiền của một sản phẩm dựa trên số lượng đã chọn
    calculateProductTotal() {
      return (product) => {
        return product.quantity * parseFloat(product.giasp);
      };
    },
    // Tính tổng tiền của tất cả các sản phẩm trong giỏ hàng
    calculateTotalAmount() {
      return this.cartItems.reduce((total, product) => total + (product.quantity * parseFloat(product.giasp)), 0);
    },
  },
  mounted() {
    // Lấy danh sách sản phẩm từ local storage khi component được tạo
    this.fetchCartItems();
  },
  methods: {
    // Phương thức để lấy danh sách sản phẩm trong giỏ hàng từ local storage
    fetchCartItems() {
      // Lấy danh sách sản phẩm từ local storage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      // Gán danh sách sản phẩm vào biến cartItems trong data
      this.cartItems = cartItems;
    },
    // Phương thức để giảm số lượng sản phẩm
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
      }
    },
    // Phương thức để tăng số lượng sản phẩm
    increaseQuantity(product) {
      product.quantity++;
    },
    // Phương thức để xóa sản phẩm khỏi giỏ hàng
    removeFromCart(product) {
      // Lọc ra danh sách sản phẩm mới bằng cách loại bỏ sản phẩm được chọn
      this.cartItems = this.cartItems.filter(item => item !== product);
      // Lưu danh sách sản phẩm mới vào local storage hoặc gọi API để cập nhật
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    // Phương thức để xử lý khi người dùng nhấn thanh toán
    checkout() {
      // Chuyển người dùng đến trang thanh toán
      // Thực hiện các bước xử lý thanh toán tại đây
      console.log("Xử lý thanh toán...");
    },
    // Phương thức để định dạng số tiền thành tiền tệ và thêm đơn vị đồng
    // Trong phương thức formatMoney, thêm đơn vị tiền tệ vào cuối chuỗi
    formatMoney(amount) {
      const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0 // Số lượng số thập phân tối thiểu
      }).format(amount);
      return formattedAmount ;
    },
      goToPaymentPage() {
  // Tạo một đối tượng để lưu trữ thông tin sản phẩm và tổng số tiền
  const paymentData = {
    cartItems: this.cartItems.map(item => ({
      tensp: item.tensp,
      quantity: item.quantity,
      giasp: item.giasp,
      hinhanh: item.hinhanh // Thêm trường image vào đây
    })),
    totalAmount: this.calculateTotalAmount // Sử dụng computed property để tính tổng tiền
  };

  // Chuyển đối tượng paymentData thành một mảng JSON trước khi truyền
  const paymentDataJSON = JSON.stringify(paymentData);

  // Chuyển người dùng đến trang thanh toán và truyền dữ liệu qua query parameters
  this.$router.push({ name: 'payment', query: { paymentData: paymentDataJSON } });
},

  }
};
</script>

<style scoped>
/* nút thanh toán */
.payment-button {
display: flex;
justify-content: center; /* Căn giữa theo chiều ngang */
align-items: center; /* Căn giữa theo chiều dọc */
width: 200px; /* Độ rộng của nút */
height: 60px; /* Độ cao của nút */
font-size: 20px; /* Kích thước chữ của nút */
margin: 20px auto; /* Canh giữa và tạo khoảng cách trên và dưới */
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
  margin-top: -20px;
}

.delete-button:hover {
  background-color: #ff0000; /* Màu đỏ tương tác khi di chuột qua */
}
/* nút số lượng sp */
.quantity-row {
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  margin-bottom: 10px; /* Khoảng cách dưới cùng của hàng */
  margin-top: 10px;
}

.quantity-col {
  flex: 1; /* Chia đều không gian trong hàng */
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
}
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

/* Định dạng cho container chứa danh sách sản phẩm */
.cart-container {
  max-width: 800px; /* Độ rộng tối đa của container */
  margin: 0 auto; /* Canh giữa container */
  padding: 20px; /* Khoảng cách nội dung với viền */
}

/* Định dạng cho thẻ v-card */
.v-card {
  margin: 20px; /* Khoảng cách giữa các thẻ */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Đổ bóng */
}

/* Định dạng cho hình ảnh của sản phẩm */
.card-image {
  width: 100px; /* Kích thước hình ảnh */
  height: 100px;
}

/* Định dạng cho tiêu đề của thẻ v-card */
.v-card-title {
  font-size: 16px; /* Cỡ chữ */
  white-space: nowrap; /* Ngăn chặn ngắt dòng */
  overflow: hidden; /* Ẩn nội dung vượt quá kích thước */
  text-overflow: ellipsis; /* Hiển thị dấu ba chấm (...) khi nội dung bị ẩn */
}

/* Định dạng cho phụ đề của thẻ v-card */
.v-card-subtitle {
  font-size: 14px; /* Cỡ chữ */
  white-space: nowrap; /* Ngăn chặn ngắt dòng */
  overflow: hidden; /* Ẩn nội dung vượt quá kích thước */
  text-overflow: ellipsis; /* Hiển thị dấu ba chấm (...) khi nội dung bị ẩn */
}

/* Định dạng cho nút xóa sản phẩm */
.v-btn {
  text-transform: none; /* Không chuyển đổi văn bản thành chữ hoa */
  font-size: 14px; /* Cỡ chữ */
  padding: 1px 5px; /* Khoảng cách giữa nút và nội dung */
}

/* Định dạng cho nút xóa sản phẩm khi hover */
.v-btn:hover {
  background-color: #ff5252; /* Màu nền khi hover */
}

/* Định dạng cho phần đếm số lượng */
.totalQuantity {
  font-size: 14px; /* Cỡ chữ */
  font-weight: bold; /* In đậm */
}
input{
  margin-left: 30px;
  width: 45px;
}
</style>
