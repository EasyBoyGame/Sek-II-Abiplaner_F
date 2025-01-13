<script>

    async function redirect(){
        const queryString = window.location.search;
        const urlParam = new URLSearchParams(queryString);
        const kartenNr = urlParam.get('kartenNr');

        try {
            const response = await fetch('http://localhost:8080/api/v1/checkin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: kartenNr
            });
            const error = response;
    }
    catch(error){
    }
}

</script>



<p>HERZLICHEN GLÜCKWUNSCH</p>
<div style="margin-top: 15px; display: flex; gap: 10px;">
    <button style="padding: 10px 20px; border: none; border-radius: 5px; background-color: #dc3545; color: white;" on:click={redirect}>redirect</button>
</div>