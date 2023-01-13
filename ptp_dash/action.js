(row) => {
    // MCA (Assessment's status as string)
    var status = row.lkp_mca_status_qw_;

    // if activity is "Multiple MCA" or "Annual Contact"
    if (activity_map.hasOwnProperty(1 * row.lkp_activity)) {
        console.log("ROW IS:", row);
        if (1 * row.service_request_id) {
            var temp_row = { ...row, hybrid: true };
            // if Assessment hasn't been opened yet (i.e record has not been entered yet)
            if (row.lkp_mca_status == null || row.lkp_mca_status == '') {
                return _('div', {}, addButton(temp_row), ' ', viewServiceRequest(row.service_request_id * 1));
            }
            // DRAFT
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 1) {
                return _('div', {}, submitButton(temp_row), ' ', editButton(temp_row), ' ', deleteButton(row), ' ', viewServiceRequest(row.service_request_id * 1));
            }
            // PENDING INSTANT PUSH
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 2) {
                return _('div', {}, editButton(temp_row), ' ', instantPush(temp_row), ' ', viewServiceRequest(row.service_request_id * 1));
            }
            // UPLOADED TO ENVOLVE
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 3) {
                return _('div', {}, viewButton(temp_row), ' ', viewServiceRequest(row.service_request_id * 1));
            }
            // ERROR ON SUBMISSION, INELIGIBLE PARTICIPANT, PARTICIPANT NOT FOUND
            if (row.lkp_mca_status != null && [5, 6, 404].indexOf(1 * row.lkp_mca_status) != -1) {
                return _('div', {}, submitButton(temp_row), ' ', instantPush(temp_row), ' ', viewServiceRequest(row.service_request_id * 1));
            }
        } else {
            // if Assessment hasn't been opened yet (i.e record has not been entered yet)
            if (row.lkp_mca_status == null || row.lkp_mca_status == '') {
                return _('div', {}, addButton(row), ' ');
            }
            // DRAFT
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 1) {
                return _('div', {}, submitButton(row), ' ', editButton(row), ' ', deleteButton(row));
            }
            // PENDING INSTANT PUSH or PDF SUBMITTED
            if (row.lkp_mca_status != null && (1 * row.lkp_mca_status === 2 || 1 * row.lkp_mca_status === 50)) {
                return _('div', {}, viewButton(row), ' ', getDownloadButton(row), ' ', reviewPdf(row), ' ', instantPush(row));
            }
            // UPLOADED TO ENVOLVE
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 3) {
                return _('div', {}, viewButton(row), ' ', getDownloadButton(row), ' ', reviewPdf(row));
            }
            // ERROR ON SUBMISSION, INELIGIBLE PARTICIPANT, PARTICIPANT NOT FOUND
            if (row.lkp_mca_status != null && [5, 6, 404].indexOf(1 * row.lkp_mca_status) != -1) {
                return _('div', {}, submitButton(row), ' ', instantPush(row));
            }
            // UPDATE REQUIRED
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 7) {
                return _('div', {}, submitButton(row), ' ', getDownloadButton(row), reviewPdf(row));
            }
            // PENDING REVIEW
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 8) {
                return _('div', {}, viewButton(row), ' ', getDownloadButton(row), ' ', reviewPdf(row));
            }
            // FORM UPLOADED AND PDF UPLOADED
            if (row.lkp_mca_status != null && 1 * row.lkp_mca_status === 55) {
                return _('div', {}, viewButton(row), ' ', getDownloadButton(row), reviewPdf(row));
            }
        }
    }
    return status;
}