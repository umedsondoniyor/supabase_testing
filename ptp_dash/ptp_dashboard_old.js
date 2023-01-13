var mca_draft = {
    1112: 10718, 1113: 10725, 1114: 10716, 3: 10509, 1120: 10716, 1121: 10716,
    183: 10730, 184: 10716, 164: 10669, 165: 10716, 169: 10716, 170: 10627,
    1140: 11306, 1149: 10816, 1131: 11166, 1130: 11164, 1110: 10723
};
var mca_submit = {
    1112: 10719, 1113: 10725, 1114: 10717, 3: 10610, 1120: 10717, 1121: 10717,
    183: 10731, 184: 10717, 164: 10670, 165: 10717, 169: 10717, 170: 10628,
    1140: 11307, 1149: 10817, 1131: 11167, 1130: 11165, 1110: 10724
};

var special_forms = { 1147: 11290, 1146: 11292, 1148: 11291, 1177: 11508 }

var pk_map = {
    3: 'tmonthly_contact_autosave_id',
    164: 'twelcome_call_autosave_id',
    165: 'tunsuccessful_contact_autosave_id',
    169: 'tunsuccessful_contact_autosave_id',
    170: 'tseven_or_fourteen_day_follow_autosave_id',
    183: 'tnew_member_orientation_autosave_id',
    184: 'tunsuccessful_contact_autosave_id',
    1112: 'tquarterly_contact_autosave_id',
    1113: 'tannual_contact_autosave_id',
    1114: 'tunsuccessful_contact_autosave_id',
    1120: 'tunsuccessful_contact_autosave_id',
    1121: 'tunsuccessful_contact_autosave_id',
    1130: 'thra_assessment_autosave_id',
    1131: 'tsrt_assessment_autosave_id',
    1140: 'tpcsp_autosave_id',
    1149: 'tinterrai_autosave_id',
    1110: 'tunscheduled_contact_autosave_id'
};


var _map = {
    3: {
        table_name: 'x_monthly_contact_autosave',
        pk: 'monthly_contact_autosave_id',
        tpk: 'tmonthly_contact_autosave_id'
    },
    164: {
        table_name: 'x_welcome_call_autosave',
        pk: 'welcome_call_autosave_id',
        tpk: 'twelcome_call_autosave_id'
    },
    165: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    169: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    170: {
        table_name: 'x_seven_or_fourteen_day_follow_autosave',
        pk: 'seven_or_fourteen_day_follow_autosave_id',
        tpk: 'tseven_or_fourteen_day_follow_autosave_id'
    },
    183: {
        table_name: 'x_new_member_orientation_autosave',
        pk: 'new_member_orientation_autosave_id',
        tpk: 'tnew_member_orientation_autosave_id'
    },
    184: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1112: {
        table_name: 'x_quarterly_contact_autosave',
        pk: 'quarterly_contact_autosave_id',
        tpk: 'tquarterly_contact_autosave_id'
    },
    1113: {
        table_name: 'x_annual_contact_autosave',
        pk: 'annual_contact_autosave_id',
        tpk: 'tannual_contact_autosave_id'
    },
    1114: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1120: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1121: {
        table_name: 'x_unsuccessful_contact_autosave',
        pk: 'unsuccessful_contact_autosave_id',
        tpk: 'tunsuccessful_contact_autosave_id'
    },
    1130: {
        table_name: 'x_hra_assessment_autosave',
        pk: 'hra_assessment_autosave_id',
        tpk: 'thra_assessment_autosave_id'
    },
    1131: {
        table_name: 'x_srt_assessment_autosave',
        pk: 'srt_assessment_autosave_id',
        tpk: 'tsrt_assessment_autosave_id'
    },
    1140: {
        table_name: 'x_pcsp_autosave',
        pk: 'pcsp_autosave_id',
        tpk: 'tpcsp_autosave_id'
    },
    1149: {
        table_name: 'x_interrai_autosave',
        pk: 'interrai_autosave_id',
        tpk: 'tinterrai_autosave_id'
    },
    1110: {
        table_name: 'x_unscheduled_contact_autosave',
        pk: 'unscheduled_contact_autosave_id',
        tpk: 'tunscheduled_contact_autosave_id'
    }
}

function getDownloadButton(row) {
    if (row.encoded_pdf) {
        return _(Button, {
            color: 'primary',
            title: 'Download', onClick: () => {
                toastr.info('Retrieving the PDF file.')
                iwb.request({
                    url: 'ajaxExecDbFunc?_did=2553',
                    params: { id: row.mca_id, table_name: _map[row.lkp_activity].table_name },
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
var reviewPdf = function (row) {
    var dsc = 'Review PDF';
    var link = 'showForm?a=2&_fid=11863&xparticipant_id=' + row.participant_id + "&xfilename=" + row.filename +
        "&xlkp_activity=" + row.lkp_activity + "&xmca_id=" + row.mca_id;
    if (1 * row.review_status == 1) {
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


var editButton = function (lkp_activity, pk, id) {
    return _(
        Button, {
        title: getLocMsg("edit"),
        key: "123", color: 'warning',
        onClick: event => {
            iwb.openTab("1-" + Math.random(), 'showForm?a=1&_fid=' + lkp_activity + '&' + pk + '=' + id, {}, { openEditable: true });
        }
    },
        _("span", { className: "icon-pencil" })
    );
}

var viewButton = function (lkp_activity, pk, id) {
    return _(Button, {
        color: 'primary',
        title: 'View', onClick: () => {
            iwb.openTab("1-" + Math.random(), 'showForm?a=1&_fid=' + lkp_activity + '&disabled=1&' + pk + '=' + id, {}, { openEditable: true });
        }
    }, _('i', { className: 'icon-magnifier' }))
}

var addButton = function (fid, str, lkp_activity, id) {
    return _(Button, {
        color: 'primary',
        title: 'Add ' + str, onClick: () => {
            let url = 'showForm?a=2&_fid=' + fid + '&ilkp_activity_type=2&iparticipant_id=' + id;

            iwb.openTab("2-" + Math.random(), url);
        }
    }, _('i', { className: 'icon-plus' }))
}

function reupload(row) {
    return _(Button, {
        color: 'primary',
        title: 'Reupload', onClick: () => {
            iwb.request({
                url: 'ajaxExecDbFunc?_did=2421',
                params: { table_name: _map[row.lkp_activity].table_name, id_field: _map[row.lkp_activity].pk, id: row.mca_id },
                successCallback: function (res) {
                    grd_phw_compliance4par.cmp.loadData(true);
                }
            });
        }
    }, _('i', { className: 'icon-reload' }))
}