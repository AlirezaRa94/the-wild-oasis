import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        field='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "created_at-asc", label: "Sort By Created Time (Asc)" },
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (Low First)" },
          { value: "regularPrice-desc", label: "Sort By Price (High First)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (Low First)" },
          { value: "maxCapacity-desc", label: "Sort By Capacity (High First)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
