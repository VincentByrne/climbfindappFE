<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/dashboard">
        <span class="icon"><i class="fas fa-mountain"></i></span>
        <span><strong>ClimbFind</strong></span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/dashboard">Dashboard</a>
        <a class="navbar-item" href="/locations/add">Add Location</a>
        <a class="navbar-item" href="/charts"> Charts </a>
        <a class="navbar-item" href="/maps"> Maps </a>
        <a class="navbar-item" href="/about">About</a>
        <a class="navbar-item" href="/logout">Logout [{loggedInUser.name}]</a>
      </div>
    </div>
  </div>
</nav>