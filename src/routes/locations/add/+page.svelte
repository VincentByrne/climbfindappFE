<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import AddLocationForm from "./AddLocationForm.svelte";

  subTitle.text = "Add New Location";


  
  

</script>

<Card title="Add Climbing Location">
  <AddLocationForm />
</Card>
