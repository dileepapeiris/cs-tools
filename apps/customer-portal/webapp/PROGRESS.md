Added useGetChatHistory API hook for project chat history list.

- Added ChatHistoryItem and ChatHistoryResponse in src/models/responses.ts.
- Added ApiQueryKeys.CHAT_HISTORY and getMockChatHistory in src/constants/apiConstants.ts and src/models/mockFunctions.ts.
- Implemented src/api/useGetChatHistory.ts: GET /projects/:projectId/chat-history with mock (getMockChatHistory) and real fetch; uses useMockConfig, useAsgardeo, addApiHeaders, 5min staleTime.
- Added src/api/**tests**/useGetChatHistory.test.tsx (loading, mock data, query options, real fetch success/error, disabled when projectId empty); stubs window.config for real-API tests.

Added Service Requests and Change Requests cards on Support page under Outstanding Cases (Oxygen UI).

- Added src/components/support/service-requests-cards/: generic SupportRequestCard (uses alpha(theme.palette[paletteKey].light, 0.1) for icon/info box bg); ServiceRequestCard and ChangeRequestCard as thin wrappers; ServiceRequestsCards renders grid with both.
- SupportPage: renders ServiceRequestsCards below Outstanding Cases grid with mt: 3.
- Tests: SupportRequestCard.test.tsx, ServiceRequestsCards.test.tsx.

Display Outstanding Cases and Chat History on Support page under Novera chat banner (Oxygen UI).

- Added src/utils/supportCardUtils.ts: getChatStatusAction (view/resume), getChatStatusChip, getChatStatusRowSx, getCaseStatusChipColor, getCaseSeverityDotSx for chip/row colors and chat action.
- Added src/components/support/support-overview-cards/SupportOverviewCard.tsx: generic card with title, subtitle, icon (orange/blue variant), children, footer button (View all cases / View all chat history).
- Added OutstandingCasesList.tsx and ChatHistoryList.tsx: presentational lists for cases (number, severity dot, title, status chip, assigned, createdOn) and chat items (title, time/messages/kb, status chip, View/Resume button).
- SupportPage: useGetProjectCases(projectId, limit 5) and useGetChatHistory(projectId); Grid lg:2 columns below NoveraChatBanner with two SupportOverviewCards; View all cases → ../dashboard, View all chat history → chat; ChatHistoryList onItemAction navigates to chat with state.chatId.
- Constants: SUPPORT_OVERVIEW_CASES_LIMIT, SUPPORT_OVERVIEW_CHAT_LIMIT in supportConstants.ts.
- Tests: supportCardUtils.test.ts, SupportOverviewCard.test.tsx, OutstandingCasesList.test.tsx, ChatHistoryList.test.tsx; SupportPage.test.tsx mocks useGetProjectCases, useGetChatHistory, @asgardeo/react, and overview card components.
