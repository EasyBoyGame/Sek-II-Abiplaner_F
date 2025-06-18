import { goto } from "$app/navigation";
import { postApiV1CheckinByKartenNr } from "$lib/client";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ url, fetch }) => {
    const kartenNr = url.searchParams.get('kartenNr');

    if (kartenNr) {
        try {
            const {data, response} = await postApiV1CheckinByKartenNr({
                body: { kartenNr:kartenNr }
            })
            if(response.ok){
                goto('/checkin/success');
            }
            else{
                goto('/checkin/failure');
            }
        }
        catch (error){

        }
    }
}