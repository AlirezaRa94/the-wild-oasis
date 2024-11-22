import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { cabins, isPending } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  // Filter cabins based on the discount query parameter
  const filterValue = searchParams.get("discount");

  let filteredCabins;
  switch (filterValue) {
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      filteredCabins = cabins;
  }

  // Sort cabins based on the sortBy query parameter
  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [sortField, sortOrder] = sortBy ? sortBy.split("-") : [];
  const modifier = sortOrder === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier
  );

  return (
    <Menus>
      <Table columns='1fr 1.8fr 2.5fr 1.5fr 1fr 0.3fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
