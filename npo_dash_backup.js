var mca_draft = { 178: 11306, 177: 10816, 179: 11166, 180: 11164, 66: 10669, 69: 10723, 110: 10627, 67: 10716, 163: 10716, 1117: 10730, 1118: 10716, 1135: 10716, 1137: 10669, 1138: 10716, 1193: 12607, 1177: 12607 };
var mca_submit = { 178: 11307, 177: 10817, 179: 11167, 180: 11165, 66: 10670, 69: 10724, 110: 10628, 67: 10717, 163: 10717, 1117: 10731, 1118: 10717, 1135: 10717, 1137: 10670, 1138: 10717, 1193: 12607, 1177: 12607 };
var pk_map = {
    66: 'twelcome_call_autosave_id',
    67: 'tunsuccessful_contact_autosave_id',
    69: 'tunscheduled_contact_autosave_id',
    110: 'tseven_or_fourteen_day_follow_autosave_id',
    163: 'tunsuccessful_contact_autosave_id',
    178: 'tpcsp_autosave_id',
    177: 'tinterrai_autosave_id',
    179: 'tsrt_assessment_autosave_id',
    1177: 'tsrt_email_id',
    180: 'thra_assessment_autosave_id',
    1117: 'tnew_member_orientation_autosave_id',
    1118: 'tunsuccessful_contact_autosave_id',
    1135: 'tunsuccessful_contact_autosave_id',
    1137: 'twelcome_call_autosave_id',
    1138: 'tunsuccessful_contact_autosave_id',
    1193: 'thedis_id'
};
var table_name = {
    177: 'x_interrai_autosave',
    178: 'x_pcsp_autosave',
    1107: 'x_permission_to_contact',
    1132: 'x_phi',
    1133: 'x_foc',
    1134: 'x_service_provider_choice'
};

var _map = {
    66: {
        table_name: 'x_welcome_call_autosave',
        pk: 'welcome_call_autosave_id',
        tpk: 'twelcome_call_autosave_id'
    },
    67: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    69: {
        table_name: 'x_unscheduled_contact_autosave',
        pk: 'unscheduled_contact_autosave_id',
        tpk: 'tunscheduled_contact_autosave_id'
    },
    110: {
        table_name: 'x_seven_or_fourteen_day_follow_autosave',
        pk: 'seven_or_fourteen_day_follow_autosave_id',
        tpk: 'tseven_or_fourteen_day_follow_autosave_id'
    },
    163: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    177: {
        table_name: 'x_interrai_autosave',
        pk: 'interrai_autosave_id',
        tpk: 'tinterrai_autosave_id'
    },
    178: {
        table_name: 'x_pcsp_autosave',
        pk: 'pcsp_autosave_id',
        tpk: 'tpcsp_autosave_id'
    },
    179: {
        table_name: 'x_srt_assessment_autosave',
        pk: 'srt_assessment_autosave_id',
        tpk: 'tsrt_assessment_autosave_id'
    },
    180: {
        table_name: 'x_hra_assessment_autosave',
        pk: 'hra_assessment_autosave_id',
        tpk: 'thra_assessment_autosave_id'
    },
    1117: {
        table_name: 'x_new_member_orientation_autosave',
        pk: 'new_member_orientation_autosave_id',
        tpk: 'tnew_member_orientation_autosave_id'
    },
    1118: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1135: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1137: {
        table_name: 'x_welcome_call_autosave',
        pk: 'welcome_call_autosave_id',
        tpk: 'twelcome_call_autosave_id'
    },
    1138: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1193: {
        table_name: 'x_hedis',
        pk: 'hedis_id',
        tpk: 'thedis_id'
    }
}

var ulist = [1118, 67, 163];
var special_forms = { 1132: 11290, 1133: 11292, 1134: 11291, 1107: 11450, 1136: 10091, 1139: 11508 }

var downloadInterRAIFile = function (filename, encoded_pdf) {
    var exportedFilename = filename + '.pdf';
    const byteCharacters = atob(encoded_pdf);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: 'application/pdf' });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, exportedFilename)
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function getDownloadButton(row) {
    if (row.md5) {
        return _(Button, {
            color: 'primary',
            title: 'Download', onClick: () => {
                toastr.info('Retrieving the PDF file.')
                iwb.request({
                    url: 'ajaxExecDbFunc?_did=2553',
                    params: { id: row.mca_id, table_name: table_name[row.lkp_activity] },
                    successCallback: (res) => {
                        const encoded_pdf = res.result.encoded_pdf;
                        if (encoded_pdf === '' || encoded_pdf === null) {
                            toastr.error('Something went wrong, there is no pdf file.')
                        } else {
                            var exportedFilename = row.filename + '.pdf';
                            const byteCharacters = atob(res.result.encoded_pdf);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); }
                            const byteArray = new Uint8Array(byteNumbers);
                            var blob = new Blob([byteArray], { type: 'application/pdf' });
                            if (navigator.msSaveBlob) { navigator.msSaveBlob(blob, exportedFilename) } else {
                                var link = document.createElement("a");
                                if (link.download !== undefined) {
                                    var url = URL.createObjectURL(blob);
                                    link.setAttribute("href", url);
                                    link.setAttribute("download", exportedFilename);
                                    link.style.visibility = 'hidden';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }
                            }
                        }
                    }
                });
            }
        }, _("span", { className: "icon-cloud-download" }))
    }
}


var editButton = function (lkp_activity, pk, id) {
    var className = "icon-pencil";
    var color = "warning";
    // if HEDIS we change icon
    if (lkp_activity == 12607) {
        className = "icon-magnifier";
        color = "primary";
    }
    return _(
        Button, {
        title: getLocMsg("edit"),
        key: "123", color: color,
        onClick: event => {
            var url = 'showForm?a=1&_fid=' + lkp_activity + '&' + pk + '=' + id;
            //IF HEDIS
            if (lkp_activity == 12607) {
                url += '&view=1';
            }
            iwb.openTab("1-" + Math.random(), url, {}, { openEditable: true });
        }
    },
        _("span", { className: className })
    );
}

var viewButton = function (lkp_activity, pk, id) {
    return _(Button, {
        color: 'primary',
        title: 'View', onClick: () => {
            var url = 'showForm?a=1&_fid=' + lkp_activity + '&disabled=1&' + pk + '=' + id;
            // if HEDIS
            if (lkp_activity == 12607) {
                url += '&view=1';
            }
            iwb.openTab("1-" + Math.random(), url, {}, { openEditable: true });
        }
    }, _('i', { className: 'icon-magnifier' }))
}


var addButton = function (fid, str, lkp_activity, id) {
    return _(Button, {
        color: 'primary',
        title: 'Add ' + str, onClick: () => {
            let url = 'showForm?a=2&_fid=' + fid + '&ilkp_activity_type=1&iparticipant_id=' + id;
            if ([1135].indexOf(lkp_activity) !== -1) {
                url += '&xlkp_reason_for_contact=11';
            }
            if (lkp_activity == 1137) {
                url += '&xlkp_contact_method=1';
            }
            if ([11290, 11292, 11291].indexOf(fid) !== -1) {
                url += '&xlkp_mca_status=1';
            }
            if ([67, 1138].indexOf(lkp_activity) !== -1) {
                url += '&xlkp_reason_for_contact=16&xlkp_contact_method=1';
            }
            if (lkp_activity == 1118) {
                url += '&xlkp_reason_for_contact=10';
            }
            if ([1135, 1136, 1138, 1137].indexOf(lkp_activity) !== -1) {
                url += '&xopened_by_activity=' + lkp_activity;
            }
            if (lkp_activity == 1193) {
                url += '&xlkp_mca_status=2';
            }
            console.log("fid: " + fid, "str: " + str, "lkp_activity: " + lkp_activity, "id: " + id)
            iwb.openTab("2-" + Math.random(), url);
        }
    }, _('i', { className: 'icon-plus' }))
}


var deleteButton = function (lkp_activity, pk, id) {
    return _(
        Button, {
        title: getLocMsg("are_you_sure"),
        key: "123", color: 'danger',
        onClick: event => {
            event && event.preventDefault && event.preventDefault();
            let url = 'ajaxPostForm?a=3&_fid=' + lkp_activity + '&' + pk + '=' + id;
            yesNoDialog({
                text: getLocMsg("are_you_sure"),
                callback: success =>
                    success &&
                    iwb.request({
                        url,
                        successCallback: () => {
                            iwb.closeTab(event, success)
                            grd_compliance_4npo.cmp.loadData(true);
                        }
                    })
            });
        }
    },
        _("span", { className: "icon-trash" }))
}


var reviewPdf = function (row) {
    var dsc = 'Review PDF';
    var link = 'showForm?a=2&_fid=11863&xparticipant_id=' + row.npo_id + "&xfilename=" + row.filename +
        "&xlkp_activity=" + row.lkp_activity + "&xmca_id=" + row.mca_id;
    if ([1, 3, 26].indexOf(1 * row.review_status) >= 0) {
        dsc = "Approved PDF";
        link += "&xreview=" + row.review_status
    }
    return _(Button, {
        color: 'primary',
        title: dsc, onClick: () => {
            iwb.openTab("1-" + Math.random(), link, {}, { openEditable: true });
        }
    }, dsc)
}

function reupload(row) {
    return _(Button, {
        color: 'primary',
        title: 'Reupload', onClick: () => {
            iwb.request({
                url: 'ajaxExecDbFunc?_did=2421',
                params: { table_name: _map[row.lkp_activity].table_name, id_field: _map[row.lkp_activity].pk, id: row.mca_id },
                successCallback: function (res) {
                    grd_compliance_4npo.cmp.loadData(true);
                }
            });
        }
    }, _('i', { className: 'icon-reload' }))
}

var authorizeServices = function (row) {
    if (row.lkp_compliant != null && 1 * row.lkp_compliant == 9999) {
        return _(Button, {
            color: 'primary',
            title: 'View', onClick: () => {
                iwb.openTab("1-" + Math.random(), 'showForm?a=1&_fid=8062&tactivity_id=' + row.activity_id, {}, { openEditable: true });
            }
        }, _('i', { className: 'icon-eye' }))
    }
    var link = 'showForm?a=2&_fid=12184&xparticipant_id=' + row.npo_id;
    return _(Button, {
        color: 'primary',
        title: 'Add ' + row.lkp_activity, onClick: () => {
            iwb.openTab("1-" + Math.random(), link, {}, { openEditable: true });
        }
    }, _('i', { className: 'icon-plus' }));

}