<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LoginForm from "./LoginForm.svelte";

  subTitle.text = "Login to ClimbFind";
</script>

<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="column is-4 is-offset-4">
        <Card title="Login">
          <LoginForm />
        </Card>
      </div>
    </div>
  </div>
</section>