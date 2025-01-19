<script lang="ts">
    import { getRoles } from "$lib/auth";
    import { getApiV1Bestellung, patchApiV1Bestellung, type Bestellung } from "$lib/client";
  import {
    Table,
    TableBody,
    TableHead,
    TableHeadCell,
    TableBodyRow,
    TableBodyCell,
    Checkbox,
    Button,
    } from "flowbite-svelte";
  import { onMount } from "svelte";

  //#region load order
  /**
   * @type {any[]}
   */
  let items = $state<Bestellung[]>([]);

  let totalEK = 0;
  let totalAK = 0;
  let totalProfit = 0;

  async function getOrders() {
    try {
      const {data, response} = await getApiV1Bestellung();
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      items = data!;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  onMount(() => {
    getOrders();
  });

  function countAmount() {
    totalEK = items.reduce((sum, item) => sum + item.anzahlEssenskarte!, 0);
    totalAK = items.reduce((sum, item) => sum + item.anzahlAbendkarte!, 0);
    totalProfit = items.reduce(
      (sum, item) =>
        sum + item.anzahlEssenskarte! * 50 + item.anzahlAbendkarte! * 20,
      0,
    );
  }
  //#endregion


  async function onClick(bestellung:Bestellung) {
    alert(JSON.stringify(bestellung));
    try {
      const {response} = await patchApiV1Bestellung(
        {body:{id:bestellung.id, bezahlt:bestellung.bezahlt}}
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to patch orders:", error);
    }
  }

</script>

<div>
  {#if items.length > 0}
    {countAmount()}
    <Table
      {items}
      id="myTable"
      color="green"
      striped={true}
      hoverable={true}
      placeholder="Search by E-Mail"
      filter={(item, searchTerm) =>
        item.benutzerEmail!.toLowerCase().includes(searchTerm.toLowerCase())}
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
            <Checkbox bind:checked={item.bezahlt} on:change={() => onClick(item)}></Checkbox>
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
