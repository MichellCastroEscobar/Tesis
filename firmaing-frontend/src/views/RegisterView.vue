<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 25rem;">
      <h2 class="card-title text-center mb-4">Registrar Cuenta</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="usernameRegister" class="form-label">Nombre de Usuario</label>
          <input type="text" class="form-control" id="usernameRegister" v-model="username" required>
        </div>
        <div class="mb-3">
          <label for="emailRegister" class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" id="emailRegister" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="passwordRegister" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="passwordRegister" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-success w-100 mb-2">Registrar</button>
      </form>
      <p class="text-center mt-3">
        ¿Ya tienes una cuenta?
        <router-link to="/login">Inicia sesión aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, email: this.email, password: this.password })
        })
        const data = await response.json()
        if (response.ok) {
          alert('Registro exitoso! Ahora puedes iniciar sesión.')
          this.$router.push('/login')
        } else {
          alert(data.msg)
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error al conectar con el servidor.')
      }
    }
  }
}
</script>
