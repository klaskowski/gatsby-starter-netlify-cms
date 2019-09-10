import CMS from 'netlify-cms-app'
import ReportPreview from './preview-templates/ReportPreview'

CMS.registerPreviewStyle("/css/layout.css");
CMS.registerPreviewStyle("/css/3.css");
CMS.registerPreviewTemplate('report', ReportPreview)
