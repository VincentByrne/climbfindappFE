<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import { refreshLocationMap } from "$lib/services/location-utils";

  subTitle.text = "Climbing Locations Geo Data";
  let map: LeafletMap;

  onMount(async () => {
    await refreshLocationMap(map);
  });
</script>

<Card title="Climbing Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>