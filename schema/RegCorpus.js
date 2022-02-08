cube(`RegCorpus`, {
  sql: `SELECT * FROM \`RegHub\`.reg_corpus`,

  joins: {
    tenants: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`tenantid\`, CHAR)) = TRIM(CONVERT(${tenants}.tenantId, CHAR))`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, regionCode, tenantId, update, updated]
    }
  },

  dimensions: {
    jurisdiction: {
      sql: `jurisdiction`,
      type: `string`
    },
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    name: {
      sql: `name`,
      type: `string`,
      primaryKey: true,
      shown: true
    },
    regionCode: {
      sql: `${CUBE}.\`regionCode\``,
      type: `string`
    },
    tenantId: {
      sql: `TRIM(CONVERT(${CUBE}.\`tenantId\`, CHAR))`,
      type: `string`
    },
    update: {
      sql: `update`,
      type: `time`
    },
    updated: {
      sql: `updated`,
      type: `time`
    }
  },

  dataSource: `default`
});
