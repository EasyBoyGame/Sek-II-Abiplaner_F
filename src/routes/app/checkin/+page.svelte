<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { postApiV1CheckinByKartenNr, type Bestellung } from "$lib/client";
    import { goto } from "$app/navigation";
    

    let message = "Einchecken...";
    let loading = true;


    async function handleSubmit(kartenNr: string){
        loading = true;
        message = "Einchecken...";

        try{
            const {response} = await postApiV1CheckinByKartenNr({
            path: { kartenNr }
            })
		    if(response.ok){
                message = "ERFOLGREICH";
    			//goto('/checkin/success');
		    }
		    else{
                message = "UNGÜLTIG";
    			//goto('/checkin/failure');
		    }
        } catch(error){
            message = "FEHLGESCHLAGEN";
            //goto('/checkin/failure')
        } finally{
            loading =false;
        }
	}

    $effect(() =>{
        const url = new URL(page.url);
        const kartenNr = url.searchParams.get("kartenNr");
        if(kartenNr){
            handleSubmit(kartenNr);
        } else{
            loading = false;
            message = "⚠️ Keine KartenNr gefunden in der URL!";
        }
    });


    onMount(() => {
    let params = new URL(document.location.toString()).searchParams;
    let kartenNr = params.get("kartenNr");

    //handleSubmit(kartenNr);
  });
</script>

<!-- UI Feedback -->
<p>{message}</p>

{#if loading}
    <p>⏳ Loading...</p>
{/if}