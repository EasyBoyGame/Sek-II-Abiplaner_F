<script lang="ts">
    import { goto } from "$app/navigation";
    import { loginSilent, getRoles } from "$lib/auth";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let {children} = $props();
    let roles = $state([]);
    let authorized = $state(false);

    onMount(() => {
        getRoles().then(resultRoles => roles = resultRoles)
        .then(() => {
            if(!roles.find((element) => element === "abiplaner-admin")){
                goto('/app');
            }
            else{
                authorized = true;
            }
        });
    });
    
</script>
{#if authorized}
{@render children()}
{/if}
