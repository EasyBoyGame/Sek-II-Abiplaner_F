<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import { postApiV1CheckinByKartenNr } from "$lib/client";

  onMount(async () => {
    const kartenNr = get(page).url.searchParams.get("kartenNr");

    if (kartenNr) {
      try {
        const { data, response } = await postApiV1CheckinByKartenNr({
          body: { kartenNr },
        });

        if (response.ok) {
          goto("/checkin/success");
        } else {
          goto("/checkin/failure");
        }
      } catch (error) {
        goto("/checkin/failure");
      }
    }
  });
</script>

<main class="p-4">
  <h1 class="text-2xl font-bold mb-4">This is checkin</h1>
</main>
