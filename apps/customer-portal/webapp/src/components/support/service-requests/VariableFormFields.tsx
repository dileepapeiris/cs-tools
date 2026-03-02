// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@wso2/oxygen-ui";
import type { JSX } from "react";
import type { CatalogItemVariable } from "@models/responses";

export interface VariableFormFieldsProps {
  variables: CatalogItemVariable[] | undefined;
  isLoading: boolean;
  values: Record<string, string>;
  onChange: (variableId: string, value: string) => void;
}

const VARIABLE_TYPE_SINGLE_LINE = "Single Line Text";
const VARIABLE_TYPE_MULTI_LINE = "Multi Line Text";
const VARIABLE_TYPE_SELECT = "Select Box";
const VARIABLE_TYPE_CHECKBOX = "Checkbox";
const VARIABLE_TYPE_RADIO = "Radio Buttons";

/**
 * Renders dynamic form fields based on catalog item variable types.
 *
 * @param {VariableFormFieldsProps} props - Variables schema and current values.
 * @returns {JSX.Element} The variable form fields.
 */
export default function VariableFormFields({
  variables,
  isLoading,
  values,
  onChange,
}: VariableFormFieldsProps): JSX.Element {
  if (isLoading) {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Request Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={80} />
        </Box>
      </Paper>
    );
  }

  if (!variables?.length) {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Request Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No additional fields required for this request type.
        </Typography>
      </Paper>
    );
  }

  const sortedVariables = [...variables].sort((a, b) => a.order - b.order);

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 0 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Request Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedVariables.map((variable) => {
          const value = values[variable.id] ?? "";
          const type = variable.type ?? VARIABLE_TYPE_SINGLE_LINE;

          if (
            type === VARIABLE_TYPE_SELECT ||
            type === VARIABLE_TYPE_RADIO ||
            type === VARIABLE_TYPE_CHECKBOX
          ) {
            return (
              <FormControl key={variable.id} fullWidth size="small">
                <InputLabel id={`var-${variable.id}`}>
                  {variable.questionText}
                </InputLabel>
                <Select
                  labelId={`var-${variable.id}`}
                  value={value}
                  label={variable.questionText}
                  onChange={(e) =>
                    onChange(variable.id, e.target.value as string)
                  }
                  sx={{ borderRadius: 0 }}
                >
                  <MenuItem value="">
                    <em>Select...</em>
                  </MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            );
          }

          if (type === VARIABLE_TYPE_MULTI_LINE) {
            return (
              <TextField
                key={variable.id}
                fullWidth
                multiline
                size="small"
                rows={4}
                label={variable.questionText}
                value={value}
                onChange={(e) => onChange(variable.id, e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
              />
            );
          }

          return (
            <TextField
              key={variable.id}
              fullWidth
              size="small"
              label={variable.questionText}
              value={value}
              onChange={(e) => onChange(variable.id, e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
            />
          );
        })}
      </Box>
    </Paper>
  );
}
