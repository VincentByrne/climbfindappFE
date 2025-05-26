<script lang="ts">
  import { currentDataSets, subTitle } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";

  subTitle.text = "Locations Data";
</script>

<div class="columns">
  <div class="column">
    <Card title="Locations By Category">
      <Chart data={currentDataSets.locationsByCategory} type="bar" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <Card title="Locations By User">
      <Chart data={currentDataSets.locationsByUser} type="pie" />
    </Card>
  </div>
</div>