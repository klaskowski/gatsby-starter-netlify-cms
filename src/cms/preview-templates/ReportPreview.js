import React from 'react'
import { ReportTemplate } from '../../templates/report'

export default ({ entry }) => (
  <ReportTemplate
    versantlogo={entry.getIn(['data', 'versantlogo'])}
    pearsonlogo={entry.getIn(['data', 'pearsonlogo'])}
    partnerlogo={entry.getIn(['data', 'partnerlogo'])}
  />
)
