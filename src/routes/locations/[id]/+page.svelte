<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { climbfindService } from '$lib/services/climbfind-service';
  import { loggedInUser, subTitle } from '$lib/runes.svelte';
  import type { Location } from '$lib/types/climbfind-types';
  import Card from '$lib/ui/Card.svelte';
  import ImageList from '$lib/ui/ImageList.svelte';
  import LeafletMap from '$lib/ui/LeafletMap.svelte';

  let location: Location = {
    title: "Loading...",
    description: "",
    category: "",
    latitude: 53.2734,
    longitude: -7.7783203,
    images: []
  };
  let map: LeafletMap;

  onMount(async () => {
    const locationId = $page.params.id;
    const searchedLocation = await climbfindService.getLocationById(locationId, loggedInUser.token);
    
    if (searchedLocation) {
      location = searchedLocation;
      subTitle.text = location.title;
      map.addMarker(location.latitude, location.longitude, `${location.title} - ${location.category}`);
      map.moveTo(location.latitude, location.longitude);
    }
  });
</script>

<div class="columns">
  <div class="column is-two-thirds">
    <Card title={location.title}>
      <div class="content">
        <h3 class="subtitle">{location.category}</h3>
        <p>{location.description}</p>
        <div class="box">
          <p><strong>Coordinates:</strong> {location.latitude}, {location.longitude}</p>
        </div>
      </div>
    </Card>
    
    <Card title="Images">
      <ImageList images={location.images} />
    </Card>
  </div>
  
  <div class="column is-one-third">
    <Card title="Location Map">
      <LeafletMap height={42} bind:this={map} />
    </Card>
  </div>
</div>