<script>
  import {
    Table,
    TableBody,
    TableHead,
    TableHeadCell,
    TableBodyRow,
    TableBodyCell,
    Checkbox,
    Button,
    GradientButton,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  //#region load order
  /**
   * @type {any[]}
   */
  let items = [];

  let totalEK = 0;
  let totalAK = 0;
  let totalProfit = 0;

  async function getOrders() {
    try {
      const data = await fetch("/api/v1/bestellung");
      if (!data.ok) {
        throw new Error(`Error: ${data.status} ${data.statusText}`);
      }
      items = await data.json();
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  onMount(() => {
    getOrders();
  });

  function countAmount() {
    totalEK = items.reduce((sum, item) => sum + item.anzahlEssenskarte, 0);
    totalAK = items.reduce((sum, item) => sum + item.anzahlAbendkarte, 0);
    totalProfit = items.reduce(
      (sum, item) =>
        sum + item.anzahlEssenskarte * 50 + item.anzahlAbendkarte * 20,
      0,
    );
  }
  //#endregion

  

  function saveState() {
    for(let i = 0; i < items.length; i++){
      let jsonData = JSON.stringify(items[i], null, 2);
      handleSubmit(jsonData);
    }
    console.log("Data exported as JSON number");

    alert("Änderungen erfolgreich gespeichert!")
    window.location.reload();
  }

  
  /**
     * @param {string} string
     */
  async function handleSubmit(string) {
    try {
      const response = await fetch("/api/v1/bestellung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: string,
      });
    } catch (error) {
      console.error("Error while editing orders:", error);
      alert(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      );
    }
  }

</script>

<div>
  {#if items.length > 0}
  <div class="button">
    <GradientButton id="saveBtn" color="red" on:click={saveState}>Save</GradientButton>
  </div>
    {countAmount()}
    <Table
      {items}
      id="myTable"
      color="green"
      striped={true}
      hoverable={true}
      placeholder="Search by E-Mail"
      filter={(item, searchTerm) =>
        item.benutzerEmail.toLowerCase().includes(searchTerm.toLowerCase())}
    >
      <TableHead>
        <TableHeadCell
          sort={(a, b) => a.benutzerEmail.localeCompare(b.benutzerEmail)}
          defaultSort>E-Mail</TableHeadCell
        >
        <TableHeadCell
          sort={(a, b) => a.anzahlEssenskarte - b.anzahlEssenskarte}
          >Anzahl Essenskarten</TableHeadCell
        >
        <TableHeadCell sort={(a, b) => a.anzahlAbendkarte - b.anzahlAbendkarte}
          >Anzahl Abendkarten</TableHeadCell
        >
        <TableHeadCell sort={(a, b) => a.bezahlt - b.bezahlt}
          >Bezahlt?</TableHeadCell
        >
        <TableHeadCell sort={(a, b) => a.id - b.id}
          >Bestellungs ID</TableHeadCell
        >
        <TableHeadCell sort={(a, b) => a.benutzerId - b.benutzerId}
          >Benutzer ID</TableHeadCell
        >
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        <TableBodyRow slot="row" let:item>
          <TableBodyCell>{item.benutzerEmail}</TableBodyCell>
          <TableBodyCell>{item.anzahlEssenskarte}</TableBodyCell>
          <TableBodyCell>{item.anzahlAbendkarte}</TableBodyCell>
          <TableBodyCell>
            <Checkbox bind:checked={item.bezahlt}></Checkbox>
          </TableBodyCell>
          <TableBodyCell>{item.id}</TableBodyCell>
          <TableBodyCell>{item.benutzerId}</TableBodyCell>
        </TableBodyRow>
      </TableBody>
      <tfoot>
        <tr class="font-semibold text-gray-900 dark:text-white">
          <th scope="row" class="py-3 px-6 text-base">Total</th>
          <td class="py-3 px-6">{totalEK}</td>
          <td class="py-3 px-6">{totalAK}</td>
          <td class="py-3 px-6">{totalProfit} €</td>
        </tr>
      </tfoot>
    </Table>
  {:else}
    <p>Keine Bestellungen gefunden.</p>
  {/if}
</div>

<style>
  .button {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px 20px;
    z-index: 10;
  }
  @media (max-width: 600px) {
    .button {
      position: static;
      align-self: flex-start;
      margin-top: 0;
    }
  }
</style>
