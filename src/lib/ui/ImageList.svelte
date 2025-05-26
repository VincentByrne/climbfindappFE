<script lang="ts">  
  let { images } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Image</th>
      <th>Title</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#if !images || images.length === 0}
      <tr>
        <td colspan="3" class="has-text-centered">No images found for this location</td>
      </tr>
    {:else}
      {#each images as image}
        <tr>
          <td>
            <img src={image.imageUrl} alt={image.title} style="max-width: 100px; max-height: 100px;" />
          </td>
          <td>
            {image.title}
          </td>
          <td>
            {image.description}
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>