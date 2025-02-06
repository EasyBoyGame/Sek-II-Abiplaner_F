<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { postApiV1CheckinByKartenNr, type Bestellung } from "$lib/client";
    

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
    			message = "✅ Check-in erfolgreich!";
		    }
		    else{
    			message = "❌ Check-in fehlgeschlagen.";
		    }
        } catch(error){
            message = "⚠️ Check-in fehlgeschlagen.";
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
</script>

<!-- UI Feedback -->
<p>{message}</p>

{#if loading}
    <p>⏳ Loading...</p>
{/if}