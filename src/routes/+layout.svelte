<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { climbfindService } from "$lib/services/climbfind-service";
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";

  onMount(async () => {
    if (browser) {
      await climbfindService.restoreSession();
    }
  });
</script>

<div class="container">
  {#if loggedInUser.email}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>