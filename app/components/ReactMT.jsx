import { Button, IconButton, Tooltip } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  useMaterialReactTable,
} from "material-react-table";
import React, { useState } from "react";

const ReactMT = ({
  queryKey,
  fetchUrl,
  columnsConfig,
  initialPageSize = 10,
}) => {
  //manage our own state for stuff we want to pass to the API
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //consider storing this code in a custom hook (i.e useFetchUsers)
  const {
    data: { data = [], meta } = {}, //your data and api response will probably be different
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      queryKey,
      {
        columnFilters, //refetch when columnFilters changes
        globalFilter, //refetch when globalFilter changes
        pagination, //refetch when pagination changes
        sorting, //refetch when sorting changes
      },
    ],
    queryFn: async () => {
      const url = new URL(fetchUrl, "http://localhost:3000");

      //read our state and pass it to the API as query params
      url.searchParams.set(
        "start",
        `${pagination.pageIndex * pagination.pageSize}`,
      );
      url.searchParams.set("size", `${pagination.pageSize}`);
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      url.searchParams.set("globalFilter", globalFilter ?? "");
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      //use whatever fetch library you want, fetch, axios, etc
      const { data: response } = await axios(url.href);
      return response;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });

  const table = useMaterialReactTable({
    columns: columnsConfig,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    enableGlobalFilterModes: true,
    paginationDisplayMode: "pages",
    enableColumnOrdering: true,
    enableStickyFooter: true,
    enableStickyHeader: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,

    rowCount: meta?.totalRowCount ?? 0,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
      rowSelection,
    },
    getRowId: (originalRow) => originalRow._id,

    enableRowActions: true,
    positionActionsColumn: "last",

    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip>
        <Button
          className={"rounded-none"}
          onClick={() => handleExport(table.getSelectedRowModel().rows)}
        >
          Export
        </Button>
      </Tooltip>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ReactMT;
