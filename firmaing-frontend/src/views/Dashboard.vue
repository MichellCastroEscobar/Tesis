<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center">
      <h1 class="mb-4">Bienvenido al Dashboard</h1>
      <p class="lead">Ahora puedes acceder a las funciones de la aplicación.</p>
      <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      alert('Sesión cerrada.');
      this.$router.push('/login');
    }
  }
}
</script>
