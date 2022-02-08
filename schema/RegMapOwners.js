cube(`RegMapOwners`, {
  sql: `SELECT * FROM \`RegHub\`.\`reg_map_user\``,

  joins: {
    users: {
      relationship: `belongsTo`,
      sql: `TRIM(CONVERT(${CUBE}.\`user\`, CHAR)) = TRIM(CONVERT(${users}._id, CHAR))`
    },
    RegRisks: {
      relationship: `hasOne`,
      sql: `${CUBE}.\`srcObject\` = ${RegRisks}._id`
    },
    RegControls: {
      relationship: `hasOne`,
      sql: `${CUBE}.\`srcObject\` = ${RegControls}._id`
    },
    RegTasks: {
      relationship: `hasOne`,
      sql: `${CUBE}.\`srcObject\`= ${RegTasks}._id`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [srcObject, ownerId, _id]
    }
  },

  dimensions: {
    _id: {
      sql: `${CUBE}.\`_id\``,
      type: `string`,
      primaryKey: true
    },
    srcObject: {
      sql: `${CUBE}.\`srcObject\``,
      type: `string`,
      title: `Source`
    },
    ownerId: {
      sql: `${CUBE}.\`user\``,
      type: `string`
    }
  },

  dataSource: `default`
});
