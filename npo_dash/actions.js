(row) => {
    // MCA (Assessment's status as string)
    var status = row.lkp_mca_status_qw_;
    console.log("ROW IS:", row);
    console.log('mca_status: ' + row.lkp_mca_status);
    // 68 => Schedule Visit, 
    if (1 * row.lkp_activity !== 68 && row.mca_id === '' && (1 * row.lkp_compliant === 9999 || 1 * row.lkp_compliant === 8888)) {
        return 'Submitted without the form';
    }
    // if Assessment hasn't been opened yet (i.e record has not been entered yet)
    if (row.lkp_mca_status == null || row.lkp_mca_status == '') {
        return _('div', {}, addButton(row), ' ');
    } else {
        // Authorized Services activty
        if (1 * row.lkp_activity == 1182) {
            return _('div', {}, authorizeServices(row));
        }
        // SRT Email 
        if (activity_map[row.lkp_activity].table_pk == 'tsrt_email_id') {
            return _('div', {}, addButton(row));
        }
        // DRAFT
        if (1 * row.lkp_mca_status == 1) {
            return _('div', {}, ' ', submitButton(row), ' ', editButton(row), ' ', deleteButton(row));
        }
        // PENDING INSTANT PUSH
        if (1 * row.lkp_mca_status == 2) {
            return _('div', {}, ' ', editButton(row), ' ', instantPush(row), ' ',);
        }
        // PENDING PDF GENERATION
        if ([4, 8].indexOf(1 * row.lkp_mca_status) !== -1 && !row.md5) {
            return _('div', {}, ' ', viewButton(row));
        }
        //PENDING REVIEW AFTER PDF GENERATION
        if ([4, 8].indexOf(1 * row.lkp_mca_status) !== -1 && row.md5) {
            return _('div', {}, ' ', viewButton(row), ' ', reviewPdf(row), ' ', getDownloadButton(row));
        }
        // UPLOADED TO ENVOLVE or SUBMITED
        if ((1 * row.lkp_mca_status == 3 || 1 * row.lkp_mca_status == 4) &&
            !activity_map[row.lkp_activity].is_unsuccessful_contact && ![178, 177, 179, 1193, 1177].hasOwnProperty(row.lkp_activity)) {
            return _('div', {}, ' ', viewButton(row), ' ', reupload(row));
        }
        // IF UNSUCCESSFUL 
        if (activity_map[row.lkp_activity].is_unsuccessful_contact && activity_map[row.lkp_activity]) {
            return _('div', {}, addButton(row))
        }
        // ERROR ON SUBMISSION, INELIGIBLE PARTICIPANT, PARTICIPANT NOT FOUND
        if ([5, 6, 404].indexOf(1 * row.lkp_mca_status) !== -1) {
            return _('div', {}, ' ', viewButton(row));
        }
        // UPDATE REQUIRED
        if (1 * row.lkp_mca_status === 7 && row.encoded_pdf) {
            return _('div', {}, ' ', editButton(row), ' ', getDownloadButton(row), ' ', reviewPdf(row));
        }
        // UPLOADED, SUBMITED, INELIGIBLE, ERROR ON SUBMISSION, PENDING REVIEW, PDF SUBMITTED, 
        // PDF AND FORM SUBMITTED, PDF SUBMITED FORM UPLOADED
        if ([3, 4, 5, 6, 8, 50, 51, 52, 53].indexOf(1 * row.lkp_mca_status) >= 0) {
            return _('div', {}, ' ', viewButton(row), ' ', reupload(row), getDownloadButton(row), addButton(row));
        } return '';
    }
}