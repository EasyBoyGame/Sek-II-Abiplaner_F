<script lang="ts">
    import { goto } from '$app/navigation';
    import { logout } from '$lib/auth';
    import { postApiV1Bestellung } from '$lib/client';
    import { neuerPreis } from '$lib/stores/dataStore';
	import { Col, Row, Navbar, NavbarBrand, Container } from '@sveltestrap/sveltestrap';
	import { Button, Modal, Footer} from 'flowbite-svelte';

	let status = "";
	let antwort = "";
	let defaultModal = false;
	let anzahlEssenskarte = 0;
	let anzahlAbendkarte = 0;
	let bezahlt = false;

	async function handleSubmit(){
		const {data, response} = await postApiV1Bestellung({
			body: {anzahlEssenskarten:anzahlEssenskarte, anzahlAbendkarten:anzahlAbendkarte}
		})
		if(response.ok){
			defaultModal = true;
			status = "Erfolgreich";
			antwort = "Ihre Karten wurden erfolgreich vorbestellt!"
		}
		else{
			defaultModal = true;
			status = "Fehlgeschlagen";
			antwort = response.statusText;
		}
	}


	function handleInput(e: Event){
		const event = e as InputEvent;
		if(!event.target){ return; }
		const target = (event.target as HTMLInputElement);
		const value = target.value;
		if(value.length > 1){
			target.value = value.slice(0, 1);
		} else{
			target.value = value.replace(/[^0-9]/g, '');
		}
	}


	async function logoutProcedure(){
		await logout();
		goto('/');
	}

	
	
	$: if (anzahlEssenskarte > 9) anzahlEssenskarte = 9; 			// beschränkt Anzahl auf 9
	$: if (anzahlAbendkarte > 9) anzahlAbendkarte = 9; 				// beschränkt Anzahl auf 9
	$: result = anzahlEssenskarte * 50 + anzahlAbendkarte * 20;		// summiert Gesamtbetrag der Karten
</script>



<div class="page-wrapper">
	<Navbar class="container-fluid" container="fluid" color="info" dark={false} expand="md" fixed="padding-top" theme="auto">
		<NavbarBrand href="/">
			<span class="test" style="font-size: 20px; margin: auto;">Abiball 2025 - Karten vorbestellen</span>
		</NavbarBrand>
		<Button color="red" onclick={logoutProcedure}>Abmelden</Button>
	</Navbar>

	<div class="container mt-5 content" >
		<div class="card-wrapper">
			<div class="card-container">
				<h3 style="text-align: center;">Essenskarte</h3>
				<p>
					- Kartenpreis: 50€<br/>
					- Eintritt ab 18:00 Uhr
				</p>
				<label for="anzahlEssenkarten">Anzahl Karten:</label>
				<input type="number" class="form-control" bind:value={anzahlEssenskarte} oninput={handleInput} placeholder="0-9"/>
			</div>

			<div class="card-container">
				<h3 style="text-align: center;">Abendkarte</h3>
				<p>
					- Kartenpreis: 20€<br/>
					- Eintritt ab 22:00 Uhr
				</p>
				<label for="anzahlAbendkarten">Anzahl Karten:</label>
				<input type="number" class="form-control" bind:value={anzahlAbendkarte} oninput={handleInput} placeholder="0-9"/>
			</div>
		</div>

		<!--Gesamtbetrag für gewuenschte Anzahl an Karten berechnen + Feld fehlen-->
		<div class="container mt-3 card-container" style="width: fit-content;">
			<div class="text-center mt-4">
				<h6 style="padding-bottom: 0.5rem;">Gesamtbetrag:</h6>
				<input style="margin-bottom: 10px;" type="svelte-currency-input" class="form-control" id="gesamtbetrag" disabled={true} placeholder="{result},00 €" />
				<!--<button type="submit" class="btn btn-primary mb-3" on:click={handleSubmit}>Jetzt vorbestellen!</button>-->
				<button type="submit" class="btn btn-primary mb-3" onclick={handleSubmit} >Jetzt vorbestellen!</button>
				<Modal title={status} bind:open={defaultModal} autoclose outsideclose>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{antwort}</p>
					<svelte:fragment slot="footer">
	    				<Button color="red" onclick={logoutProcedure}>Abmelden</Button>
						<Button color="alternative">Zurück</Button>
  					</svelte:fragment>
				</Modal>
			</div>
		</div>
	</div>
	
	<div class="spacer"></div>

    <footer class="bottom-fixed">
        <p style="text-align: center; padding: 1rem;">
            Die Anzahl an gewünschten Karten kann bis zur Überweisung des fälligen Betrags geändert werden.<br/>
			Bei Bestellungen von über neun Karten, bitte Kontakt mit dem Finanzkomittee aufnehmen.
        </p>
    </footer>
	
</div>





<style>
	/* Responsive Design for Smaller Screens */
	@media only screen and (max-width:600px) {
		.bottom-fixed {
			padding: 5px;
			font-size: 15px;
		}
    }
	
	html, body {
        height: 100%;
        margin: 0;
    }
	
	.page-wrapper {
    	display: flex;
    	flex-direction: column;
    	min-height: 100vh; /* Ensures the wrapper covers the whole viewport */
	}

	.content {
    	flex: 1; /* Pushes the footer to the bottom */
	}

	/* Card Wrapper Styling */
	.card-wrapper {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap; 
		justify-content: center;
	}

	/* General Card Styling */
	.card-container {
		border: 2px solid #ddd;
		border-radius: 15px;
		padding: 20px;
		margin-bottom: 20px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		background-color: #f9f9f9;
	}

	.bottom-fixed {
        background-color: #f1f1f1;
        text-align: center;
        padding: 10px;
        z-index: 1000; /* Ensures it appears above other content */
    }

	.spacer{
		height: 50px;
	}

	/* Remove Spinner Buttons and Style Number Inputs */
	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none; /* Remove spinner for WebKit browsers */
		margin: 0; /* Remove extra margin */
	}

	input[type="number"] {
		-moz-appearance: textfield; /* Remove spinner for Firefox */
		border-radius: 15px; /* Match the rounded corners */
		padding: 10px; /* Inner spacing for better appearance */
		border: 2px solid #ddd; /* Match the card-container border */
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add shadow to match */
		background-color: #f9f9f9; /* Match the card-container background */
	}

	/* Disable Spinner Buttons for Currency Input */
	input[id=gesamtbetrag]::-webkit-outer-spin-button,
	input[id=gesamtbetrag]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Styling for Disabled Currency Input */
	input[id=gesamtbetrag] {
		border-radius: 15px; /* Ensure consistency with other inputs */
		padding: 10px; /* Add some padding for a cleaner look */
		border: 2px solid #ddd; /* Match the other input borders */
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add shadow to match */
		background-color: #f9f9f9; /* Match background */
	}
</style>
