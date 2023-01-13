(row) => {
    // MCA (Assessment's status as string)
    var status = row.lkp_mca_status_qw_;

    if (1 * row.lkp_activity !== 68 && row.mca_id === '' && (1 * row.lkp_compliant === 9999 || 1 * row.lkp_compliant === 8888)) {
        return 'Submitted without the form';
    }
    var choice_pk = {
        1132: 'tphi_id',
        1133: 'tfoc_id',
        1134: 'tservice_provider_choice_id',
        1107: 'tpermission_to_contact_id',
        1136: 'tgeneral_note_id',
        1139: 'tsrt_email_id'
    }[row.lkp_activity]
    if (special_forms.hasOwnProperty(1 * row.lkp_activity) && row.mca_id === '') {
        return _('div', {}, addButton(special_forms[1 * row.lkp_activity], status, 1 * row.lkp_activity, row.npo_id));
    } else {
        if (1 * row.lkp_activity == 1182) {
            return _('div', {}, authorizeServices(row));
        }
        if (special_forms.hasOwnProperty(1 * row.lkp_activity)) {
            return _('div', {}, status, ' ', viewButton(special_forms[1 * row.lkp_activity], choice_pk, 1 * row.mca_id),
                getDownloadButton(row), ' ', reviewPdf(row), choice_pk == 'tsrt_email_id' ? addButton(special_forms[1 * row.lkp_activity],
                    status, 1 * row.lkp_activity, row.npo_id) : '');
        }
        if (row.lkp_mca_status != null && 1 * row.lkp_mca_status == 1) {
            return _('div', {}, status, ' ', _(Button, {
                color: 'primary', title: 'Submit', onClick: () => {
                    iwb.openTab("2-" + Math.random(), 'showForm?a=1&_fid=' + mca_submit[row.lkp_activity] + '&_cnvId=1466&_cnvTblPk=' +
                        row.mca_id + '&' + pk_map[row.lkp_activity] + '=' + row.mca_id, {}, { openEditable: true });
                }
            }, 'Submit'), ' ', editButton(mca_draft[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ',
                deleteButton(mca_draft[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id));
        }
        if (row.lkp_mca_status != null && 1 * row.lkp_mca_status == 2) {
            return _('div', {}, status, ' ', editButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ',
                instantPush(temp_row), ' ',);
        }
        if (row.lkp_mca_status != null && [4, 8].indexOf(1 * row.lkp_mca_status) !== -1 && !row.md5) {
            return _('div', {}, status, ' ', viewButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id));
        }
        if (row.lkp_mca_status != null && [4, 8].indexOf(1 * row.lkp_mca_status) !== -1 && row.md5) {
            return _('div', {}, status, ' ', viewButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ',
                reviewPdf(row), ' ', getDownloadButton(row));
        }
        if (row.lkp_mca_status != null && (1 * row.lkp_mca_status == 3 || 1 * row.lkp_mca_status == 4) && ulist.indexOf(1 * row.lkp_activity) == -1
            && !pk_map.hasOwnProperty(178, 177, 179, 1193, 1177)) {
            return _('div', {}, status, ' ', viewButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ',
                reupload(row));
        }
        if ((row.lkp_mca_status == null || row.lkp_mca_status == '' || ulist.indexOf(1 * row.lkp_activity) != -1)
            && mca_draft.hasOwnProperty(row.lkp_activity)) {
            return _('div', {}, addButton(mca_draft[row.lkp_activity], status, 1 * row.lkp_activity, row.npo_id))
        }
        if (row.lkp_mca_status != null && [5, 6, 404].indexOf(1 * row.lkp_mca_status) !== -1) {
            return _('div', {}, status, ' ', viewButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id));
        }
        if (1 * row.lkp_mca_status === 7 && row.encoded_pdf) {
            return _('div', {}, row.lkp_mca_status_qw_, ' ', editButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ',
                getDownloadButton(row), ' ', reviewPdf(row));
        }
        if ([3, 4, 5, 6, 8, 50, 51, 52, 53].indexOf(1 * row.lkp_mca_status) >= 0) {
            return _('div', {}, status, ' ', viewButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ',
                reupload(row), getDownloadButton(row), addButton(mca_draft[row.lkp_activity], status, 1 * row.lkp_activity, row.npo_id));
        } return '';
    }
}