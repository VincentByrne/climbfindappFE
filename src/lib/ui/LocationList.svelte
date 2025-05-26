<script lang="ts">
  import { currentLocations } from "$lib/runes.svelte";
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Location</th>
      <th>Category</th>
      <th>Added by</th>
      <th>Coordinates</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#if !currentLocations.locations || currentLocations.locations.length === 0}
      <tr>
        <td colspan="5" class="has-text-centered">No locations found</td>
      </tr>
    {:else}
      {#each currentLocations.locations as location}
        <tr>
          <td>
            {location.title}
          </td>
          <td>
            {location.category}
          </td>
          <td>
            {#if location.userid && typeof location.userid === 'object'}
              {location.userid.firstName} {location.userid.lastName}
            {:else}
              Unknown
            {/if}
          </td>
          <td>
            {location.latitude}, {location.longitude}
          </td>
          <td>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a href={`/locations/${location._id}`} class="button is-small">
              <span class="icon is-small">
                <i class="fas fa-info-circle"></i>
              </span>
            </a>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>