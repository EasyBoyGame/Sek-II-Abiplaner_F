<script>
	import { Button, Col, Row, Navbar, NavbarBrand, Container } from '@sveltestrap/sveltestrap';

    function redirect(){
        window.location.href = "https://jsg-vechelde.de/iserv/oauth/v2/auth?scope=openid+email&state=5NAb1XtCAPZZyZzw5tsgpBxc8ruYkpjsdWXsKbCqcXU.obie8nXj31I.H_P-hVX-RbKLgvHy5YK23Q.eyJydSI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTA5MC9hZG1pbi9tYXN0ZXIvY29uc29sZS8iLCJydCI6ImNvZGUiLCJybSI6InF1ZXJ5Iiwic3QiOiI2MDNlNjZmYi03ZGFjLTRmNzYtYTg1My01MTA0Y2YxZGY0N2QifQ&response_type=code&client_id=5_1savcj580lfocoskg48gsggo4k8ssg48ogw8c40008w80o08gs&redirect_uri=http%3A%2F%2Flocalhost%3A9090%2Frealms%2Fmaster%2Fbroker%2Fiserv-jsg-vechelde-keycloak-oidc%2Fendpoint&nonce=KdE7JU3FxMsoeqv2REIi-Q";
    }
  </script>
  
  <!--mit Fatih: korrekte Formatierung der Seite bei kleineren Bildschirmen-->


<div style="display: contents">
    <Navbar class="container-fluid" container="fluid" color="info" dark={false} expand="md" fixed="padding-top" theme="auto">
		<NavbarBrand href="/">
			<span class="test" style="font-size: 20px; margin: auto;">Abiball 2025 - Karten vorbestellen</span>
		</NavbarBrand>
	</Navbar>
	<div class="container mt-5 d-flex justify-content-center">
		<div class="row gap-3">
		  <div class="col-md-auto" style="border: 2px solid #ddd; border-radius: 15px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
			<p style="text-align: center; margin-bottom: 20px;">Willkommen auf der offiziellen Seite des Abiturjahrgangs 2025 des Julius-Spiegelberg-Gymnasiums! <br>
			  Nach der erfolgreichen Anmeldung mit ihrem IServ Konto, können Sie Karten für den Abiball vorbestellen.</p>
			<button type="button" class="btn btn-primary mb-3" on:click="{redirect}">Login mit IServ</button>
		  </div>
		</div>
	  </div>
	  
	  <div class="bottom-fixed">
		<p style="text-align: center; padding: 1rem;">
			Copyright © 2025 by Finanzkomitee
		</p>
	</div>
	

</div>


<style>
	.bottom-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #f1f1f1;
		text-align: center;
		padding: 10px;
		z-index: 1000; /* Ensures it appears above other content */
	}
</style>