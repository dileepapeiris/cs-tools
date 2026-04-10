// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License
// at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { useCallback, useEffect, useState, type JSX } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@wso2/oxygen-ui";
import { Shield, X } from "@wso2/oxygen-ui-icons-react";
import type { ProjectContact } from "@models/responses";
import { NULL_PLACEHOLDER } from "@constants/settingsConstants";
import { getAvatarColor, getInitials } from "@utils/settings";

export interface EditUserModalProps {
  open: boolean;
  contact: ProjectContact | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (next: { isSecurityContact: boolean }) => void;
}

/**
 * Admin-only modal for editing an existing contact.
 * Currently only toggles the Security Contact flag, and only for Portal Users.
 * System Users cannot be converted to security contacts.
 *
 * @param {EditUserModalProps} props - Modal props.
 * @returns {JSX.Element} The modal.
 */
export default function EditUserModal({
  open,
  contact,
  isSubmitting = false,
  onClose,
  onSubmit,
}: EditUserModalProps): JSX.Element {
  const [isSecurity, setIsSecurity] = useState(false);

  useEffect(() => {
    if (open && contact) {
      setIsSecurity(!!contact.isSecurityContact);
    }
  }, [open, contact]);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onClose();
  }, [isSubmitting, onClose]);

  const handleSave = useCallback(() => {
    onSubmit({ isSecurityContact: isSecurity });
  }, [isSecurity, onSubmit]);

  const isSystemUser = !!contact?.isCsIntegrationUser;
  const initialValue = !!contact?.isSecurityContact;
  const isDirty = isSecurity !== initialValue;

  const displayName = contact
    ? contact.firstName && contact.lastName
      ? `${contact.firstName} ${contact.lastName}`
      : contact.firstName || contact.lastName || contact.email || NULL_PLACEHOLDER
    : NULL_PLACEHOLDER;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="edit-user-modal-title"
      slotProps={{ paper: { sx: { position: "relative" } } }}
    >
      <IconButton
        aria-label="Close"
        size="small"
        onClick={handleClose}
        disabled={isSubmitting}
        sx={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      >
        <X size={18} />
      </IconButton>
      <DialogTitle id="edit-user-modal-title">Edit User</DialogTitle>
      <DialogContent>
        {contact && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                bgcolor: getAvatarColor(contact.id ?? contact.email ?? ""),
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                typography: "body1",
                fontWeight: 600,
              }}
            >
              {getInitials(contact.firstName, contact.lastName, contact.email)}
            </Box>
            <Box>
              <Typography variant="body2">{displayName}</Typography>
              <Typography variant="caption" color="text.secondary">
                {contact.email ?? NULL_PLACEHOLDER}
              </Typography>
            </Box>
          </Box>
        )}

        {isSystemUser ? (
          <Typography variant="body2" color="error">
            System Users cannot be security contacts. To change this, remove the
            user and re-add them as a Portal User or Security User.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isSecurity}
                  onChange={(e) => setIsSecurity(e.target.checked)}
                  disabled={isSubmitting}
                  color="error"
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Shield size={16} />
                  <Typography variant="body2">Security Contact</Typography>
                </Box>
              }
            />
            <Typography variant="caption" color="text.secondary">
              Security contacts receive WSO2 security advisories and CVE
              notifications for this project.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleSave}
          disabled={isSubmitting || isSystemUser || !isDirty}
          startIcon={
            isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined
          }
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
