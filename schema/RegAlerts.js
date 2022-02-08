cube(`RegAlerts`, {
  sql: `SELECT * FROM \`RegHub\`.reg_alerts where \`RegHub\`.reg_alerts.archived=0 and \`RegHub\`.reg_alerts.alertCategory !='EA'`,

  refreshKey: {
    every: `1 minute`,
  },

  joins: {
    RegCorpus: {
      relationship: `belongsTo`,
      sql: `${CUBE}.\`info.repo\` = ${RegCorpus}.id`,
    },
    RegAlertsAgencynames: {
      relationship: `belongsTo`,
      sql: `${CUBE}.\`_id\` = ${RegAlertsAgencynames}._id`,
    },
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`owner\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`,
    },
    alertsByGeography: {
      relationship: `belongsTo`,
      sql: `${CUBE}.\`jurisdiction\` = ${alertsByGeography}.descendantJurisId`,
    },
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`,
    },
  },

  preAggregations: {
    alertsCount: {
      type: `rollup`,
      measureReferences: [
        RegAlerts.unread,
        RegAlerts.applicable,
        RegAlerts.inProcess,
        RegAlerts.totalCount,
      ],
      dimensionReferences: [users.fullName, tenants.tenantId, RegCorpus.name],
      timeDimensionReference: publishedDate,
      external: true,
      scheduledRefresh: true,
      granularity: `day`,
    },
    alertsByAgency: {
      type: `rollup`,
      measureReferences: [
        RegAlerts.unread,
        RegAlerts.applicable,
        RegAlerts.inProcess,
        RegAlerts.totalCount,
      ],
      dimensionReferences: [RegAlertsAgencynames.agencyNames, tenants.tenantId],
      external: true,
      scheduledRefresh: true,
    },
    alertsByGeo: {
      type: `rollup`,
      measureReferences: [RegAlerts.alertsByGeoCount],
      dimensionReferences: [
        tenants.tenantId,
        alertsByGeography.shortName,
        alertsByGeography.displayName,
        alertsByGeography.jurisId,
        alertsByGeography.order,
        alertsByGeography.uiMapCode,
      ],
      external: true,
      scheduledRefresh: true,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [tenantId, created, updated],
    },
    alertsByGeoCount: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status <>'Excluded'` }],
      drillMembers: [tenantId, created, updated, publishedDate, status],
    },
    unread: {
      type: `count`,
      sql: `status`,
      title: `unread`,
      filters: [{ sql: `${CUBE}.status = 'Unread'` }],
    },
    excluded: {
      type: `count`,
      sql: `status`,
      title: `excluded`,
      filters: [{ sql: `${CUBE}.status = 'Excluded'` }],
    },
    applicable: {
      type: `count`,
      sql: `status`,
      title: `Applicable`,
      filters: [{ sql: `${CUBE}.status = 'Applicable'` }],
    },
    inProcess: {
      type: `count`,
      sql: `status`,
      title: `inProcess`,
      filters: [{ sql: `${CUBE}.status = 'In Process'` }],
    },
    totalCount: {
      sql: `${unread} + ${applicable} + ${inProcess}`,
      type: `number`,
      title: "totalCount",
    },
  },

  segments: {
    filterExcludedAlerts: {
      sql: `${CUBE}.\`status\` != 'Excluded'`,
    },
  },

  dimensions: {
    jurisdiction: {
      sql: `jurisdiction`,
      title: `juridiction`,
      type: `string`,
    },
    infoRegioncode: {
      sql: `${CUBE}.\`info.regionCode\``,
      type: `string`,
      title: `Info.regioncode`,
    },
    infoRepo: {
      sql: `${CUBE}.\`info.repo\``,
      type: `string`,
      title: `Info.repo`,
    },
    _id: {
      sql: `_id`,
      type: `string`,
      primaryKey: true,
    },
    owner: {
      sql: `TRIM(CONVERT(owner, CHAR))`,
      type: `string`,
    },
    status: {
      sql: `status`,
      type: `string`,
    },
    tenantId: {
      sql: `${CUBE}.\`tenantId\``,
      type: `string`,
    },
    created: {
      sql: `created`,
      type: `time`,
    },
    updated: {
      sql: `updated`,
      type: `time`,
    },
    archived: {
      sql: `archived`,
      type: `string`,
    },
    publishedDate: {
      sql: `publishedDate`,
      type: `time`,
    },
  },

  dataSource: `default`,
});
