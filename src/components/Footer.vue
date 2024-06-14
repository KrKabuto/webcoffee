<template>
  <!-- đầu footer -->
  <v-footer color="#DCDCDC" class="d-flex flex-column">
    <!-- Phần header của footer -->
    <div class="px-4 py-2 bgTop  w-100">
      <v-toolbar color="transparent" height="40">
       <span class="mr-2" style="color: black; font-weight: bold;">Mua 1 tặng 1</span>
       <span class="m1" style="color: black; font-weight: bold;" >Tính tiền 2</span>
       <v-spacer></v-spacer>
       <!-- <v-icon>mdi mdi-cash-multiple</v-icon>
       <v-icon>mdi mdi-currency-usd</v-icon>
       <v-icon>mdi mdi-cash-100</v-icon> -->
      </v-toolbar>
    </div>
    <!-- Phần nội dung chính của footer -->
    <div class=" d-flex w-100 bgMidum px-4 pb-10">
<v-row>
  <!-- Cột chứa liên kết mạng xã hội -->
  <v-col col="12" sm="3">
    <h4 class="mt-2">Kết nối với chúng tôi</h4>
    <span class="text-caption"><a href="https://www.facebook.com/" class="social-link">Facebook</a></span><br>
    <span class="text-caption"><a href="https://www.pinterest.com/" class="social-link">Pinterest</a></span><br>
    <span class="text-caption"><a href="https://www.twitter.com/x" class="social-link">Twitter</a></span><br>
    <span class="text-caption"><a href="https://www.instagram.com/" class="social-link">Instagram</a></span><br>
    <span class="text-caption"><a href="https://www.youtube.com/" class="social-link">Youtube</a></span>
    
  </v-col>
  <!-- Cột chứa thông tin về cửa hàng -->
  <v-col col="12" sm="3">
    <h4 class="mt-2">Về cửa hàng</h4>
    <span class="text-caption">Hơn 30 chi nhánh khắp cả nước</span><br>
    <span class="text-caption">Nhượng quyền liên hệ : +84832183162 (Mr.Tỏn)</span><br>
    <span class="text-caption">Giảm giá vào những dịp đặc biệt</span><br>
    <span class="text-caption">Nhân viên tay nghề cao</span><br>
    <span class="text-caption">Hỗ trợ khách hàng 24/7</span><br>
    <span class="text-caption">Updating...</span>
  </v-col>
  <!-- Cột chứa thông tin về vị trí cửa hàng -->
  <v-col col="12" sm="3">
    <h4 class="mt-2">Thông tin cửa hàng</h4>
    <span class="text-caption">Địa chỉ : 33 Vĩnh viễn, P2, Quận 10, TP HCM (Trụ sở chính)</span><br>
    <span class="text-caption">Đạt chứng nhận An toàn vệ sinh thực phẩm 2024</span><br>
    <span class="text-caption">26003</span><br>
    <span class="text-caption">Liên hệ: 19001009</span><br>
    <span class="text-caption">Số khác : +84832183162 (Mr.Tỏn)</span><br>
    <span class="text-caption">Email: Coffee4conGa@gmail.com</span>
  </v-col>
  <!-- Cột chứa bản đồ vị trí cửa hàng -->
  <v-col col="12" sm="3">
    <h4 class="mt-2">Vị trí</h4>
    <!-- Liên kết đến bản đồ Google Maps -->
    <a href="https://www.google.com/maps/place/Cao+%C4%90%E1%BA%B3ng+Kinh+T%E1%BA%BF+TP.HCM/@10.7648701,106.6707559,17z/data=!3m1!4b1!4m6!3m5!1s0x31752ee10bef3c07:0xfd59127e8c2a3e0!8m2!3d10.7648701!4d106.6733308!16s%2Fg%2F1yl48vr9k?entry=ttu">
      <!-- Hiển thị hình ảnh bản đồ -->  
      <v-img src="/HCE.png" height="150" class="ml-n16"></v-img>
    </a>
  </v-col>

</v-row>
    </div>
    <!-- copyright -->
    <div class="px-4 py-2 bgTop text-center w-100">
      <!-- Icon bản quyền -->
      <v-icon style="color: black" class="mr-2">mdi mdi-copyright</v-icon>
      <!-- Hiển thị năm hiện tại và tên cửa hàng -->
      <span style="color: black">{{ new Date().getFullYear() }} — <strong>COFFEE 4 CON GÀ</strong></span> <!-- Thay đổi màu chữ -->
    </div>

    </v-footer>
  </template>

  <script>
  export default {};
  </script>

  <style>
    /* hover link mxh */
    .social-link {
      color: inherit; /* Mặc định màu chữ giống với màu chữ của phần tử cha */
      text-decoration: none; /* Loại bỏ gạch chân của link */
    }

    .social-link:hover {
      color: red; /* Thay đổi màu chữ khi hover thành màu đỏ */
    }

    .v-footer {
      padding: 0 0 !important;
    }
    .bgTop{
      background-color:#FAD06C;
    }
    .bgMidum{
      background-color:#F7F2E5;
    }
  </style>
