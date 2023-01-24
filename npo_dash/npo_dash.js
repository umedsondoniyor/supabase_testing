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
    // FOC
    1133: {
        draft_form: 11292,
        submit_form: 11292,
        table_name: 'x_foc',
        table_id_column: 'foc_id',
        table_pk: 'tfoc_id',
        is_special: true,
        instant_push_bf_id: 2872,
        instant_push_bf_param: 'xfoc_id'
    },
    // PHI
    1132: {
        draft_form: 11290,
        submit_form: 11290,
        table_name: 'x_phi',
        table_id_column: 'phi_id',
        table_pk: 'tphi_id',
        is_special: true,
        instant_push_bf_id: 2873,
        instant_push_bf_param: 'xphi_id'
    },
    // SPC
    1134: {
        draft_form: 11291,
        submit_form: 11291,
        table_name: 'x_service_provider_choice',
        table_id_column: 'service_provider_choice_id',
        table_pk: 'tservice_provider_choice_id',
        is_special: true,
        instant_push_bf_id: 2874,
        instant_push_bf_param: 'xservice_provider_choice_id'
    },
    // SRT EMAIL
    1139: {
        draft_form: 11508,
        submit_form: 11508,
        table_name: 'x_srt_email',
        table_id_column: 'srt_email_id',
        table_pk: 'tsrt_email_id',
        is_special: true,
        instant_push_bf_id: -1,
        // instant_push_bf_param: ''
    },
    // GENERAL NOTE
    1136: {
        draft_form: 10091,
        submit_form: 10091,
        table_name: 'x_general_note',
        table_id_column: 'general_note_id',
        table_pk: 'tgeneral_note_id',
        is_special: true,
        instant_push_bf_id: -1,
        // instant_push_bf_param: ''
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
        instant_push_bf_id: 2799,
        instant_push_bf_param: 'xhedis_id'
    },
    // MULTIPLE MCA
    'hybrid': {
        draft_form: 11965,
        submit_form: 11975,
        table_name: 'x_hybrid_mca',
        table_id_column: 'hybrid_mca_id',
        table_pk: 'thybrid_mca_id',
        instant_push_bf_id: 2784,
        instant_push_bf_param: 'xmultiple_id'
    }
}

// var downloadInterRAIFile = function (filename, encoded_pdf) {
//     var exportedFilename = filename + '.pdf';
//     const byteCharacters = atob(encoded_pdf);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     var blob = new Blob([byteArray], { type: 'application/pdf' });
//     if (navigator.msSaveBlob) {
//         navigator.msSaveBlob(blob, exportedFilename)
//     } else {
//         var link = document.createElement("a");
//         if (link.download !== undefined) {
//             var url = URL.createObjectURL(blob);
//             link.setAttribute("href", url);
//             link.setAttribute("download", exportedFilename);
//             link.style.visibility = 'hidden';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     }
// }

function getDownloadButton(row) {
    if (row.md5) {
        return _(Button, {
            color: 'primary', title: 'Download', key: row.mca_id + '_download',
            onClick: () => {
                toastr.info('Retrieving the PDF file.')
                iwb.request({
                    url: 'ajaxExecDbFunc?_did=2553',
                    params: {
                        id: row.mca_id,
                        table_name: activity_map[row.lkp_activity].table_name
                    },
                    successCallback: (res) => {
                        const encoded_pdf = res.result.encoded_pdf;
                        if (encoded_pdf === '' || encoded_pdf === null) {
                            toastr.error('Something went wrong, there is no pdf file.')
                        } else {
                            var exportedFilename = row.filename + '.pdf';
                            const byteCharacters = atob(res.result.encoded_pdf);
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
                    }
                });
            }
        }, _("span", { className: "icon-cloud-download" }))
    }
}
var editButton = (row) => {
    if (activity_map[row.lkp_activity]) {
        var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
        var form_id = activity_map[lkp_activity].draft_form;
        var pk = activity_map[lkp_activity].table_pk;
        var id = row.mca_id;
        var className = "icon-pencil";
        var color = "warning";

        var url = 'showForm?a=1&_fid=' + form_id + '&' + pk + '=' + id + "&view=1";

        // IF YOU WANT TO ADD EXTRA URL PARAMETERS FOR YOUR CASE
        // PLEASE, ADD BELOW THIS LINE AND DO AS SHOWN IN THE CASES ABOVE

        // if Choice Froms (FOC,PHI,SPC)
        if (activity_map[lkp_activity].is_special) {
            url += '&xlkp_mca_status=1';
        }

        // if HEDIS we change icon
        if (form_id == 12607) {
            className = "icon-magnifier";
            color = "primary";
        }
        return _(Button,
            {
                color: color,
                title: getLocMsg("edit"),
                key: id + '_edit',
                onClick: () => {
                    //IF HEDIS
                    if (form_id == 12607) {
                        url += '&view=1';
                    }
                    iwb.openTab("2-" + Math.random(), url, {}, { openEditable: true });
                }
            },
            _("span", { className: className })
        );
    }
}
var submitButton = (row) => {
    var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
    var form_id = activity_map[lkp_activity].submit_form;
    var pk = activity_map[lkp_activity].table_pk;
    var id = row.mca_id;
    var url = 'showForm?a=1&_fid=' + form_id + '&' + pk + '=' + id;

    // if UNSUCCESSFUL
    if (form_id * 1 == 10717) {
        url += '&imemberrefusal=1'
    }
    // IF YOU WANT TO ADD EXTRA URL PARAMETERS FOR YOUR CASE
    // PLEASE, ADD BELOW THIS LINE AND DO AS SHOWN IN THE CASES ABOVE

    // if Choice Froms (FOC,PHI,SPC)
    if (activity_map[lkp_activity].is_special) {
        url += '&xlkp_mca_status=8';
    }

    return _(Button,
        {
            color: 'primary',
            title: 'Submit',
            key: id + '_submit',
            onClick: () => {
                iwb.openTab("2-" + Math.random(), url, {}, { openEditable: true });
            }
        },
        'Submit'
    );
}
var viewButton = (row) => {
    var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
    var form_id = activity_map[lkp_activity].submit_form;
    var pk = activity_map[lkp_activity].table_pk;
    var id = row.mca_id;

    var url = 'showForm?a=1&_fid=' + form_id + '&' + pk + '=' + id + '&disabled=1&view=1';

    // IF YOU WANT TO ADD EXTRA URL PARAMETERS FOR YOUR CASE
    // PLEASE, ADD BELOW THIS LINE AND DO AS SHOWN IN THE CASES ABOVE

    return _(Button,
        {
            color: 'primary',
            title: 'View',
            key: id + '_view',
            onClick: () => {
                iwb.openTab("1-" + Math.random(), url, {}, { openEditable: true });
            }
        },
        'View'
    );
}
var addButton = (row) => {
    if (activity_map[row.lkp_activity]) {
        var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
        var form_id = activity_map[lkp_activity].draft_form;
        var pk = activity_map[lkp_activity].table_pk;
        var npo_id = row.npo_id;
        var url = 'showForm?a=2&viewMode=true&_fid=' + form_id
            + '&ilkp_participant_type=1&ilkp_activity_type=2&iparticipant_id=' + npo_id;

        if ([1135].indexOf(lkp_activity) !== -1) {
            url += '&xlkp_reason_for_contact=11';
        }
        if (lkp_activity == 1137) {
            url += '&xlkp_contact_method=1';
        }
        if ([11290, 11292, 11291].indexOf(form_id) !== -1) {
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
        console.log("fid: " + form_id, "lkp_activity: " + lkp_activity, "npo_id: " + npo_id)

        return _(Button, {
            color: 'primary',
            title: 'Add ',
            key: lkp_activity + '_add',
            onClick: () => {
                iwb.openTab("2-" + Math.random(), url, {}, { openEditable: true });
            }
        }, _('i', { className: 'icon-plus' }))
    }
}
var deleteButton = (row) => {
    // WE SHOW DELETE BUTTON IF ONLY THE USER HAS PERMISSION TO DELETE
    // FOLLOW THE CODE BELOW TO UNDERSTAND WHAT WE MEAN
    if (row.delete_flag && 1 * row.delete_flag > 0) {
        var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
        var form_id = activity_map[lkp_activity].submit_form;
        var pk = activity_map[lkp_activity].table_pk;
        var id = row.mca_id;
        var url = 'ajaxPostForm?a=3&_fid=' + form_id + '&' + pk + '=' + id;
        return _(
            Button, {
            title: getLocMsg("Delete"),
            key: row.service_verification_id + '_delete',
            color: 'danger',
            onClick: event => {
                event && event.preventDefault && event.preventDefault();
                yesNoDialog({
                    text: _("h6", { style: { color: "black", fontWeight: "bold" } }, "YOU ARE ABOUT TO DELETE A RECORD. ARE YOU SURE?"),
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
}
var reviewPdf = (row) => {
    // WE SHOW REVIEW BUTTON IF ONLY THE USER HAS PERMISSION TO REVIEW THE PDF
    // FOLLOW THE CODE BELOW TO UNDERSTAND WHAT WE MEAN
    if (row.md5 && row.review_flag && 1 * row.review_flag > 0) {
        var form_id = 11863;
        var npo_id = row.npo_id;
        var filename = row.filename;
        var lkp_activity = row.lkp_activity;
        var mca_id = row.mca_id;
        var review_status = row.review_status;
        var dsc = 'Review PDF';
        var url = 'showForm?a=2&_fid=' + form_id + '&xparticipant_id=' + npo_id + '&xfilename=' + filename +
            '&xlkp_activity=' + lkp_activity + '&xmca_id=' + mca_id;

        if (1 * review_status === 1 || 1 * review_status === 3 || 1 * review_status === 26) {
            dsc = "Approved PDF";
            url += "&xreview=" + review_status;
        }

        return _(Button,
            {
                color: 'primary',
                title: dsc,
                key: mca_id + '_review',
                onClick: () => {
                    iwb.openTab("1-" + Math.random(), url, {}, { openEditable: true });
                }
            },
            dsc
        );
    }
}
var reupload = (row) => {
    return _(Button,
        {
            color: 'primary',
            title: 'Reupload',
            key: row.mca_id + '_reupload',
            onClick: () => {
                iwb.request({
                    url: 'ajaxExecDbFunc?_did=2421',
                    params: {
                        table_name: activity_map[row.lkp_activity].table_name,
                        id_field: activity_map[row.lkp_activity].table_id_column,
                        id: row.mca_id
                    },
                    successCallback: function (res) {
                        grd_compliance_4npo.cmp.loadData(true);
                    }
                });
            }
        }, _('i', { className: 'icon-reload' }))
}
var authorizeServices = (row) => {
    if (row.lkp_compliant != null && 1 * row.lkp_compliant == 9999) {
        return _(Button,
            {
                color: 'primary',
                title: 'View', onClick: () => {
                    iwb.openTab("1-" + Math.random(), 'showForm?a=1&_fid=8062&tactivity_id=' +
                        row.activity_id, {}, { openEditable: true });
                }
            }, _('i', { className: 'icon-eye' }))
    }
    var link = 'showForm?a=2&_fid=12184&xparticipant_id=' + row.npo_id;
    return _(Button,
        {
            color: 'primary',
            title: 'Add ' + row.lkp_activity, onClick: () => {
                iwb.openTab("1-" + Math.random(), link, {}, { openEditable: true });
            }
        }, _('i', { className: 'icon-plus' }));

}
var instantPush = (row) => {
    if (activity_map[row.lkp_activity]) {
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

                                    grd_compliance_4npo.cmp.loadData(true);
                                } else if (res.result.code == 0) {
                                    toastr.info(res.result.msg);
                                    grd_compliance_4npo.cmp.loadData(true);
                                }
                            }
                        });
                    }
                },
                _("span", { className: "fas2 fa-arrow-up" })
            );
        }
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