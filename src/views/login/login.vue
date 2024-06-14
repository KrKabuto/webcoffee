<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12" style="background-color: #FAD06C;">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">
                          Vui lòng đăng nhập
                        </h1>
                        <h4 class="text-center mt-4" style="padding-bottom: 16px;">
                          Vui lòng Không để trống tài khoản và mật khẩu
                        </h4>
                        <v-form @submit.prevent="signIn">
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            @blur="checkEmailValidity"
                            v-model="email"
                          />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            @blur="checkPasswordValidity"
                            v-model="password"
                          />
                          <span v-if="passwordError" class="error-message">
                            Mật khẩu không được để trống
                          </span>
                        </v-form>
                        <span v-if="emailError" class="error-message">
                          Email không đúng định dạng
                        </span>
                        <span v-if="errorMessage" class="error-message">
                          {{ errorMessage }}
                        </span>
                        <!-- <h3 class="text-center mt-4">
                          Bạn <span class="forgot-password">quên mật khẩu ?</span>
                        </h3> -->
                        <div class="text-center mt-3" style="padding-bottom: 30px">
                          <v-btn
                            rounded
                            style="background-color: #F97350; color: black; margin-top: 5px"
                            @click="signIn"
                          >
                            SIGN IN
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1" style="padding-bottom: 16px;">
                          Đăng ký
                        </h1>
                        <h5 class="text-center">Nếu bạn chưa có tài khoản</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          rounded
                          outlined
                          dark
                          @click="step++"
                          style="background-color: #F7F2E5;"
                        >
                          SIGN UP
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1" style="padding-bottom: 16px;">
                          Đăng nhập
                        </h1>
                        <h5>Nếu bạn đã có tài khoản vui lòng đăng nhập tại đây</h5>
                      </v-card-text>
                      <div class="text-center" style="padding-bottom: 30px;">
                        <v-btn
                          rounded
                          outlined
                          dark
                          @click="step--"
                          style="background-color: #F7F2E5;"
                        >
                          Sign in
                        </v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">
                          Đăng kí
                        </h1>
                        <h4 class="text-center mt-4" style="padding-bottom: 16px;">
                          Vui lòng Không để trống tài khoản và mật khẩu
                        </h4>
                        <v-form @submit.prevent="signUp">
                          <v-text-field
                            label="Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            @blur="checkNameValidity"
                            v-model="name"
                          />
                          <span v-if="nameError" class="error-message">
                            Tên không được để trống
                          </span>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                            @blur="checkEmailValidity"
                            v-model="email"
                          />
                          <span v-if="emailError" class="error-message">
                            Email không đúng định dạng
                          </span>
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                            @blur="checkPasswordValidity"
                            v-model="password"
                          />
                          <span v-if="passwordError" class="error-message">
                            Mật khẩu không được để trống
                          </span>
                          <span v-if="errorMessage" class="error-message">
                            {{ errorMessage }}
                          </span>
                          <div class="text-center mt-n5" style="padding-bottom: 16px;">
                            <v-btn
                              style="background-color: #F97350; color: black; margin-top: 10px"
                              type="submit"
                              rounded
                            >
                              SIGN UP
                            </v-btn>
                          </div>
                        </v-form>
                        <span v-if="successMessage" class="success-message">
                          {{ successMessage }}
                        </span>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import supabase from '../../supabase';

export default {
  data: () => ({
    // Dữ liệu người dùng và quá trình đăng nhập
    step: 1, // Bước trong quá trình đăng nhập hoặc đăng ký
    email: '', // Email người dùng
    password: '', // Mật khẩu người dùng
    name: '', // Tên người dùng
    emailError: false, // Kiểm tra lỗi cho email
    passwordError: false, // Kiểm tra lỗi cho mật khẩu
    nameError: false, // Kiểm tra lỗi cho tên
    errorMessage: '', // Thông báo lỗi
    successMessage: '' // Thông báo thành công
  }),
  methods: {
    // Kiểm tra tính hợp lệ của email
    checkEmailValidity() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailRegex.test(this.email);
    },
    // Kiểm tra tính hợp lệ của mật khẩu
    checkPasswordValidity() {
      this.passwordError = this.password.trim() === '';
    },
    // Kiểm tra tính hợp lệ của tên
    checkNameValidity() {
      this.nameError = this.name.trim() === '';
    },
    // Xử lý quá trình đăng nhập
    async signIn() {
      const { data, error } = await supabase
        .from('signin')
        .select('*')
        .eq('email', this.email)
        .eq('password', this.password)
        .single();

      if (error) {
        console.error('Error logging in:', error.message);
        this.errorMessage = 'Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại!';
      } else {
        console.log('Logged in successfully:', data);
        this.errorMessage = '';
        alert('Đăng nhập thành công');

        // Lưu thông tin người dùng vào localStorage
        const userInfo = {
          name: data.name,
          email: data.email,
          avatar: 'default-avatar.png', // Sử dụng avatar mặc định
          token: 'user-auth-token' // Giả định rằng chúng ta có một token đăng nhập
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('userToken', 'user-auth-token'); // Lưu token vào localStorage
        
        window.location.href = '/';
      }
    },
    // Xử lý quá trình đăng ký
    async signUp() {
      // Kiểm tra tính hợp lệ của tên, email và mật khẩu
      if (this.nameError || this.emailError || this.passwordError) {
        this.errorMessage = 'Vui lòng nhập đúng định dạng.';
      } else {
        // Thực hiện đăng ký người dùng bằng Supabase
        const { user, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });

        if (error) {
          console.error('Error signing up:', error.message);
          if (error.message.includes('duplicate key value violates unique constraint')) {
            this.errorMessage = 'Email đã tồn tại';
          } else {
            this.errorMessage = 'Quá nhiều lần tạo tài khoản vui lòng thử lại!';
          }
        } else {
          console.log('Signed up successfully:', user);
          this.errorMessage = '';
          this.successMessage = 'Đăng ký thành công!';
          
          // Lưu thông tin người dùng vào bảng 'signin' trong Supabase
          const { data, error: insertError } = await supabase.from('signin').insert([
            {
              name: this.name,
              email: this.email,
              password: this.password,
            }
          ]);

          if (insertError) {
            console.error('Error inserting data into signin table:', insertError.message);
            // Xử lý lỗi khi thêm dữ liệu vào bảng 'signin'
          } else {
            console.log('Data inserted into signin table:', data);
            // Dữ liệu được chèn thành công vào bảng 'signin'
            // Reset fields sau khi đăng ký thành công
            this.name = '';
            this.email = '';
            this.password = '';
          }
        }
      }
    }
  }
};
</script>



<style>
.error-message {
  color: red;
  font-size: 14px;
}
.success-message {
  color: green;
  font-size: 14px;
}
.forgot-password {
  color: blue;
  transition: color 0.3s;
}
.forgot-password:hover {
  color: red;
}
</style>
