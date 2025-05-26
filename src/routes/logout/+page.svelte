<script lang="ts">
  import { goto } from "$app/navigation";
  import { climbfindService } from "$lib/services/climbfind-service";

  climbfindService.clearSession();
  goto("/");
</script>