(row) => {
    var str = row.lkp_mca_status_qw_;
    var choice_pk = { 1147: 'tphi_id', 1146: 'tfoc_id', 1148: 'tservice_provider_choice_id',1177: 'tsrt_email_id' }[row.lkp_activity]
    var unsuccess = [1114, 1120, 1121, 184, 165, 169];
    if (special_forms.hasOwnProperty(1 * row.lkp_activity) && 1 * row.lkp_compliant != 9999 && 1 * row.lkp_compliant != 8888) {
        return _('div', {}, addButton(special_forms[1 * row.lkp_activity], str, 1 * row.lkp_activity, row.participant_id));
    } else {
        if (special_forms.hasOwnProperty(1 * row.lkp_activity)) {
            return _('div', {}, viewButton(special_forms[1 * row.lkp_activity], choice_pk, 1 * row.mca_id));
        }
        if ((row.lkp_mca_status == null || row.lkp_mca_status == '' || unsuccess.indexOf(1 * row.lkp_activity) != -1) && mca_draft.hasOwnProperty(row.lkp_activity)) {
            return _('div', {}, str, ' ', addButton(mca_draft[row.lkp_activity], str, 1 * row.lkp_activity, row.participant_id));
        }
        if (row.lkp_mca_status != null && 1 * row.lkp_mca_status == 1) {
            return _('div', {}, str, ' ', _(Button, {
                color: 'primary',
                title: 'Submit', onClick: () => {
                    iwb.openTab("2-" + Math.random(), 'showForm?a=1&_fid=' + mca_submit[row.lkp_activity] + '&_cnvId=1466&_cnvTblPk=' + row.mca_id
                        + '&' + pk_map[row.lkp_activity] + '=' + row.mca_id, {}, { openEditable: true });
                }
            }, 'Submit'), ' ', editButton(mca_draft[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id));
        }
        if (row.lkp_mca_status != null && 1 * row.lkp_mca_status == 2) {
            return _('div', {}, str, ' ', editButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id));
        }
        if (row.lkp_mca_status != null && 1 * row.lkp_mca_status == 3) {
            return _('div', {}, str, ' ', viewButton(mca_submit[row.lkp_activity], pk_map[row.lkp_activity], row.mca_id), ' ', reupload(row));
        }
        if (row.lkp_mca_status != null && 1 * row.lkp_mca_status == 4) {
            return _('div', {}, str, ' ', viewButton(assess_submit[row.lkp_activity], assess_pk_map[row.lkp_activity], row.mca_id), ' ', getDownloadButton(row));
        }
    }
    return '';
}