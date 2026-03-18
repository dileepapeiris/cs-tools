// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import {
  Box,
  ComplexSelect,
  Header as HeaderUI,
  Skeleton,
} from "@wso2/oxygen-ui";
import { FolderOpen } from "@wso2/oxygen-ui-icons-react";
import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import type { ProjectListItem } from "@models/responses";
import ErrorIndicator from "@components/common/error-indicator/ErrorIndicator";

// Props for the ProjectSwitcher component.
interface ProjectSwitcherProps {
  projects: ProjectListItem[];
  selectedProject?: ProjectListItem;
  onProjectChange: (projectId: string) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const INITIAL_DISPLAY_LIMIT = 10;
const SCROLL_LOAD_THRESHOLD = 200;

/**
 * Project switcher component for the header.
 *
 * @param {ProjectSwitcherProps} props - The props for the component.
 * @returns {JSX.Element} The ProjectSwitcher component.
 */
export default function ProjectSwitcher({
  projects,
  selectedProject,
  onProjectChange,
  isLoading,
  isError,
}: ProjectSwitcherProps): JSX.Element {
  const [displayLimit, setDisplayLimit] = useState(INITIAL_DISPLAY_LIMIT);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll to load more projects
  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Check if scrolled near bottom
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      if (
        scrollHeight - (scrollTop + clientHeight) < SCROLL_LOAD_THRESHOLD &&
        displayLimit < projects.length
      ) {
        // Load 10 more items
        setDisplayLimit((prev) => Math.min(prev + 10, projects.length));
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [displayLimit, projects.length]);
  if (isLoading) {
    return (
      <HeaderUI.Switchers showDivider={false}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 40,
            px: 1.5,
            border: "1px solid",
            borderColor: "action.disabledBackground",
            borderRadius: "4px",
          }}
        >
          <FolderOpen size={16} />
          <Skeleton variant="rounded" width={150} height={20} />
        </Box>
      </HeaderUI.Switchers>
    );
  }

  if (isError) {
    return (
      <HeaderUI.Switchers showDivider={false}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            height: 40,
            width: 200,
            px: 1.5,
            border: "1px solid",
            borderColor: "error.main",
            borderRadius: "4px",
            color: "error.main",
          }}
        >
          <ErrorIndicator entityName="Projects" />
        </Box>
      </HeaderUI.Switchers>
    );
  }

  if (projects.length <= 1) {
    const project = selectedProject || projects[0];

    return (
      <HeaderUI.Switchers showDivider={false}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 40,
            minWidth: 200,
            px: 1.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "4px",
            backgroundColor: "background.paper",
          }}
        >
          <FolderOpen size={16} />
          <ComplexSelect.MenuItem.Text
            primary={project ? project.name : "Select Project"}
          />
        </Box>
      </HeaderUI.Switchers>
    );
  }

  return (
    <HeaderUI.Switchers showDivider={false}>
      {/* project switcher select */}
      <ComplexSelect
        value={selectedProject?.id || ""}
        onChange={(event: any) => onProjectChange(event.target.value)}
        size="small"
        sx={{ minWidth: 200 }}
        renderValue={(selected) => {
          const project = projects.find((project) => project.id === selected);
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FolderOpen size={16} />
              <ComplexSelect.MenuItem.Text
                primary={project ? project.name : "Select Project"}
              />
            </Box>
          );
        }}
      >
        <ComplexSelect.ListHeader>Switch Project</ComplexSelect.ListHeader>
        {/* project switcher list items - limited with scroll to load more */}
        <Box
          ref={listContainerRef}
          sx={{
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          {projects.slice(0, displayLimit).map((project) => (
            <ComplexSelect.MenuItem key={project.id} value={project.id}>
              <ComplexSelect.MenuItem.Text
                primary={project.name}
                secondary={project.key}
              />
            </ComplexSelect.MenuItem>
          ))}
          {displayLimit < projects.length && (
            <Box
              sx={{
                py: 1,
                px: 2,
                textAlign: "center",
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              Scroll to load more ({displayLimit} of {projects.length})
            </Box>
          )}
        </Box>
      </ComplexSelect>
    </HeaderUI.Switchers>
  );
}
