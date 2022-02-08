cube(`RegRegulations`, {
  sql: `SELECT * FROM \`RegHub\`.\`reg_alerts_info_regulations\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [authoritativeDocuments, _id],
    },
  },

  dimensions: {
    authoritativeDocuments: {
      sql: `${CUBE}.\`info.regulations.title\``,
      type: `string`,
      title: `AuthoritativeDocuments`,
    },
    citations: {
      sql: `${CUBE}.\`info.regulations.document_number\``,
      type: `string`,
      title: `Citations`,
    },
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true,
    },
  },

  dataSource: `default`,
});
