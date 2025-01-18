<script>
	import { Button, Col, Row, Navbar, NavbarBrand, Container } from '@sveltestrap/sveltestrap';

    function redirect(){
        window.location.href = "https://abiplaner.hopto.org:2020/realms/iserv/broker/iserv-oidc/login?client_id=security-admin-console&tab_id=4jS7C6Fjw74&client_data=eyJydSI6Imh0dHBzOi8vYWJpcGxhbmVyLmhvcHRvLm9yZzoyMDIwL2FkbWluL2lzZXJ2L2NvbnNvbGUvIiwicnQiOiJjb2RlIiwicm0iOiJxdWVyeSIsInN0IjoiN2VkMWYwMDQtZjcxOC00ZWQ0LWFhZTItM2NlY2M0NTQyYjU4In0&session_code=GShgKvWB1U_MXH14XIHZ0gs77qSdipPsG_Pgx2N0ZdA";
    }
  </script>
  
  <!--mit Fatih: korrekte Formatierung der Seite bei kleineren Bildschirmen-->


  <div class="page-wrapper">
    <Navbar class="container-fluid" container="fluid" color="info" dark={false} expand="md" fixed="padding-top" theme="auto">
        <NavbarBrand href="/">
            <span class="test" style="font-size: 20px; margin: auto;">Abiball 2025 - Karten vorbestellen</span>
        </NavbarBrand>
    </Navbar>

    <div class="content">
        <div class="container mt-5 d-flex justify-content-center">
            <div class="row gap-3">
                <div class="col-md-auto" style="border: 2px solid #ddd; border-radius: 15px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <p style="text-align: center; margin-bottom: 20px;">Willkommen auf der offiziellen Seite des Abiturjahrgangs 2025 des Julius-Spiegelberg-Gymnasiums! <br>
                        Nach der erfolgreichen Anmeldung mit ihrem IServ Konto, können Sie Karten für den Abiball vorbestellen.
                    </p>
                    <button type="button" class="btn btn-primary mb-3" on:click="{redirect}">Login mit IServ</button>
                </div>
            </div>
        </div>
    </div>

	<div class="spacer"></div>

    <footer class="bottom-fixed">
        <p style="text-align: center; padding: 1rem;">
            Copyright © 2025 by Finanzkomitee
        </p>
    </footer>
</div>

<style>
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
        flex: 1; /* Makes the content take up all the available space */
        display: flex;
        flex-direction: column;
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
</style>