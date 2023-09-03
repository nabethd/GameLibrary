import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import React from "react";
import useFetchCustomersQuery from "../../queries/use-fetch-customers-query";

interface ICustomerAutoComplete {
  value: any;
  onChange: (customer: any) => void;
}

const filter = createFilterOptions<string>();

const CustomerAutoComplete = ({ onChange, value }: ICustomerAutoComplete) => {
  const { data: customersList = [] } = useFetchCustomersQuery();

  return (
    <Autocomplete
      freeSolo
      disablePortal
      value={value}
      filterOptions={(options, params) => {
        return filter(options, params);
      }}
      options={customersList}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      onChange={(_, input) => {
        onChange(input);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="medium"
          InputLabelProps={{ shrink: true }}
          placeholder="Search customer"
          value={value}
        />
      )}
    />
  );
};

export default CustomerAutoComplete;
