<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 25rem;">
      <h2 class="card-title text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="emailLogin" class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" id="emailLogin" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="passwordLogin" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="passwordLogin" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-2">Iniciar Sesión</button>
      </form>
      <p class="text-center mt-3">
        ¿No tienes una cuenta?
        <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
        const data = await response.json()
        if (response.ok) {
          console.log('Login exitoso!', data)
          alert('Login exitoso!')
          this.$router.push('/dashboard')
        } else {
          alert(data.message)
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error al conectar con el servidor.')
      }
    }
  }
}
</script>
