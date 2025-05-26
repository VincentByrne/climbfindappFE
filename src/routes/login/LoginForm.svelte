<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { climbfindService } from "$lib/services/climbfind-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    console.log(`attempting to log in email: ${email} with password: ${password}`);
    let session = await climbfindService.login(email, password);
    if (session) {
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <!-- svelte-ignore event_directive_deprecated -->
  <form on:submit|preventDefault={login}>
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">Log In</button>
  </form>
</div>