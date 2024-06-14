// Import các module cần thiết cho Vue Router
import { createRouter, createWebHistory } from 'vue-router'
// Import các component
import Home from '../views/Home.vue'
import PaymentComponent from '@/views/Payment.vue'

// Định nghĩa các route cho các view khác nhau
const routes = [
  {
    path: '/',
    // Layout mặc định
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      // Trang chủ
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      // Các danh mục sản phẩm khác nhau
      {
        path: 'coffee',
        name: 'Coffee',
        component: () => import('@/views/CoffeeProducts.vue'),
      },
      {
        path: 'icream',
        name: 'Icream',
        component: () => import('@/views/IcreamProducts.vue'),
      },
      {
        path: 'juice',
        name: 'Juice',
        component: () => import('@/views/JuiceProducts.vue'),
      },
      {
        path: 'milk',
        name: 'Milk',
        component: () => import('@/views/MilkProducts.vue'),
      },
      // Các view khác
      {
        path: 'vocher',
        name: 'Vocher',
        component: () => import('@/views/Vocher.vue'),
      },
      {
        path: 'lovelist',
        name: 'Lovelist',
        component: () => import('@/views/Lovelist.vue'),
      },
      {
        path: 'basket',
        name: 'Basket',
        component: () => import('@/views/Basket.vue'),
      },
      // View đăng nhập
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login/login.vue'),
      },
      // View thanh toán
      {
        path: '/payment',
        name: 'payment',
        component: PaymentComponent
      }
    ],
  },
]

// Tạo router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Export router
export default router
