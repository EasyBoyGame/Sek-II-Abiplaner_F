<script lang="ts">
    import { goto } from "$app/navigation";
    import { loginSilent } from "$lib/auth";
    import { AuthStore } from "$lib/stores/auth_store";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let {children} = $props();

    onMount(() => {
        let authState = get(AuthStore);
        if (!authState.isAuthenticated) {
            loginSilent()
                .then(() => {
                    authState = get(AuthStore);
                    if (!authState.isAuthenticated) {
                        goto("/");
                    }
                })
                .catch(() => {
                    goto("/");
                });
        }
    });
</script>
{#if $AuthStore.isAuthenticated}
{@render children()}
{/if}
