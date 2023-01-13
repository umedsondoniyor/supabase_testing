var activity_map = {
    // MONTHLY CONTACT
    3: {
        draft_form: 10509,
        submit_form: 10610,
        table_name: 'x_monthly_contact_autosave',
        table_id_column: 'monthly_contact_autosave_id',
        table_pk: 'tmonthly_contact_autosave_id',
        instant_push_bf_id: -1
    },
    // WELCOME CALL
    164: {
        draft_form: 10669,
        submit_form: 10670,
        table_name: 'x_welcome_call_autosave',
        table_id_column: 'welcome_call_autosave_id',
        table_pk: 'twelcome_call_autosave_id',
        instant_push_bf_id: 2785,
        instant_push_bf_param: 'xwelcome_call_id'
    },
    // UNSUCCESSFUL WELCOME CALL
    165: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // UNSUCCESSFUL 7-14 FOLLOW UP CALL
    169: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // 7-14 FOLLOW UP CALL
    170: {
        draft_form: 10627,
        submit_form: 10628,
        table_name: 'x_seven_or_fourteen_day_follow_autosave',
        table_id_column: 'seven_or_fourteen_day_follow_autosave_id',
        table_pk: 'tseven_or_fourteen_day_follow_autosave_id',
        instant_push_bf_id: 2800,
        instant_push_bf_param: 'x_seven_fourteen_id'
    },
    // NEW MEMBER ORIENTATION
    183: {
        draft_form: 10730,
        submit_form: 10731,
        table_name: 'x_new_member_orientation_autosave',
        table_id_column: 'new_member_orientation_autosave_id',
        table_pk: 'tnew_member_orientation_autosave_id',
        instant_push_bf_id: 2764,
        instant_push_bf_param: 'xnmo_id'
    },
    // UNSUCCESSFUL NEW MEMBER ORIENTATION
    184: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // UNSUCCESSFUL CONTACT
    1103: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunscheduled_id'
    },
    // UNSCHEDULED CONTACT
    1110: {
        draft_form: 10723,
        submit_form: 10724,
        table_name: 'x_unscheduled_contact_autosave',
        table_id_column: 'unscheduled_contact_autosave_id',
        table_pk: 'tunscheduled_contact_autosave_id',
        instant_push_bf_id: 2793,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // QUARTERLY CONTACT
    1112: {
        draft_form: 10718,
        submit_form: 10719,
        table_name: 'x_quarterly_contact_autosave',
        table_id_column: 'quarterly_contact_autosave_id',
        table_pk: 'tquarterly_contact_autosave_id',
        instant_push_bf_id: 2743,
        instant_push_bf_param: 'xquarterly_contact_autosave_id'
    },
    // ANNUAL CONTACT
    1113: {
        draft_form: 10725,
        submit_form: 10726,
        table_name: 'x_annual_contact_autosave',
        table_id_column: 'annual_contact_autosave_id',
        table_pk: 'tannual_contact_autosave_id',
        instant_push_bf_id: 2744,
        instant_push_bf_param: 'xannual_contact_autosave_id'
    },
    // UNSUCCESSFUL QUARTERLY
    1114: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // UNSUCCESSFUL MONTHLY CONTACT
    1120: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // UNSUCCESSFUL ANNUAL CONTACT
    1121: {
        draft_form: 10716,
        submit_form: 10717,
        table_name: 'x_unsuccessful_contact_autosave',
        table_id_column: 'unsuccessful_contact_autosave_id',
        table_pk: 'tunsuccessful_contact_autosave_id',
        is_unsuccessful_contact: true,
        instant_push_bf_id: 2752,
        instant_push_bf_param: 'xunsuccessful_contact_autosa_id'
    },
    // HRA
    1130: {
        draft_form: 11164,
        submit_form: 11165,
        table_name: 'x_hra_assessment_autosave',
        table_id_column: 'hra_assessment_autosave_id',
        table_pk: 'thra_assessment_autosave_id',
        instant_push_bf_id: 2822,
        instant_push_bf_param: 'xhra_id'
    },
    // SRT
    1131: {
        draft_form: 11166,
        submit_form: 11167,
        table_name: 'x_srt_assessment_autosave',
        table_id_column: 'srt_assessment_autosave_id',
        table_pk: 'tsrt_assessment_autosave_id',
        instant_push_bf_id: 2721,
        instant_push_bf_param: 'xsrt_assessment_autosave_id'
    },
    // PCSP
    1140: {
        draft_form: 11306,
        submit_form: 11307,
        table_name: 'x_pcsp_autosave',
        table_id_column: 'pcsp_autosave_id',
        table_pk: 'tpcsp_autosave_id',
        instant_push_bf_id: -1,
        // instant_push_bf_param: ''
    },
    // FOC
    1146: {
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
    1147: {
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
    1148: {
        draft_form: 11291,
        submit_form: 11291,
        table_name: 'x_service_provider_choice',
        table_id_column: 'service_provider_choice_id',
        table_pk: 'tservice_provider_choice_id',
        is_special: true,
        instant_push_bf_id: 2874,
        instant_push_bf_param: 'xservice_provider_choice_id'
    },
    // INTERRAI
    1149: {
        draft_form: 10816,
        submit_form: 10817,
        table_name: 'x_interrai_autosave',
        table_id_column: 'interrai_autosave_id',
        table_pk: 'tinterrai_autosave_id',
        instant_push_bf_id: 2770,
        instant_push_bf_param: 'xinterrai_autosave_id'
    },
    // SRT EMAIL
    1177: {
        draft_form: 11508,
        submit_form: 11508,
        table_name: 'x_srt_email',
        table_id_column: 'srt_email_id',
        table_pk: 'tsrt_email_id',
        instant_push_bf_id: -1,
        // instant_push_bf_param: ''
    },
    // HEDIS
    1194: {
        draft_form: 12607,
        submit_form: 12607,
        table_name: 'x_hedis',
        table_id_column: 'hedis_id',
        table_pk: 'thedis_id',
        instant_push_bf_id: 2799,
        instant_push_bf_param: 'xhedis_id'
    },
    // TELEPHONIC OUTREACH
    1275: {
        draft_form: 12717,
        submit_form: 12717,
        table_name: 'x_telephonic_outreach',
        table_id_column: 'telephonic_outreach_id',
        table_pk: 'ttelephonic_outreach_id',
        instant_push_bf_id: 2833,
        instant_push_bf_param: 'xtelephonic_id'
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
};

var getDownloadButton = (row) => {
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
        },
            _("span", { className: "icon-cloud-download" })
        );
    }
}

var addButton = (row) => {
    var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
    var form_id = activity_map[lkp_activity].draft_form;
    var pk = activity_map[lkp_activity].table_pk;
    var ptp_id = row.participant_id;
    var url = 'showForm?a=2&viewMode=true&_fid=' + form_id + '&ilkp_participant_type=2&ilkp_activity_type=2&iparticipant_id=' + ptp_id;

    // if HEDIS
    if (lkp_activity == 1194) {
        url += '&xlkp_mca_status=2';
    }
    // if UNSUCCESSFUL
    if (form_id == 10716) {
        url += '&imemberrefusal=1';
    }
    // if MULTIPLE MCA
    if (form_id == 11965) {
        url += '&xencounter_dt=' + row.calculated_due_dt;
    }
    // IF YOU WANT TO ADD EXTRA URL PARAMETERS FOR YOUR CASE
    // PLEASE, ADD BELOW THIS LINE AND DO AS SHOWN IN THE CASES ABOVE

    // if Choice Froms (FOC,PHI,SPC)
    if (activity_map[lkp_activity].is_special) {
        url += '&xlkp_mca_status=1';
    }
    // if TELEPHONIC OUTREACH
    if (lkp_activity == 1275) {
        url += '&xlkp_mca_status=2';
    }

    return _(Button,
        {
            color: 'primary',
            title: 'Add',
            key: lkp_activity + '_add',
            onClick: () => {
                iwb.openTab("2-" + Math.random(), url, {}, { openEditable: true });
            }
        },
        _('i', { className: 'icon-plus' })
    );
}

var editButton = (row) => {
    var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
    var form_id = activity_map[lkp_activity].draft_form;
    var pk = activity_map[lkp_activity].table_pk;
    var id = row.mca_id;

    var url = 'showForm?a=1&_fid=' + form_id + '&' + pk + '=' + id + "&view=1";

    // IF YOU WANT TO ADD EXTRA URL PARAMETERS FOR YOUR CASE
    // PLEASE, ADD BELOW THIS LINE AND DO AS SHOWN IN THE CASES ABOVE

    // if Choice Froms (FOC,PHI,SPC)
    if (activity_map[lkp_activity].is_special) {
        url += '&xlkp_mca_status=1';
    }

    return _(Button,
        {
            color: 'warning',
            title: getLocMsg("edit"),
            key: id + '_edit',
            onClick: () => {
                iwb.openTab("2-" + Math.random(), url, {}, { openEditable: true });
            }
        },
        _("span", { className: 'icon-pencil' })
    );
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
                                iwb.closeTab(event, success);
                                grd_phw_compliance4par.cmp.loadData(true);
                            }
                        })
                });
            }
        },
            _("span", { className: "icon-trash" })
        );
    }
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

var reupload = (row) => {
    var lkp_activity = row.hybrid ? 'hybrid' : row.lkp_activity;
    return _(Button,
        {
            color: 'primary',
            title: 'Reupload',
            key: row.mca_id + '_reupload',
            onClick: () => {
                iwb.request({
                    url: 'ajaxExecDbFunc?_did=2421',
                    params: {
                        table_name: activity_map[lkp_activity].table_name,
                        id_field: activity_map[lkp_activity].table_id_column,
                        id: row.mca_id
                    },
                    successCallback: function (res) {
                        grd_phw_compliance4par.cmp.loadData(true);
                    }
                });
            }
        },
        _('i', { className: 'icon-reload' })
    );
}

var reviewPdf = (row) => {
    // WE SHOW REVIEW BUTTON IF ONLY THE USER HAS PERMISSION TO REVIEW THE PDF
    // FOLLOW THE CODE BELOW TO UNDERSTAND WHAT WE MEAN
    if (row.md5 && row.review_flag && 1 * row.review_flag > 0) {
        var form_id = 11863;
        var ptp_id = row.participant_id;
        var filename = row.filename;
        var lkp_activity = row.lkp_activity;
        var mca_id = row.mca_id;
        var review_status = row.review_status;
        var dsc = 'Review PDF';
        var url = 'showForm?a=2&_fid=' + form_id + '&xparticipant_id=' + ptp_id + '&xfilename=' + filename + '&xlkp_activity=' + lkp_activity + '&xmca_id=' + mca_id;

        if (1 * review_status === 1 || 1 * review_status === 26) {
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

var viewServiceRequest = (id) => {
    var url = 'showForm?a=1&_fid=9625&disabled=1&tservice_request_id=' + id;
    return _(Button,
        {
            color: 'yellow',
            title: 'Service Request',
            key: id + '_service_request',
            onClick: () => {
                iwb.openTab("1-" + Math.random(), url, {}, { openEditable: true });
            }
        },
        _('i', { className: 'icon-link' })
    );
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

var complianceStatus = (row) => {
    if (row.attempts != null && 1 * row.attempts > 0) {
        return _('span', { className: 'badge badge-pill badge-secondary' }, row.attempts + ' Attempt(s)');
    }
    if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant != -9999 && 1 * row.lkp_compliant != -8888 && 1 * row.lkp_compliant != -777777) {
        return _('div', {},
            _('span', { className: 'badge badge-pill badge-warning' }, 'Due within ' + (-1 * row.lkp_compliant) + ' days'),
            ' ',
            row.lkp_activity == 1112 ?
                row.contact_method_type && row.contact_method_type * 1 == 1 ?
                    _('span', { className: 'badge badge-pill badge-danger' }, row.insert_user_id ? 'Completed Face to Face' : 'Planned Face to Face') :
                    _('span', { className: 'badge badge-pill badge-success' }, 'Options are available')
                : ''
        );
    }
    else if (1 * row.lkp_compliant == 111111) return _('span', { className: 'badge badge-pill badge-secondary' }, 'Optional');
    else if (1 * row.lkp_compliant == 111112) return _('span', { className: 'badge badge-pill badge-blue' }, 'Support Activity - effects plan date only');
    else if (1 * row.lkp_compliant == 9999) return _('span', { className: 'badge badge-pill badge-success' }, 'Compliant');
    else if (1 * row.lkp_compliant == 8888) return _('span', { className: 'badge badge-pill badge-primary' }, 'Submitted after due date');
    else if (1 * row.lkp_compliant > 0 && 1 * row.lkp_compliant != 9999 && 1 * row.lkp_compliant != 8888) {
        return _('div', {}, _('span', { className: 'badge badge-pill badge-danger' }, 1 * row.lkp_compliant + ' days past due'),
            ' ',
            row.lkp_activity == 1112 ?
                row.contact_method_type && row.contact_method_type * 1 == 1 ?
                    _('span', { className: 'badge badge-pill badge-danger' }, row.insert_user_id ? 'Completed Face to Face' : 'Planned Face to Face') :
                    _('span', { className: 'badge badge-pill badge-success' }, 'Contact method type : others')
                : ''
        );
    }
    else if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant == -9999) return _('span', { className: 'badge badge-pill badge-danger' }, 'Missing Dates');
    else if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant == -8888) return _('span', { className: 'badge badge-pill badge-secondary' }, 'Activity not submitted');
    else if (1 * row.lkp_compliant < 0 && 1 * row.lkp_compliant == -777777) return _('span', { className: 'badge badge-pill badge-warning' }, 'Participant is not listed in PAHW Report');
    else if (row.lkp_compliant != '' && 1 * row.lkp_compliant == 0) return _('span', { className: 'badge badge-pill badge-warning' }, 'Due today');
    else return '';
}