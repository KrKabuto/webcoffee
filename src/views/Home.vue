<template>
  <!-- Giao diện chính của ứng dụng -->
  <v-app :style="{ background: '#B7AC9A' }">
    <v-main>
      <!-- Phần nội dung chính -->
      <v-container fluid>
        <v-row>
          <!-- Sidebar -->
          <v-col cols="12" sm="2">
            <v-row>
              <!-- Phần sidebar chứa danh sách sản phẩm phổ biến -->
              <v-col cols="12" sm="12">
                <v-card class="co">
                  <v-list lines="two" class="cat pro">
                    <!-- Tiêu đề danh sách sản phẩm phổ biến -->
                    <v-list-subheader inset class="ml-n10 text-black" style="font-weight: bold;">Phổ biến</v-list-subheader>

                    <!-- Danh sách sản phẩm phổ biến -->
                    <v-list-item v-for="product in products" :key="product.title" :title="product.title" color="red">
                      <!-- Ảnh sản phẩm -->
                      <template v-slot:prepend>
                        <v-avatar variant="outlined" rounded="0" color="#FFA07A">
                          <v-img color="black" :src="product.image"></v-img>
                        </v-avatar>
                      </template>
                      <!-- Tiêu đề và giá sản phẩm -->
                      <v-list-item-subtitle v-text="product.subtitle" class="text-caption text-red"></v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>

              <!-- Phần sidebar chứa các loại sản phẩm khác -->
              <v-col cols="12" sm="12">
                <v-card class="co pa-2">
                  <!-- Tiêu đề danh sách sản phẩm -->
                  <h5 class="ml-4 text-black">Phổ biến</h5> 
                  <!-- Các loại sản phẩm -->
                  <v-chip class="ma-2" label color="black"> Nước ép </v-chip>
                  <v-chip class="ma-2" label color="black"> Kem tươi </v-chip>
                  <v-chip class="ma-2" label color="black"> Cà phê </v-chip>
                  <v-chip class="ma-2" label color="black"> Trà sữa </v-chip>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- Phần hiển thị ảnh slide -->
          <v-col cols="12" sm="8">
            <v-row>
              <v-col cols="12" sm="12">
                <!-- Carousel hiển thị ảnh -->
                <v-carousel :show-arrows="false">
                  <v-carousel-item v-for="(item, i) in pictures" :key="i" :src="item.src" cover></v-carousel-item>
                </v-carousel>
              </v-col>

              <!-- Phần kho voucher -->
              <v-col cols="12" sm="12">
                <v-toolbar color="#F7F2E5">
                  <v-toolbar-title style="font-weight: bold;">Kho voucher</v-toolbar-title>
                  <v-spacer></v-spacer>                  
                  <!-- Nút xem ưu đãi -->
                  <v-btn color="black" class="btn" @click="goToVocherPage"> Xem ưu đãi </v-btn>
                </v-toolbar>
              </v-col>

              <!-- Phần hiển thị sản phẩm bán chạy nhất -->
              <v-col cols="12" sm="12">
                <v-card class="tb" flat>
                  <v-tabs v-model="tab" color="black" align-tabs="end" >
                    <v-tab :value="1">Bán chạy nhất</v-tab>
                  </v-tabs>
                  <v-window v-model="tab" class="co">
                    <v-window-item v-for="n in 3" :key="n" :value="n">
                      <!-- Danh sách sản phẩm -->
                      <v-container fluid>
                        <v-row>
                          <v-col v-for="(dishe, i) in dishes" :key="i" cols="12" md="3">
                            <!-- Hover để hiển thị thêm thông tin và nút mua -->
                            <v-hover v-slot="{ isHovering, props }" open-delay="200">
                              <v-card class="" color="#F7F2E5" v-bind="props">
                                <!-- Ảnh sản phẩm -->
                                <v-img height="90" :src="dishe.hinhanh" class="mt-6"></v-img>
                                <!-- Tên và giá sản phẩm -->
                                <v-card-item class="text-center mt-14">
                                  <v-card-subtitle>
                                    <span class="">{{ dishe.tensp }}</span>
                                  </v-card-subtitle>
                                  <v-card-title class="text-caption text-red">{{ formatMoney(dishe.giasp) }}</v-card-title>
                                </v-card-item>
                                <!-- Hiển thị nút mua khi hover -->
                                <v-expand-transition>
                                  <div v-if="isHovering" class="d-flex transition-fast-in-fast-out bg-grey-darken-4 v-card--reveal text-h3" style="height: 100%">
                                    <v-btn density="compact" icon="mdi-shopping" @click="addToCart(dishe)"></v-btn>
                                  </div>
                                </v-expand-transition>
                              </v-card>
                            </v-hover>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-window-item>
                  </v-window>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- Phần sidebar khác -->
          <v-col cols="12" sm="2">
            <v-row>
              <!-- Thông tin ưu đãi phục vụ 24/7 -->
              <v-col cols="12" sm="12">
                <v-card class="co">
                  <v-list lines="two" class="cat pro">
                    <!-- Danh sách ưu đãi -->
                    <v-list-item v-for="offer in offers" :key="offer.title" :title="offer.title" color="red">
                      <!-- Icon ưu đãi -->
                      <template v-slot:prepend>
                        <v-icon :icon="offer.icon" large color="red"></v-icon>
                      </template>
                      <!-- Tiêu đề và nội dung ưu đãi -->
                      <v-list-item-subtitle v-text="offer.subtitle" class="text-caption" style="font-weight: bold;"></v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <!-- Phần đánh giá của khách hàng -->
              <v-col cols="12" sm="12">
                <v-card class="co pa-2">
                  <!-- Tiêu đề đánh giá -->
                  <div>
                    <span class="ml-4 text-black" style="font-weight: bold; margin-bottom: 5px">Đánh giá</span>
                    <v-icon></v-icon>
                  </div>
                  <!-- Ảnh và thông tin của khách hàng -->
                  <div class="text-center">
                    <v-avatar variant="outlined" color="white" class="mt-2">
                      <v-img src="/20.jpg" alt="John"></v-img>
                    </v-avatar>
                    <h5 class="text-black mt-3">Sơn Tùng MTP</h5>
                    <p class="text-black mt-2 text-caption">
                      "Tôi cảm thấy cửa hàng này là một trong những cửa hàng bán đồ uống ngon nhất mà tôi từng uống"
                    </p>
                    <!-- Đánh giá dưới dạng sao -->
                    <div class="mt-3">
                      <v-icon class="mr-1" color="orange darken-3">mdi mdi-star</v-icon>
                      <v-icon class="mr-1" color="orange darken-3">mdi mdi-star</v-icon>
                      <v-icon class="mr-1" color="orange darken-3">mdi mdi-star</v-icon>
                      <v-icon class="mr-1" color="orange darken-3">mdi mdi-star</v-icon>
                      <v-icon class="mr-1" color="orange darken-3">mdi mdi-star</v-icon>
                    </div>
                  </div>
                </v-card>
              </v-col>

              <!-- Phần hiển thị mục mới nhất -->
              <v-col cols="12" sm="12">
                <v-card class="co pa-2">
                  <!-- Tiêu đề mục mới nhất -->
                  <div class="float-sm-left mb-4">
                    <span class="ml-4 text-black" style="font-weight: bold;">Mới nhất</span>
                  </div>
                  <!-- Hiển thị ảnh và thông tin của mục mới nhất -->
                  <div class="text-center">
                    <v-img src="/public/kemsocola.png" alt="pi" width="200" style="margin-left: 25px" @click = goToIcreamPage></v-img>
                    <h5 class="text-center text-balck mt-3">Kem Chocolate</h5>
                    <p class="text-center text-red mt-2 text-caption">20-04-2024</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import supabase from '../supabase';
export default {
  data: () => ({
    panel: [0],
    disabled: false,
    tab: null,
    model: null,
    items: [
      { text: "COFFEE" },
      { text: "KEM TƯƠI" },
      { text: "NƯỚC ÉP" },
      { text: "TRÀ SỮA" },
    ],
    products: [
      // Dữ liệu các sản phẩm
      {
        title: "Cappuccino",
        subtitle: "30.000đ",
        image: "3.png",
      },
      {
        title: "Kem dừa",
        subtitle: "25.000đ",
        image: "11.png",
      },
      {
        title: "Sinh tố Dâu",
        subtitle: "20.000đ",
        image: "20.png",
      },
      {
        title: "Sinh tố lúa mạch",
        subtitle: "15.000đ",
        image: "21.png",
      },
      {
        title: "Trà sữa thái xanh",
        subtitle: "28.000đ",
        image: "7.png",
      },
    ],
    offers: [
      // Dữ liệu các ưu đãi
      {
        title: "Khách hàng VIP",
        subtitle: "Giảm 30% ",
        icon: "mdi mdi-diamond-stone",
      },
      {
        title: "Ưu đãi",
        subtitle: "Mua 1 tặng 1",
        icon: "mdi mdi-gift",
      },
      {
        title: "Phục vụ 24/7",
        subtitle: "6:00 đến 22:00",
        icon: "mdi-clock",
      },
      {
        title: "Nhiều ưu đãi khác",
        subtitle: "Mua ngay",
        icon: "mdi mdi-ticket",
      },
      {
        title: "Miễn phí ship",
        subtitle: "Đối với đơn từ 150.000đ trở lên",
        icon: "mdi-truck-delivery",
      },
    ],
    pictures: [
      // Dữ liệu ảnh cho carousel
      {
        src: "p2.jpg",
      },
      {
        src: "p4.jpg",
      },
      {
        src: "p3.jpg",
      },
      {
        src: "p1.jpg",
      },
    ],

    dishes: [
      // Dữ liệu các sản phẩm bán chạy nhất
      { id : 7, hinhanh: "f1.png", tensp: "Kem ốc quế", giasp: "20.000đ" },
      { id: 4, hinhanh: "cfchon.png", tensp: "Cà phê chồn", giasp: "200.000đ" },
      { id: 1, hinhanh: "capuchino.png", tensp: "Cappuccino", giasp: "40.000đ" },
      { id : 14, hinhanh: "kembingsu.png", tensp: "Kem Bing su Hàn Quốc", giasp: "30.000đ" },
      { id : 30, hinhanh: "STot.png", tensp: "Sinh tố ớt", giasp: "49.000đ" },
      { id: 3, hinhanh: "cfmuoi.png", tensp: "Cà phê muối", giasp: "20.000đ" },
      { id : 35, hinhanh: "7.png", tensp: "Trà sữa thái xanh", giasp: "28.000đ" },
      { id : 44, hinhanh: "tramangcut.png", tensp: "Trà măng cụt", giasp: "25.000đ" },
    ],
  }),
  methods:{
    goToVocherPage() {
      // Chuyển hướng đến trang voucher
      this.$router.push('/vocher');
    },
    goToIcreamPage(){
      // Chuyển hướng đến trang kem
      this.$router.push('/icream');
    },


    addToCart(product) {
      // Thêm sản phẩm vào giỏ hàng
      console.log("Sản phẩm đã chọn:", product);

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      let existingProduct = cartItems.find(item => item.id === product.id);

      if (!existingProduct) {
        product.quantity = 1;
        product.giasp = parseFloat(product.giasp.replace('đ', '').replace('.', '').trim());
        cartItems.push(product);
      } else {
        existingProduct.quantity++;
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },

    formatMoney(amount) {
      // Định dạng tiền tệ
      if (typeof amount !== 'string') {
        amount = amount.toString();
      }
      if (amount.includes('đ')) {
        amount = amount.replace('đ', ''); // Loại bỏ ký tự 'đ' trước khi định dạng giá tiền
      }
      const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 3
      }).format(amount);
      return formattedAmount;
    },

  }
};

</script>
<style scoped>
.co {
  /* màu nền chính */
  background-color: #F7F2E5; 
}
.tb {
  /* thanh bán chạy nhất  */
  background-color: #FAD06C; 
}

.cat {
  /* phổ biến và khách hàng */
  background-color: #F7F2E5;
  /* màu chữ */
  color: black;
}
/* .tag:hover {
  color: orange;
} */
.btn {
  /* btn xem ưu đãi */
  background-color: #B7AC9A;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  transform: scale(1.2);  
}
</style>
