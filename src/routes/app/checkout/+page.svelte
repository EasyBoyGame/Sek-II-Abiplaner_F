<script lang="ts">
    import { goto } from '$app/navigation';
    import { neuerPreis } from '$lib/stores/dataStore';
	import { Button, Col, Row, Navbar, NavbarBrand, Container } from '@sveltestrap/sveltestrap';
    import { get } from 'svelte/store';
	let amount = get(neuerPreis);

    function redirectZurueck(){
        goto('/order')
        //window.location.href = "http://localhost:5173/order";
    }

    function redirectAbmelden(){
        goto('/')
        //window.location.href = "http://localhost:5173/";
    }
</script>

<div>
    <Navbar class="container-fluid" container="fluid" color="info" dark={false} expand="md" fixed="padding-top" theme="auto">
		<NavbarBrand href="/">
			<span class="test" style="font-size: 20px; margin: auto;">Abiball 2025 - Karten vorbestellen</span>
		</NavbarBrand>
	</Navbar>
</div>

<div style="margin: 20px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #f9f9f9; text-align: center; font-size: 1.2em;">
        <p>Vielen Dank für Ihre Bestellung.</p>
        <p>Bitte überweisen Sie den Betrag von {amount} € bis zum 01.02.2025 an die folgende Bankverbindung:</p>
        <p><strong>IBAN: DE123456789</strong></p>
        <p>Sie erhalten die Abiballkarten anschließend innerhalb <br> der nächsten 2-3 Werktage per E-Mail.</p>
    </div>
    <div style="margin-top: 15px; display: flex; gap: 10px;">
        <button style="padding: 10px 20px; border: none; border-radius: 5px; background-color: #007bff; color: white;"on:click={redirectZurueck}>Zurück</button>
        <button style="padding: 10px 20px; border: none; border-radius: 5px; background-color: #dc3545; color: white;"on:click={redirectAbmelden}>Abmelden</button>
    </div>
</div>
