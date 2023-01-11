// keys equivalent pk => table_id_column, tpk => table_pk, 
var activity_map = {
    // WELCOME CALL
    66: {
        draft_form: 10669,
        submit_form: 10670,
        table_name: 'x_welcome_call_autosave',
        table_id_column: 'welcome_call_autosave_id',
        table_pk: 'twelcome_call_autosave_id',
        instant_push_bf_id: 2785,
        instant_push_bf_param: 'xwelcome_call_id'
    },
    // UNSUCCESSFUL WELCOME CALL
    67: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // UNSCHEDULED CONTACT
    69: {
        draft_form: 10723,
        submit_form: 10724,
        table_name: 'x_unscheduled_contact_autosave',
        table_id_column: 'unscheduled_contact_autosave_id',
        table_pk: 'tunscheduled_contact_autosave_id',
        instant_push_bf_id: 2793,
        instant_push_bf_param: 'xunscheduled_id'
    },
    // UNSUCCESSFUL 7-14 FOLLOW UP CALL
    110: {
        draft_form: 10627,
        submit_form: 10628,
        table_name: 'x_seven_or_fourteen_day_follow_autosave',
        table_id_column: 'seven_or_fourteen_day_follow_autosave_id',
        table_pk: 'tseven_or_fourteen_day_follow_autosave_id',
        instant_push_bf_id: 2800,
        instant_push_bf_param: 'x_seven_fourteen_id'
    },
    // UNSUCCESSFUL 7-14 FOLLOW UP CALL
    163: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // INTERRAI
    177: {
        draft_form: 10816,
        submit_form: 10817,
        table_name: 'x_interrai_autosave',
        table_id_column: 'interrai_autosave_id',
        table_pk: 'tinterrai_autosave_id',
        instant_push_bf_id: 2770,
        instant_push_bf_param: 'xinterrai_autosave_id'
    },
    // PCSP
    178: {
        draft_form: 11306,
        submit_form: 11307,
        table_name: 'x_pcsp_autosave',
        table_id_column: 'pcsp_autosave_id',
        table_pk: 'tpcsp_autosave_id',
    },
    // SRT
    179: {
        draft_form: 11166,
        submit_form: 11167,
        table_name: 'x_srt_assessment_autosave',
        table_id_column: 'srt_assessment_autosave_id',
        table_pk: 'tsrt_assessment_autosave_id',
        instant_push_bf_id: 2721,
        instant_push_bf_param: 'xsrt_assessment_autosave_id'
    },
    // HRA
    180: {
        draft_form: 11164,
        submit_form: 11165,
        table_name: 'x_hra_assessment_autosave',
        table_id_column: 'hra_assessment_autosave_id',
        table_pk: 'thra_assessment_autosave_id',
        instant_push_bf_id: 2822,
        instant_push_bf_param: 'xhra_id'
    },
    // NEW MEMBER ORIENTATION
    1117: {
        draft_form: 10730,
        submit_form: 10731,
        table_name: 'x_new_member_orientation_autosave',
        table_id_column: 'new_member_orientation_autosave_id',
        table_pk: 'tnew_member_orientation_autosave_id',
        instant_push_bf_id: 2764,
        instant_push_bf_param: 'xnmo_id'
    },
    // UNSUCCESSFUL NEW MEMBER ORIENTATION
    1118: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    1135: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    1137: {
        draft_form: 10669,
        submit_form: 10670,
        table_name: 'x_welcome_call_autosave',
        table_id_column: 'welcome_call_autosave_id',
        table_pk: 'twelcome_call_autosave_id',
        instant_push_bf_id: 2785,
        instant_push_bf_param: 'xwelcome_call_id'
    },
    1138: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // HEDIS
    1193: {
        draft_form: 12607,
        submit_form: 12607,
        table_name: 'x_hedis',
        table_id_column: 'hedis_id',
        table_pk: 'thedis_id',
        instant_push_bf_id: 2835,
        instant_push_bf_param: 'xnfhedis_id'
    }
}
// I think this is unsuccessful list
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
                params: { table_name: activity_map[row.lkp_activity].table_name, id_field: activity_map[row.lkp_activity].pk, id: row.mca_id },
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

var instantPush = (row) => {
    var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
    // WE SHOW INSTANT PUSH BUTTON IF ONLY THE USER HAS PERMISSION TO PUSH RECORD TO ENVOLVE
    // FOLLOW THE CODE BELOW TO UNDERSTAND WHAT WE MEAN
    if (activity_map[lkp_activity].instant_push_bf_id > 0 && row.instantpush_flag && 1 * row.instantpush_flag > 0) {
        var lkp_activity = row.hybrid ? 'hybrid' : 1 * row.lkp_activity;
        return _(Button,
            {
                title: getLocMsg("Instant Push"),
                color: 'primary',
                key: row.mca_id + '_instantPush',
                onClick: event => {
                    iwb.request({
                        url: 'ajaxExecDbFunc?_did=' + activity_map[lkp_activity].instant_push_bf_id,
                        requestWaitMsg: true,
                        params: {
                            [activity_map[lkp_activity].instant_push_bf_param]: row.mca_id
                        },
                        successCallback: function (res) {
                            if (res.result.code == 1) {
                                var child1 = React.createElement('div', { dangerouslySetInnerHTML: { __html: res.result.data } });

                                iwb.showModal({
                                    title: 'Instant Push result',
                                    size: 'md',
                                    body: child1
                                });

                                grd_phw_compliance4par.cmp.loadData(true);
                            } else if (res.result.code == 0) {
                                toastr.info(res.result.msg);
                                grd_phw_compliance4par.cmp.loadData(true);
                            }
                        }
                    });
                }
            },
            _("span", { className: "fas2 fa-arrow-up" })
        );
    }
}

// Can be used to have colorful text for MCA status
var statusText = (status_string, lkp_mca_status) => {
    var statusColor = {
        1: 'pink',
        2: 'blue',
        3: 'green',
        6: 'red',
        7: 'yellow',
        8: 'cyan',
        50: 'orange',
        55: 'green'
    }
    return _('span', { className: 'badge badge-pill badge-' + statusColor[lkp_mca_status] }, status_string);
}
