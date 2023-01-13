(row) => {
    var str = row.lkp_activity_qw_;
    // var MCA_ACTIVITIES = [3, 62, 66, 67, 69, 110, 163, 164, 165, 169, 170, 177, 178, 179, 180, 1103, 1104, 1110, 1111, 1112,
    //     1113, 1114, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1129, 1130, 1135, 1137, 1138, 1132, 1133, 1134, 1107, 1136]
    if ([68, 1116, 111].indexOf(1 * row.lkp_activity) !== -1) {
        if (1 * row.lkp_activity == 67 || 1 * row.lkp_activity == 163) { //unsucc call
            if (1 * row.attempts < 3 || row.attempts == '' || 1 * row.attempts == 0) {
                return _('div', {}, str, ' ', _(Button, {
                    color: 'primary',
                    title: 'Add ' + str, onClick: () => {
                        iwb.openTab("2-" + Math.random(), 'showForm?a=2&_fid=8062&ilkp_activity_type=2&iparticipant_id=' + row.npo_id + '&ilkp_activity=' + row.lkp_activity);
                    }
                }, _('i', { className: 'icon-plus' })));
            } else return str;
        } if (1 * row.lkp_activity === 111) { //unsucc call
            return _('div', {}, str, ' ', _(Button, {
                color: 'primary',
                title: 'Add ' + str, onClick: () => {
                    iwb.openTab("2-" + Math.random(), 'showForm?a=2&_fid=8062&ilkp_activity_type=2&iparticipant_id=' + row.npo_id + '&ilkp_activity=' + row.lkp_activity);
                }
            }, _('i', { className: 'icon-plus' })));
        }
        if (1 * row.lkp_activity != 67 && 1 * row.lkp_activity != 163 && 1 * row.lkp_compliant != 9999 && 1 * row.lkp_compliant != 8888) {
            return _('div', {}, str, ' ', _(Button, {
                color: 'primary',
                title: 'Add ' + str, onClick: () => {
                    iwb.openTab("2-" + Math.random(), 'showForm?a=2&_fid=8062&ilkp_activity_type=2&iparticipant_id=' + row.npo_id + '&ilkp_activity=' + row.lkp_activity);
                }
            }, _('i', { className: 'icon-plus' })));
        } if ((1 * row.lkp_compliant == 9999 || 1 * row.lkp_compliant == 8888) && 1 * row.lkp_activity != 67 && 1 * row.lkp_activity != 163) {
            return _('div', {}, str, ' ', _(Button, {
                color: 'secondary',
                title: 'Clean ' + str, onClick: () => {
                    yesNoDialog({
                        text: getLocMsg("are_you_sure"),
                        callback: success => {
                            if (success) {
                                iwb.ajax.postForm(8062, 3, { tactivity_id: row.activity_id }, () => {
                                    grd_x_npo1.cmp.loadData(!0)
                                });
                            }
                        }
                    });

                }
            }, _('i', { className: 'icon-minus' })));
        }
    }
    return str;
}
