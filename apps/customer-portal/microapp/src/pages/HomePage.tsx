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

import { Grid, colors, pxToRem } from "@wso2/oxygen-ui";
import { CircleCheck, Clock4, OctagonAlert } from "@wso2/oxygen-ui-icons-react";
import { MetricWidget, PieChartWidget, BarChartWidget } from "@components/features/dashboard";
import { useQuery } from "@tanstack/react-query";
import { cases } from "@src/services/cases";
import { useProject } from "@context/project";

const PROJECT_SEVERITY_PIE_COLORS: Record<string, string> = {
  "10": colors.red[500],
  "11": colors.orange[500],
  "12": colors.yellow[600],
  "13": colors.blue[500],
  "14": colors.green[500],
};

const PROJECT_ACTIVE_CASES_PIE_COLORS: Record<string, string> = {
  "1": colors.blue[500],
  "3": colors.green[500],
  "6": colors.teal[400],
  "10": colors.cyan[500],
  "18": colors.yellow[600],
  "1003": colors.orange[500],
  "1006": colors.red[500],
};

export default function HomePage() {
  const { projectId } = useProject();
  const { data: stats } = useQuery(cases.stats(projectId!));

  const activeCasesCount = stats?.stateCount
    .filter((stat) => stat.id !== "6")
    .reduce((sum, stat) => (sum += stat.count), 0);

  const outstandingIncidentsPieData = stats?.outstandingSeverityCount.map((item) => ({
    label: item.label,
    value: item.count,
    color: PROJECT_SEVERITY_PIE_COLORS[item.id] || colors.grey[500],
  }));

  const activeCasesPieData = stats?.stateCount.map((item) => ({
    label: item.label,
    value: item.count,
    color: PROJECT_ACTIVE_CASES_PIE_COLORS[item.id] || colors.grey[500],
  }));

  const casesTrendBarChartSeries = stats?.severityCount.map((item) => ({
    dataKey: item.id,
    name: item.label,
    color: PROJECT_SEVERITY_PIE_COLORS[item.id] || colors.grey[500],
    stackId: "total",
  }));

  const casesTrendBarChartData = stats?.casesTrend.map((trend) => {
    const row: Record<string, string | number> = { year: trend.period };
    trend.severities.forEach((s) => {
      row[s.id] = s.count;
    });

    return row;
  });

  return (
    <>
      <Grid spacing={1.5} container>
        <Grid size={6}>
          <MetricWidget
            label="Active Cases"
            value={activeCasesCount}
            trend={{ direction: "up", value: "+10%" }}
            icon={<OctagonAlert size={pxToRem(18)} color={colors.orange[500]} />}
          />
        </Grid>
        <Grid size={6}>
          <MetricWidget
            label="All Cases"
            value={stats?.totalCases}
            trend={{ direction: "up", value: "+3%" }}
            icon={<OctagonAlert size={pxToRem(18)} color={colors.yellow[700]} />}
          />
        </Grid>
        <Grid size={6}>
          <MetricWidget
            label="Resolved This Month"
            value={stats?.resolvedCases.currentMonth}
            trend={{ direction: "up", value: "+18%" }}
            icon={<CircleCheck size={pxToRem(18)} color={colors.green[500]} />}
          />
        </Grid>
        <Grid size={6}>
          <MetricWidget
            label="Average Response Time"
            value={stats?.averageResponseTime !== undefined ? `${stats.averageResponseTime}H` : undefined}
            trend={{ direction: "down", value: "-15%" }}
            icon={<Clock4 size={pxToRem(18)} color={colors.purple[500]} />}
          />
        </Grid>
        <Grid size={6}>
          <PieChartWidget title="Outstanding Incidents" data={outstandingIncidentsPieData} />
        </Grid>
        <Grid size={6}>
          <PieChartWidget title="Active Cases" data={activeCasesPieData} />
        </Grid>
        <Grid size={12}>
          <BarChartWidget
            xAxisKey="year"
            title="Cases Trend"
            series={casesTrendBarChartSeries}
            data={casesTrendBarChartData}
          />
        </Grid>
      </Grid>
    </>
  );
}
