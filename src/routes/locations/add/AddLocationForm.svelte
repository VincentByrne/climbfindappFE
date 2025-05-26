<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { climbfindService } from "$lib/services/climbfind-service";
  import type { Location } from "$lib/types/climbfind-types";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let { locationEvent = null } = $props();

  let title = $state("");
  let description = $state("");
  let lat = $state(53.40181469611018);
  let lng = $state(-6.316292754371287);
  let categoryOptions = ["Indoor Climbing", "Outdoor Boulder", "Outdoor Trad"];
  let selectedCategory = $state("Indoor Climbing");
  let message = $state("Please add a climbing location");

  async function addLocation() {
    if (title && description && selectedCategory) {
      const location: Location = {
        title: title,
        description: description,
        category: selectedCategory,
        latitude: lat,
        longitude: lng,
        userid: loggedInUser._id
      };
      
      const success = await climbfindService.addLocation(location, loggedInUser.token);
      
      if (!success) {
        message = "Location not added - some error occurred";
        return;
      }

      if (locationEvent) locationEvent(location);
      
      
      message = `Thanks! You added ${title} as a ${selectedCategory} location`;
    } else {
      message = "Please complete all fields";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="title">Location Name:</label>
    <input bind:value={title} class="input" id="title" name="title" type="text" />
  </div>
  
  <div class="field">
    <label class="label" for="description">Description:</label>
    <textarea bind:value={description} class="textarea" id="description" name="description"></textarea>
  </div>
  
  <div class="field">
    <label class="label" for="category">Select Category:</label>
    <div class="select">
      <select bind:value={selectedCategory} id="category">
        {#each categoryOptions as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <Coordinates bind:lat bind:lng />
  
  <div class="field">
    <div class="control">
      <button onclick={() => addLocation()} class="button is-primary">Add Location</button>
    </div>
  </div>
</div>

<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>