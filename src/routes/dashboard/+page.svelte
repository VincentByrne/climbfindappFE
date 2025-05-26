<script lang="ts">
  import { currentDataSets, subTitle, loggedInUser } from "$lib/runes.svelte";
  import { climbfindService } from "$lib/services/climbfind-service";
  import type { Location } from "$lib/types/climbfind-types";
  import Card from "$lib/ui/Card.svelte";
  import AddLocationForm from "../locations/add/AddLocationForm.svelte";
  import { refreshLocationMap } from "$lib/services/location-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import LocationList from "$lib/ui/LocationList.svelte";
  import { onMount } from "svelte";

  subTitle.text = "ClimbFind Dashboard";
  let map: LeafletMap;

  onMount(async () => {
    await refreshLocationMap(map);
  });

  function locationAdded(location: Location) {
    const popup = `${location.title} - added by ${loggedInUser.name}`;
    map.addMarker(location.latitude, location.longitude, popup);
    map.moveTo(location.latitude, location.longitude);
  }
</script>

<div class="columns">
  <div class="column">
    <Card title="Climbing Locations Map">
      <LeafletMap height={58} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="add location">
      <AddLocationForm locationEvent={locationAdded} />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Locations by Category">
      <Chart data={currentDataSets.locationsByCategory} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="All Locations">
      <LocationList />
    </Card>
  </div>
</div>