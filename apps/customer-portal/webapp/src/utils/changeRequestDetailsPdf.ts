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

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { ChangeRequestDetails, CaseComment } from "@models/responses";

/**
 * Strips HTML tags from a string.
 */
function stripHtml(html: string | null | undefined): string {
  if (!html) return "N/A";
  return html.replace(/<[^>]*>/g, "").trim() || "N/A";
}

/**
 * Formats a date string for display.
 */
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "N/A";
  return dateStr;
}

/**
 * Generates and downloads a Change Request Details PDF.
 */
export function generateChangeRequestDetailsPdf(
  changeRequest: ChangeRequestDetails,
  comments?: CaseComment[],
): void {
  const doc = new jsPDF() as jsPDF & { lastAutoTable?: { finalY: number } };
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Change Request Details", 14, 20);

  // Horizontal line after title
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(14, 24, pageWidth - 14, 24);

  // Prepare all data for single table
  const tableData: string[][] = [
    ["Number", changeRequest.number || "N/A"],
    ["Description", stripHtml(changeRequest.description)],
    ["Customer Project", changeRequest.project?.label || "N/A"],
    ["Environment", changeRequest.deployment?.label || "N/A"],
    ["State", changeRequest.state?.label || "N/A"],
    ["Service Request", changeRequest.case?.number || "N/A"],
    ["Created By", changeRequest.createdBy || "N/A"],
    ["Created Date", formatDate(changeRequest.createdOn)],
    ["Start Date", formatDate(changeRequest.startDate)],
    ["End Date", formatDate(changeRequest.endDate)],
    ["Type", changeRequest.type?.label || "N/A"],
    ["Assigned Engineer", changeRequest.assignedEngineer?.label || "N/A"],
    ["Assigned Team", changeRequest.assignedTeam?.label || "N/A"],
    ["Impact", changeRequest.impact?.label || "N/A"],
    ["Service Outage Details", stripHtml(changeRequest.serviceOutage)],
    ["Communication Plan", stripHtml(changeRequest.communicationPlan)],
    ["Test Plan", stripHtml(changeRequest.testPlan)],
    ["Rollback Plan", stripHtml(changeRequest.rollbackPlan)],
  ];

  // Add optional fields
  if (changeRequest.approvedBy) {
    tableData.push(["Approved By", changeRequest.approvedBy.label]);
    tableData.push(["Approved On", formatDate(changeRequest.approvedOn)]);
  }

  if (changeRequest.product) {
    tableData.push(["Product", changeRequest.product.label]);
  }

  if (changeRequest.deployedProduct) {
    tableData.push(["Deployed Product", changeRequest.deployedProduct.label]);
  }

  if (changeRequest.justification) {
    tableData.push(["Justification", stripHtml(changeRequest.justification)]);
  }

  if (changeRequest.impactDescription) {
    tableData.push([
      "Impact Description",
      stripHtml(changeRequest.impactDescription),
    ]);
  }

  // Add Notes & Comments as a single row
  if (comments && comments.length > 0) {
    const commentsText = comments
      .map(
        (comment) =>
          `${comment.createdBy} - ${formatDate(comment.createdOn)}:\n${stripHtml(comment.content)}`,
      )
      .join("\n\n");
    tableData.push(["Notes & Comments", commentsText]);
  }

  // Generate single table with borders
  autoTable(doc, {
    startY: 28,
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: {
        fontStyle: "bold",
        cellWidth: 65,
        valign: "top",
      },
      1: {
        fontStyle: "normal",
        cellWidth: 115,
        valign: "top",
      },
    },
    margin: { bottom: 25 },
  });

  // Add footer with WSO2 Support, page numbers, and created date
  const createdDateTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const pageHeight = doc.internal.pageSize.getHeight();
    const footerY = pageHeight - 10;

    // Left: WSO2 Support 24x7
    doc.text("WSO2 Support 24x7", 14, footerY);

    // Center: Page numbers
    const pageText = `Page ${i} of ${totalPages}`;
    const textWidth = doc.getTextWidth(pageText);
    doc.text(pageText, (pageWidth - textWidth) / 2, footerY);

    // Right: Created date and time
    const dateWidth = doc.getTextWidth(createdDateTime);
    doc.text(createdDateTime, pageWidth - 14 - dateWidth, footerY);
  }

  // Download the PDF
  const fileName = `Change-Request-${changeRequest.number || "Details"}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}
