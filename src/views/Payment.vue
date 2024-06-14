<template>
  <div>
    <v-toolbar color="#1F1F1F">
      <v-toolbar-title>Thanh toán</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col v-for="(product, index) in cartItems" :key="index" cols="4">
          <v-card>
            <v-card-title style="font-size: 20px; font-weight: bold;" class="text-center">{{ product.tensp }}</v-card-title>
            <v-card-subtitle style="color: red; font-weight: bold;" class="text-center">{{ formatMoney(product.giasp) }} x {{ product.quantity }}</v-card-subtitle>
            <v-card-text class="image-container">
              <img :src="product.hinhanh" alt="Product image" class="centered-image">
            </v-card-text>
            <div class="text-center">Tổng: {{ formatMoney(product.quantity * product.giasp) }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">Tổng tiền: {{ formatMoney(totalAmount) }}</div>

    <div class="text-center mt-5 d-flex flex-column align-items-center">
      <h3>Chọn phương thức thanh toán</h3>
      <v-btn color="primary" class="payment-btn" @click="showAddressForm"> <v-icon>mdi-cash</v-icon> Thanh toán khi nhận hàng</v-btn>
    </div>

        <!-- Modal cho nhập địa chỉ -->
    <v-dialog v-model="addressFormModal" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Nhập thông tin giao hàng</v-card-title>
        <v-card-text>
          <v-text-field v-model="fullName" label="Họ tên"></v-text-field>
          <v-text-field v-model="deliveryAddress" label="Địa chỉ nhận hàng"></v-text-field>
          <v-text-field v-model="phoneNumber" label="Số điện thoại"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirmDeliveryInfo">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal cho thông báo -->
    <v-dialog v-model="deliveryNotificationModal" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Thông báo</v-card-title>
        <v-card-text>
          Đơn hàng của bạn đang được giao cho đơn vị vận chuyển và sẽ được giao đến bạn trong vòng 15 đến 30 phút. Vui lòng chú ý cuộc gọi để không bỏ lỡ đơn hàng nhé!!!
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import supabase from '../supabase.js'; // Import module supabase để thao tác với cơ sở dữ liệu

export default {
  data() {
    return {
      cartItems: [], // Danh sách các sản phẩm trong giỏ hàng
      totalAmount: 0, // Tổng số tiền của các sản phẩm trong giỏ hàng
      addressFormModal: false, // Biến để điều khiển việc hiển thị modal nhập thông tin giao hàng
      deliveryNotificationModal: false, // Biến để điều khiển việc hiển thị modal thông báo giao hàng
      deliveryAddress: '', // Địa chỉ giao hàng
      fullName: '', // Họ và tên của người nhận hàng
      phoneNumber: '', // Số điện thoại của người nhận hàng
      errorMessage: '', // Thông báo lỗi
    };
  },
  mounted() {
    // Lấy dữ liệu về sản phẩm trong giỏ hàng từ query params và cập nhật vào cartItems khi component được tạo
    const paymentData = JSON.parse(this.$route.query.paymentData);
    this.cartItems = paymentData.cartItems;
    this.calculateTotalAmount(); // Tính toán tổng số tiền ban đầu từ danh sách sản phẩm trong giỏ hàng
  },
  methods: {
    // Định dạng số tiền theo định dạng tiền tệ Việt Nam
    formatMoney(amount) {
      const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0 // Số lượng số thập phân tối thiểu
      }).format(amount);
      return formattedAmount;
    },
    // Xác nhận thông tin giao hàng và lưu vào cơ sở dữ liệu
    async confirmDeliveryInfo() {
      try {
        const orderDate = new Date().toISOString(); // Ngày đặt hàng
        // Chuẩn bị dữ liệu đơn hàng để lưu vào cơ sở dữ liệu
        const orderItems = this.cartItems.map(product => ({
          tensp: product.tensp,
          giasp: product.giasp,
          soluong: product.quantity,
          ten: this.fullName,
          sdt: this.phoneNumber,
          ngaydathang: orderDate,
          pttt: 'Thanh toán khi nhận hàng',
          tongtien: this.totalAmount,
          diachi: this.deliveryAddress
        }));

        // Chèn dữ liệu đơn hàng vào bảng 'hoadon' của cơ sở dữ liệu
        const { error } = await supabase
          .from('hoadon')
          .insert(orderItems);

        // Xử lý lỗi nếu có
        if (error) {
          console.error('Lỗi khi chèn dữ liệu vào bảng hoadon:', error.message);
          this.errorMessage = 'Lỗi khi lưu chi tiết đơn hàng';
          return;
        }

        // Cập nhật lại totalAmount sau khi chèn dữ liệu thành công
        this.calculateTotalAmount();

        // Hiển thị modal thông báo giao hàng sau khi xác nhận thông tin giao hàng thành công
        this.addressFormModal = false;
        this.deliveryNotificationModal = true;
      } catch (error) {
        console.error('Lỗi:', error);
        this.errorMessage = 'Lỗi khi lưu chi tiết đơn hàng';
      }
    },
    // Tính toán tổng số tiền của các sản phẩm trong giỏ hàng
    async calculateTotalAmount() {
      try {
        let total = 0;
        this.cartItems.forEach(product => {
          total += product.giasp * product.quantity;
        });
        this.totalAmount = total;
      } catch (error) {
        console.error('Lỗi khi tính toán tổng tiền:', error);
      }
    },
    // Hiển thị modal nhập thông tin giao hàng
    showAddressForm() {
      this.addressFormModal = true;
    },
  }
};
</script>



<style>
.centered-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  max-height: 100%;
}

.image-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-btn {
  width: 300px;
  margin: 15px auto;
}
</style>
