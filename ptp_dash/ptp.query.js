var result = [];
var changed_to_pahw = false;
var mco_change_dt = null;
var mco_changes = [];
var participant = $.getTableJSON("x_participant", xparticipant_id);
if (xnpo_id != null) {
    //var pnpo = $.sqlQuery("select p.participant_id from x_participant p where p.npo_ids::integer=${req.xnpo_id}", { xnpo_id: xnpo_id });
    var pnpo = $.sqlQuery("select p.participant_id from x_participant p where p.npo_ids like '${req.xnpo_id}'", { xnpo_id: xnpo_id });
    xparticipant_id = pnpo[0].participant_id;
    participant = $.getTableJSON("x_participant", xparticipant_id);
}
var xmedicaid_num = participant.get("medicaid_num");
var mco_list = $.sqlQuery("select e.mco_id,to_char(date_trunc('month',e.eligibility_dt),'MM/DD/YYYY') dt " +
    "from x_eligibility e where e.medicaid_num=lpad('${req.xmedicaid_num}',10,'0') " +
    "and current_date - '120 days'::interval <= e.eligibility_dt group by e.mco_id, dt order by dt asc", { xmedicaid_num: xmedicaid_num });

if (mco_list != null) {
    var temp = mco_list[0].mco_id;
    for (var c = 1; c < mco_list.length; c++) {
        if (1 * mco_list[c].mco_id != 1 * temp && 1 * mco_list[c].mco_id == 3) {
            temp = mco_list[c].mco_id;
            mco_changes.push({ mco: 3, dt: mco_list[c].dt });
        }
        if (1 * mco_list[c].mco_id != 1 * temp && 1 * mco_list[c].mco_id == 2) {
            temp = mco_list[c].mco_id;
            mco_changes.push({ mco: 2, dt: mco_list[c].dt });
        }
    }
}

if (mco_changes.length != 0) {
    var latest_mco_change = mco_changes.pop();
    if (latest_mco_change.mco == 3) {
        changed_to_pahw = true;
        mco_change_dt = latest_mco_change.dt;
    }
}

// /* Unscheduled MCA for OPS 8 */
// var ops8 = $.sqlQuery("select to_char((upload_dttm::date + '4 day'::interval)::date,'MM/DD/YYYY') due_dt, to_char(upload_dttm::date,'MM/DD/YYYY') upload_dt, " +
//     " (-1*((upload_dttm::date + '4 day'::interval)::date - current_date)) due from x_ops8_report where upload_dttm::timestamp=(select max(y.upload_dttm::timestamp) from x_ops8_report y)" +
//     " and (current_date-upload_dttm::date) >= 0 and (current_date-upload_dttm::date) < 14 and participant_id='${req.xparticipant_id}'::integer limit 1",
//     { xparticipant_id: xparticipant_id });

// if (ops8 != null) {
//     var lkp_compliant = null;
//     var activity_dt = '';
//     var activity_id = null;

//     var mca = $.sqlQuery("SELECT lkp_mca_status, unscheduled_contact_autosave_id as id FROM x_unscheduled_contact_autosave WHERE " +
//         " participant_id='${req.xparticipant_id}'::integer and lkp_participant_type=2 AND (encounter_dt::date-'${req.upload_dt}'::date) >= 0 and (encounter_dt::date-'${req.upload_dt}'::date) < 14 " +
//         " order by insert_dttm::date desc limit 1",
//         { xparticipant_id: xparticipant_id, upload_dt: ops8[0].upload_dt });

//     var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id, a.insert_user_id" +
//         " from x_activity a where a.lkp_activity in (1110,1112,3,1113) " +
//         " AND a.participant_id='${req.xparticipant_id}'::integer and " +
//         "a.activity_date <= '${req.to_dt}'::date " +
//         "and a.activity_date >= '${req.upload_dt}'::date " +
//         "order by a.activity_date desc limit 1",
//         {
//             xparticipant_id: xparticipant_id,
//             to_dt: ops8[0].due_dt, upload_dt: ops8[0].upload_dt
//         });
//     var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id, a.insert_user_id" +
//         " from x_activity a where a.lkp_activity in (1110,1112,3,1113) " +
//         " AND a.participant_id='${req.xparticipant_id}'::integer and " +
//         "a.activity_date > '${req.dt}'::date " +
//         "and a.activity_date <= current_date " +
//         "order by a.activity_date desc limit 1",
//         { xparticipant_id: xparticipant_id, dt: ops8[0].due_dt });

//     if (a != null && late == null) {
//         lkp_compliant = 9999;
//         activity_id = a[0].activity_id;
//         if (a[0].dt != null) {
//             activity_dt = a[0].dt;
//             insert_user_id = a[0].insert_user_id;
//         }
//     }
//     if (a == null && late != null) {
//         lkp_compliant = 8888;
//         calculated_due_dt = ops8[0].due_dt;
//         activity_id = late[0].activity_id;
//         if (late[0].dt != null) {
//             activity_dt = late[0].dt;
//             insert_user_id = late[0].insert_user_id;
//         }
//     }
//     if (a == null && late == null) {
//         lkp_compliant = ops8[0].due;
//         calculated_due_dt = ops8[0].due_dt;
//     }

//     result.push({
//         lkp_activity: 1110,
//         lkp_compliant: lkp_compliant,
//         calculated_due_dt: calculated_due_dt,
//         activity_dt: activity_dt,
//         attempts: attempts,
//         last_attempt_dt: '',
//         insert_user_id: insert_user_id,
//         participant_id: xparticipant_id,
//         mca_id: mca != null ? mca[0].id : null,
//         lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
//         last_mca_completed: null,
//         last_mca_completed_dt: '',
//         last_mca_completed_by: null,
//         mco_id: xpayer_id,
//         activity_id: activity_id,
//         md5: null,
//         filename: null,
//     });
// }

//2022 03 June - Omneya want this feature back.
var listed_in_phw_report = $.sqlQuery("select 1 from x_phw_comlpiance_report x where x.medicaid_num=lpad('${req.xmedicaid_num}',10,'0') " +
    " and x.upload_dttm::timestamp=(select  y.upload_dttm::timestamp from c00140_c21f2863_4bc8_40dd_85bd_51b4c49cefd0.x_phw_comlpiance_report y " +
    " where y.phw_comlpiance_report_id =(select max(tt.phw_comlpiance_report_id)  from c00140_c21f2863_4bc8_40dd_85bd_51b4c49cefd0.x_phw_comlpiance_report tt ))", { xmedicaid_num: xmedicaid_num });
if (listed_in_phw_report == null) {
    result.push({
        lkp_activity: null,
        lkp_activity_frequency: null,
        lkp_compliant: -777777
    });
    return result;
}

var comp = $.sqlQuery("SELECT x.*, to_char(x.due_dt,'MM/DD/YYYY') fmt_due_dt FROM x_compliance_activity x where x.payer_id=${req.xpayer_id} " +
    "and x.npo_flag=0 and exists(select 1 from def_activity d where d.def_activity_id=x.lkp_activity and d.lkp_activity_type=1) " +
    "and ${req.xwaiver_id}::integer in (select q.satir::integer from iwb.tool_parse_numbers(x.waiver_ids,',') q)" +
    " order by x.compliance_activity_id asc",
    { xpayer_id: xpayer_id, xwaiver_id: xwaiver_id });

if (comp == null) {
    return result;//throw new Error('Please correct MCO and/or Waiver info.');
}


var annualTimeWindow = $.sqlQuery("SELECT  (case when x.completed_flag=1 then current_date-completed_dt else current_date-planned_dt end)  as due," +
    "(case when x.completed_flag=1 then (current_date-add_business_day(completed_dt,2)) else (current_date-add_business_day(planned_dt,2)) end)  as required_due," +
    "(case when x.completed_flag=1 then to_char(add_business_day(completed_dt,2),'MM/DD/YYYY') else to_char(add_business_day(planned_dt,2),'MM/DD/YYYY') end) as required_dt," +
    "completed_dt-planned_dt as late," +
    "(case when x.completed_flag=1 then to_char(completed_dt,'MM/DD/YYYY') else to_char(planned_dt,'MM/DD/YYYY') end) as completed_from_dt," +
    "x.* FROM ltss_compliance_schedule x " +
    "where x.participant_type=${req.xparticipant_type} " +
    "and x.participant_id=${req.xparticipant_id} and x.planned_activity_id=1113 and current_date between x.visibility_start_dt and x.visibility_end_dt ;",
    { xparticipant_type: 2, xparticipant_id: xparticipant_id });

for (var i = 0; i < comp.length; i++) {

    var lkp_compliant = null;
    var calculated_due_dt = '';
    var activity_dt = '';
    var insert_user_id = null;
    var dependent_dt = null;
    var annual_npo_dt = null;
    var show = true;
    var mca = null;
    var last_mca_completed = null;
    var last_mca_completed_dt = null;
    var last_mca_completed_by = null;
    var pahw = null;


    /* New PAHW Quarterly Visit */
    if (1 * comp[i].lkp_activity == 1112) {

        var compliancePlan = $.sqlQuery("SELECT  current_date-planned_dt as due,completed_dt-planned_dt as late,x.*,to_char(x.completed_dt,'MM/DD/YYYY') fmt_completed_dt,to_char(x.planned_dt,'MM/DD/YYYY') fmt_planned_dt FROM ltss_compliance_schedule x where x.participant_type=${req.xparticipant_type} " +
            "and x.participant_id=${req.xparticipant_id} and x.planned_activity_id=${req.xplanned_activity_id} and current_date between x.visibility_start_dt and x.visibility_end_dt ;",
            { xparticipant_type: 2, xparticipant_id: xparticipant_id, xplanned_activity_id: 1112 });

        // planlanan yada gerçekleşen quarterly mca bul ve göster burada yok ise gösterilmeyecek.//

        if (compliancePlan && compliancePlan.length == 1) {

            calculated_due_dt = compliancePlan[0].completed_flag * 1 == 1 ? compliancePlan[0].fmt_completed_dt : compliancePlan[0].fmt_planned_dt;

            if (compliancePlan[0].completed_flag * 1 == 1) {
                mca = $.sqlQuery("SELECT lkp_mca_status, quarterly_contact_autosave_id as id,insert_user_id FROM x_quarterly_contact_autosave WHERE " +
                    " activity_id=${req.xactivity_id};",
                    { xactivity_id: compliancePlan[0].activity_id });

                insert_user_id = mca[0].insert_user_id;

            } else {
                mca = $.sqlQuery("SELECT lkp_mca_status, quarterly_contact_autosave_id as id,insert_user_id FROM x_quarterly_contact_autosave WHERE " +
                    " participant_id='${req.xparticipant_id}'::integer and lkp_mca_status=1 and lkp_participant_type=2 AND encounter_dt::DATE >= to_date('${req.calculated_due_dt}','MM/DD/YYYY') - INTERVAL '30 DAY' " +
                    " order by insert_dttm::date desc limit 1",
                    { xparticipant_id: xparticipant_id, calculated_due_dt: calculated_due_dt });
                if (mca && mca.length > 0)
                    insert_user_id = mca[0].insert_user_id;
            }




            if (compliancePlan[0].completed_flag * 1 == 1) {
                if (compliancePlan[0].late && compliancePlan[0].late > 0) {
                    //gecikilmiş
                    lkp_compliant = 8888;
                } else {
                    //zamanında yapılmış
                    lkp_compliant = 9999;
                }
                activity_dt = compliancePlan[0].fmt_completed_dt;
            }
            else {
                lkp_compliant = compliancePlan[0].due;
            }



            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: null,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: last_mca_completed,
                last_mca_completed_dt: last_mca_completed_dt,
                last_mca_completed_by: last_mca_completed_by,
                mco_id: xpayer_id,
                quarter_count: compliancePlan[0].same_type_activity_in_row,
                contact_method_type: compliancePlan[0].completed_flag * 1 == 1 ? compliancePlan[0].contact_method_type : compliancePlan[0].planned_contact_method_type
            });

            continue;

        }

    }


    /* New PAHW Annual Visit */
    if (1 * comp[i].lkp_activity == 1113) {

        var compliancePlan = $.sqlQuery("SELECT  current_date-planned_dt as due,completed_dt-planned_dt as late,x.*,to_char(x.completed_dt,'MM/DD/YYYY') fmt_completed_dt," +
            "to_char(x.planned_dt,'MM/DD/YYYY') fmt_planned_dt,to_char(x.visibility_start_dt,'MM/DD/YYYY') fmt_visibility_start_dt FROM ltss_compliance_schedule x where x.participant_type=${req.xparticipant_type} " +
            "and x.participant_id=${req.xparticipant_id} and x.planned_activity_id=${req.xplanned_activity_id} and current_date between x.visibility_start_dt and x.visibility_end_dt ;",
            { xparticipant_type: 2, xparticipant_id: xparticipant_id, xplanned_activity_id: 1113 });

        $.console(compliancePlan);
        // planlanan yada gerçekleşen quarterly mca bul ve göster burada yok ise gösterilmeyecek.//

        if (compliancePlan && compliancePlan.length == 1) {


            calculated_due_dt = compliancePlan[0].completed_flag * 1 == 1 ? compliancePlan[0].fmt_completed_dt : compliancePlan[0].fmt_planned_dt;
            calculated_from_dt = compliancePlan[0].fmt_visibility_start_dt;

            if (compliancePlan[0].completed_flag * 1 == 1) {
                if (compliancePlan[0].service_request_id) {
                    mca = $.sqlQuery("SELECT lkp_mca_status,hybrid_mca_id as id,insert_user_id FROM x_hybrid_mca WHERE " +
                        " activity_id=${req.xactivity_id};",
                        { xactivity_id: compliancePlan[0].activity_id });

                    insert_user_id = mca[0].insert_user_id;
                } else {
                    mca = $.sqlQuery("SELECT lkp_mca_status,annual_contact_autosave_id as id,insert_user_id FROM x_annual_contact_autosave WHERE " +
                        " activity_id=${req.xactivity_id};",
                        { xactivity_id: compliancePlan[0].activity_id });
                    insert_user_id = mca[0].insert_user_id;
                }
            } else {
                if (compliancePlan[0].service_request_id) {
                    // If itsa service requested hybrid mca it was planned to be done 14 days later, so needed mca just searched before 14 days.
                    mca = $.sqlQuery("SELECT lkp_mca_status, hybrid_mca_id as id FROM x_hybrid_mca WHERE " +
                        " participant_id='${req.xparticipant_id}'::integer and lkp_participant_type=2 AND lkp_mca_status=1 and encounter_dt::DATE >= to_date('${req.calculated_due_dt}','MM/DD/YYYY') - INTERVAL '14 DAY' " +
                        " order by insert_dttm::date desc limit 1",
                        { xparticipant_id: xparticipant_id, calculated_due_dt: calculated_due_dt });
                } else {
                    mca = $.sqlQuery("SELECT lkp_mca_status, annual_contact_autosave_id as id FROM x_annual_contact_autosave WHERE " +
                        " participant_id='${req.xparticipant_id}'::integer and lkp_participant_type=2 AND lkp_mca_status=1 and encounter_dt::DATE >= to_date('${req.calculated_due_dt}','MM/DD/YYYY') - INTERVAL '60 DAY' " +
                        " order by insert_dttm::date desc limit 1",
                        { xparticipant_id: xparticipant_id, calculated_due_dt: calculated_due_dt });
                }
            }

            var service_request_type = null;
            var lkp_critical_incident_type = null;
            var lkp_area = null;
            // Here we get Service Request type
            if (compliancePlan[0].service_request_id) {
                var temp_sr = $.sqlQuery("select lkp_type, lkp_critical_incident_type, lkp_area from x_service_request where service_request_id=${req.xsr_id}", { xsr_id: 1 * compliancePlan[0].service_request_id });
                if (temp_sr && temp_sr.length > 0) {
                    var sr_type_map = { 0: "Service Request", 1: "Incident" };
                    if (temp_sr[0].lkp_type) {
                        service_request_type = sr_type_map[1 * temp_sr[0].lkp_type];
                    }
                    if (temp_sr[0].lkp_critical_incident_type) {
                        lkp_critical_incident_type = 1 * temp_sr[0].lkp_critical_incident_type;
                        var combo_text = $.sqlQuery("select iwb.fnc_look_up_detay2('" + _scd.projectId + "',140, 4703, '" + lkp_critical_incident_type + "')");
                        lkp_critical_incident_type = combo_text[0].fnc_look_up_detay2;
                    }
                    if (temp_sr[0].lkp_area) {
                        lkp_area = 1 * temp_sr[0].lkp_area;
                        var combo_text = $.sqlQuery("select iwb.fnc_look_up_detay2('" + _scd.projectId + "',140, 4394, '" + lkp_area + "')");
                        lkp_area = combo_text[0].fnc_look_up_detay2;
                    }
                }
            }

            if (compliancePlan[0].completed_flag * 1 == 1) {
                if (compliancePlan[0].late && compliancePlan[0].late > 0) {
                    //gecikilmiş
                    lkp_compliant = 8888;
                } else {
                    //zamanında yapılmış
                    lkp_compliant = 9999;
                }
                activity_dt = compliancePlan[0].fmt_completed_dt;
            }
            else {
                lkp_compliant = compliancePlan[0].due;
            }

            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: null,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: last_mca_completed,
                last_mca_completed_dt: last_mca_completed_dt,
                last_mca_completed_by: last_mca_completed_by,
                mco_id: xpayer_id,
                service_request_id: compliancePlan[0].service_request_id,
                service_request_type: service_request_type,
                lkp_critical_incident_type: lkp_critical_incident_type,
                lkp_area: lkp_area
            });

            if (compliancePlan[0].completed_flag * 1 != 1) {

                // Reschedule visit option and Member Refusal options will be available.

                // Reschedule Visit Item
                var lkp_compliant = null;
                var activity_dt = '';
                var activity_id = null;

                var mca = $.sqlQuery("SELECT lkp_mca_status, unscheduled_contact_autosave_id as id FROM x_unscheduled_contact_autosave WHERE " +
                    " participant_id='${req.xparticipant_id}'::integer and lkp_participant_type=2 " +
                    " and (encounter_dt::date) >= '${req.upload_dt}'::date " +
                    " and (encounter_dt::date) <= '${req.to_dt}'::date " +
                    " order by insert_dttm::date desc limit 1",
                    { xparticipant_id: xparticipant_id, to_dt: calculated_due_dt, upload_dt: calculated_from_dt });

                var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id, a.insert_user_id" +
                    " from x_activity a where a.lkp_activity=1110 " +
                    " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                    "a.activity_date <= '${req.to_dt}'::date " +
                    "and a.activity_date >= '${req.upload_dt}'::date " +
                    "order by a.activity_date desc limit 1",
                    {
                        xparticipant_id: xparticipant_id,
                        to_dt: calculated_due_dt, upload_dt: calculated_from_dt
                    });

                var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id, a.insert_user_id" +
                    " from x_activity a where a.lkp_activity=1110 " +
                    " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                    "a.activity_date > '${req.dt}'::date " +
                    "and a.activity_date <= current_date " +
                    "order by a.activity_date desc limit 1",
                    { xparticipant_id: xparticipant_id, dt: calculated_due_dt });

                lkp_compliant = 111112;

                if (a != null && late == null) {
                    // lkp_compliant = 9999;
                    activity_id = a[0].activity_id;
                    if (a[0].dt != null) {
                        activity_dt = a[0].dt;
                        insert_user_id = a[0].insert_user_id;
                    }
                }

                if (a == null && late != null) {
                    // lkp_compliant = 8888;
                    calculated_due_dt = calculated_due_dt;
                    activity_id = late[0].activity_id;
                    if (late[0].dt != null) {
                        activity_dt = late[0].dt;
                        insert_user_id = late[0].insert_user_id;
                    }
                }

                if (a == null && late == null) {
                    // lkp_compliant = compliancePlan[0].due;
                    calculated_due_dt = calculated_due_dt;
                }

                result.push({
                    lkp_activity: 1110,
                    lkp_compliant: lkp_compliant,
                    calculated_due_dt: calculated_due_dt,
                    activity_dt: activity_dt,
                    attempts: attempts,
                    last_attempt_dt: '',
                    insert_user_id: insert_user_id,
                    participant_id: xparticipant_id,
                    mca_id: mca != null ? mca[0].id : null,
                    lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                    last_mca_completed: null,
                    last_mca_completed_dt: '',
                    last_mca_completed_by: null,
                    mco_id: xpayer_id,
                    activity_id: activity_id,
                    md5: null,
                    filename: null,
                });



                // Member Refusal Item
                var lkp_compliant = null;
                var activity_dt = '';
                var activity_id = null;

                var mca = $.sqlQuery("SELECT lkp_mca_status, unsuccessful_contact_autosave_id as id FROM x_unsuccessful_contact_autosave WHERE " +
                    " participant_id='${req.xparticipant_id}'::integer and lkp_participant_type=2 " +
                    " and lkp_reason_for_contact=5 and lkp_reason_unsuccess_contact=10 " +
                    " and (encounter_dt::date) >= '${req.upload_dt}'::date " +
                    " and (encounter_dt::date) <= '${req.to_dt}'::date " +
                    " order by insert_dttm::date desc limit 1",
                    { xparticipant_id: xparticipant_id, to_dt: calculated_due_dt, upload_dt: calculated_from_dt });

                var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id, a.insert_user_id" +
                    " from x_activity a where a.lkp_activity=1103 " +
                    " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                    "a.activity_date <= '${req.to_dt}'::date " +
                    "and a.activity_date >= '${req.upload_dt}'::date " +
                    "order by a.activity_date desc limit 1",
                    {
                        xparticipant_id: xparticipant_id,
                        to_dt: calculated_due_dt, upload_dt: calculated_from_dt
                    });

                var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id, a.insert_user_id" +
                    " from x_activity a where a.lkp_activity=1103 " +
                    " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                    "a.activity_date > '${req.dt}'::date " +
                    "and a.activity_date <= current_date " +
                    "order by a.activity_date desc limit 1",
                    { xparticipant_id: xparticipant_id, dt: calculated_due_dt });

                lkp_compliant = 111112;

                if (a != null && late == null) {
                    // lkp_compliant = 9999;
                    activity_id = a[0].activity_id;
                    if (a[0].dt != null) {
                        activity_dt = a[0].dt;
                        insert_user_id = a[0].insert_user_id;
                    }
                }

                if (a == null && late != null) {
                    // lkp_compliant = 8888;
                    calculated_due_dt = calculated_due_dt;
                    activity_id = late[0].activity_id;
                    if (late[0].dt != null) {
                        activity_dt = late[0].dt;
                        insert_user_id = late[0].insert_user_id;
                    }
                }

                if (a == null && late == null) {
                    // lkp_compliant = compliancePlan[0].due;
                    calculated_due_dt = calculated_due_dt;
                }

                result.push({
                    lkp_activity: 1103,
                    lkp_compliant: lkp_compliant,
                    calculated_due_dt: calculated_due_dt,
                    activity_dt: activity_dt,
                    attempts: attempts,
                    last_attempt_dt: '',
                    insert_user_id: insert_user_id,
                    participant_id: xparticipant_id,
                    mca_id: mca != null ? mca[0].id : null,
                    lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                    last_mca_completed: null,
                    last_mca_completed_dt: '',
                    last_mca_completed_by: null,
                    mco_id: xpayer_id,
                    activity_id: activity_id,
                    md5: null,
                    filename: null,
                });
            }

            continue;

        }

    }

    /* InterRAI */
    if (1 * comp[i].lkp_activity == 1149) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var md5 = null;


        if (annualTimeWindow && annualTimeWindow.length == 1) {

            var mca = $.sqlQuery(
                "SELECT x.lkp_mca_status, x.interrai_autosave_id as id, x.md5, x.review_status," +
                "'INTERRAI_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') as filename, " +
                "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
                "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
                "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
                "FROM x_interrai_autosave x, x_participant p " +
                "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and p.participant_id='${req.xparticipant_id}'::integer and x.assessment_ref_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                " order by x.insert_dttm desc limit 1",
                {
                    xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                    xrole_id: _scd.roleId,
                    xuser_id: _scd.userId,
                    xtable_id: 7292
                }
            );

            if (mca) {
                md5 = mca[0].md5 ? mca[0].md5 : null;
            }

            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }

            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: md5,
                filename: mca != null ? mca[0].filename : null,
                review_status: mca != null ? mca[0].review_status : null,
                review_flag: mca != null ? mca[0].review_flag : null,
                instantpush_flag: mca != null ? mca[0].instantpush_flag : null,
                delete_flag: mca != null ? mca[0].delete_flag : null
            });
        } else {
            lkp_compliant = 111111;
        }


    }

    /* PCSP */
    if (1 * comp[i].lkp_activity == 1140) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var md5 = null;


        if (annualTimeWindow && annualTimeWindow.length == 1) {

            var mca = $.sqlQuery(
                "SELECT x.lkp_mca_status, x.pcsp_autosave_id as id, x.md5, x.review_status, " +
                "'PCSP_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') as filename, " +
                "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
                "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
                "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
                "FROM x_pcsp_autosave x, x_participant p " +
                "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and p.participant_id='${req.xparticipant_id}'::integer and x.date_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                " order by x.insert_dttm desc limit 1",
                {
                    xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                    xrole_id: _scd.roleId,
                    xuser_id: _scd.userId,
                    xtable_id: 7558
                }
            );
            if (mca) {
                md5 = mca[0].md5 ? mca[0].md5 : null;
            }

            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id  from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }

            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: md5,
                filename: mca != null ? mca[0].filename : null,
                review_status: mca != null ? mca[0].review_status : null,
                review_flag: mca != null ? mca[0].review_flag : null,
                instantpush_flag: mca != null ? mca[0].instantpush_flag : null,
                delete_flag: mca != null ? mca[0].delete_flag : null
            });
        } else {
            lkp_compliant = 111111;
        }

    }

    /* HEDIS */
    if (1 * comp[i].lkp_activity == 1194) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        if (annualTimeWindow && annualTimeWindow.length == 1) {

            var mca = $.sqlQuery(
                "SELECT x.lkp_mca_status, x.hedis_id as id " +
                "FROM x_hedis x, x_participant p " +
                "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and p.participant_id='${req.xparticipant_id}'::integer and x.encounter_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                " order by x.insert_dttm desc limit 1",
                {
                    xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt
                }
            );

            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: null,
                filename: null,
            });
        } else {
            lkp_compliant = 111111;
        }

    }

    /* TELEPHONIC OUTREACH CONTACT */
    if (1 * comp[i].lkp_activity == 1275) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        if (annualTimeWindow && annualTimeWindow.length == 1) {

            var compliancePlan = $.sqlQuery("SELECT  current_date-planned_dt as due,completed_dt-planned_dt as late,x.*,to_char(x.completed_dt,'MM/DD/YYYY') fmt_completed_dt," +
                "to_char(x.planned_dt,'MM/DD/YYYY') fmt_planned_dt,to_char(x.visibility_start_dt,'MM/DD/YYYY') fmt_visibility_start_dt FROM ltss_compliance_schedule x where x.participant_type=${req.xparticipant_type} " +
                "and x.participant_id=${req.xparticipant_id} and x.planned_activity_id=${req.xplanned_activity_id} and current_date between x.visibility_start_dt and x.visibility_end_dt ;",
                { xparticipant_type: 2, xparticipant_id: xparticipant_id, xplanned_activity_id: 1113 });


            if (compliancePlan && compliancePlan.length > 0 && compliancePlan[0].service_request_id) {

                var current_sr = $.sqlQuery("select * from x_service_request where service_request_id=${req.xsr_id}", { xsr_id: 1 * compliancePlan[0].service_request_id });
                // if Service Request type is "Incident"
                if (current_sr && current_sr.length > 0 && current_sr[0].lkp_type * 1 === 1) {
                    //  if (Unplanned Hospitalization && Discharge Notification) || (Emergency room visit && Incident Area)
                    if (
                        (current_sr[0].lkp_critical_incident_type * 1 === 7 && current_sr[0].lkp_incident_area * 1 === 12) ||
                        (current_sr[0].lkp_critical_incident_type * 1 === 5 && current_sr[0].lkp_incident_area * 1 === 15)
                    ) {
                        var mca = $.sqlQuery(
                            "SELECT x.lkp_mca_status, x.telephonic_outreach_id as id " +
                            "FROM x_telephonic_outreach x, x_participant p " +
                            "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and p.participant_id='${req.xparticipant_id}'::integer and x.encounter_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                            " order by x.insert_dttm desc limit 1",
                            {
                                xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                                completed_dt: annualTimeWindow[0].completed_from_dt
                            }
                        );

                        var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                            " AND a.participant_id='${req.xparticipant_id}'::integer " +
                            " and a.activity_date >= '${req.completed_dt}'::date " +
                            " and a.activity_date <= '${req.to_dt}'::date " +
                            "order by a.activity_date desc limit 1",
                            {
                                xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                                to_dt: annualTimeWindow[0].required_dt,
                                completed_dt: annualTimeWindow[0].completed_from_dt,
                            });
                        var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                            " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                            "a.activity_date > '${req.dt}'::date " +
                            "and a.activity_date <= current_date " +
                            "order by a.activity_date desc limit 1",
                            { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

                        if (a != null && late == null) {
                            lkp_compliant = 9999;
                            activity_id = a[0].activity_id;
                            calculated_due_dt = annualTimeWindow[0].required_dt;
                            if (a[0].dt != null) {
                                activity_dt = a[0].dt;
                                insert_user_id = a[0].insert_user_id;
                            }
                        }
                        if (a == null && late != null) {
                            lkp_compliant = 8888;
                            calculated_due_dt = annualTimeWindow[0].required_dt;
                            activity_id = late[0].activity_id;
                            if (late[0].dt != null) {
                                activity_dt = late[0].dt;
                                insert_user_id = late[0].insert_user_id;
                            }
                        }
                        if (a == null && late == null) {
                            lkp_compliant = annualTimeWindow[0].required_due;
                            calculated_due_dt = annualTimeWindow[0].required_dt;
                        }
                        result.push({
                            lkp_activity: comp[i].lkp_activity,
                            lkp_compliant: lkp_compliant,
                            calculated_due_dt: calculated_due_dt,
                            activity_dt: activity_dt,
                            attempts: attempts,
                            last_attempt_dt: '',
                            insert_user_id: insert_user_id,
                            participant_id: xparticipant_id,
                            mca_id: mca != null ? mca[0].id : null,
                            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                            last_mca_completed: null,
                            last_mca_completed_dt: '',
                            last_mca_completed_by: null,
                            mco_id: xpayer_id,
                            activity_id: activity_id,
                            md5: null,
                            filename: null,
                        });
                    }
                }
            }
        } else {
            lkp_compliant = 111111;
        }
    }

    /* SRT */
    if (1 * comp[i].lkp_activity == 1131) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;



        if (annualTimeWindow && annualTimeWindow.length == 1) {

            var mca = $.sqlQuery(
                "SELECT x.lkp_mca_status, x.srt_assessment_autosave_id as id " +
                "FROM x_srt_assessment_autosave x " +
                "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and x.encounter_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                " order by x.insert_dttm desc limit 1",
                {
                    xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt
                }
            );

            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: null,
                filename: null,
            });
        } else {
            lkp_compliant = 111111;
        }

    }

    /* SRT Email */
    if (1 * comp[i].lkp_activity == 1177) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;



        if (annualTimeWindow && annualTimeWindow.length == 1) {
            var mca = $.sqlQuery(
                "SELECT x.srt_email_id as id " +
                "FROM x_srt_email x " +
                "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and x.activity_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                " order by x.insert_dttm desc limit 1",
                {
                    xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt
                }
            );

            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id  from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: null,
                filename: null,
            });
        } else {
            lkp_compliant = 111111;
        }

    }

    /* HRA */
    if (1 * comp[i].lkp_activity == 1130) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;


        if (annualTimeWindow && annualTimeWindow.length == 1) {

            var mca = $.sqlQuery(
                "SELECT x.lkp_mca_status, x.hra_assessment_autosave_id as id " +
                "FROM x_hra_assessment_autosave x " +
                "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 and x.encounter_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                " order by x.insert_dttm desc limit 1",
                {
                    xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt
                }
            );


            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: mca != null ? mca[0].md5 : null,
                filename: mca != null ? mca[0].filename : null,
            });
        } else {
            lkp_compliant = 111111;
        }

    }

    /* PHI, FOC, SPC */
    if ([1147, 1146, 1148].indexOf(1 * comp[i].lkp_activity) != -1) {
        var choice_forms = { 1147: 'phi', 1146: 'foc', 1148: 'service_provider_choice' }
        var name_schemes = { 'phi': 'PHI', 'foc': 'FOC', 'service_provider_choice': 'SPC' }
        var db_table_id = { 1147: 7541, 1146: 7539, 1148: 7540 }[comp[i].lkp_activity];
        var form_name = choice_forms[comp[i].lkp_activity]
        var filename = name_schemes[form_name]
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var mca = null;
        var md5 = null;

        if (annualTimeWindow && annualTimeWindow.length == 1) {

            if (form_name) {
                mca = $.sqlQuery(
                    "SELECT x." + form_name + "_id as id, x.lkp_mca_status, x.md5, x.review_status," +
                    "case when x.lkp_participant_type=2 then (select '" + filename + "_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') from x_participant p where p.participant_id=x.participant_id) " +
                    "when x.lkp_participant_type=2 then (select '" + filename + "_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') from x_npo p where p.npo_id=x.participant_id) " +
                    "else '' end filename, " +
                    "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
                    "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
                    "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
                    "FROM x_" + form_name + " x " +
                    "WHERE x.participant_id='${req.xparticipant_id}'::integer and x.lkp_participant_type=2 " +
                    " and x.activity_dt between '${req.completed_dt}'::date and '${req.to_dt}'::date " +
                    " order by x.insert_dttm desc limit 1",
                    {
                        xparticipant_id: xparticipant_id, to_dt: annualTimeWindow[0].required_dt,
                        completed_dt: annualTimeWindow[0].completed_from_dt,
                        xrole_id: _scd.roleId,
                        xuser_id: _scd.userId,
                        xtable_id: db_table_id
                    }
                );
            }
            if (mca) {
                md5 = mca[0].md5 ? mca[0].md5 : null;
            }


            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer " +
                " and a.activity_date >= '${req.completed_dt}'::date " +
                " and a.activity_date <= '${req.to_dt}'::date " +
                " order by a.activity_date desc limit 1",
                {
                    xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity,
                    to_dt: annualTimeWindow[0].required_dt,
                    completed_dt: annualTimeWindow[0].completed_from_dt,
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id,a.insert_user_id from x_activity a where a.lkp_activity_type=1 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xparticipant_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xparticipant_id: xparticipant_id, lkp_activity: comp[i].lkp_activity, dt: annualTimeWindow[0].required_dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                    insert_user_id = a[0].insert_user_id;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = annualTimeWindow[0].required_dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                    insert_user_id = late[0].insert_user_id;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = annualTimeWindow[0].required_due;
                calculated_due_dt = annualTimeWindow[0].required_dt;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: attempts,
                last_attempt_dt: '',
                insert_user_id: insert_user_id,
                participant_id: xparticipant_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                last_mca_completed: null,
                last_mca_completed_dt: '',
                last_mca_completed_by: null,
                mco_id: xpayer_id,
                activity_id: activity_id,
                md5: md5,
                filename: mca != null ? mca[0].filename : null,
                review_status: mca != null ? mca[0].review_status : null,
                review_flag: mca != null ? mca[0].review_flag : null,
                instantpush_flag: mca != null ? mca[0].instantpush_flag : null,
                delete_flag: mca != null ? mca[0].delete_flag : null
            });
        } else {
            lkp_compliant = 111111;
        }
    }
}

var orderComp = function (a, b) {
    var dt1 = new Date(a.calculated_due_dt);
    var dt2 = new Date(b.calculated_due_dt);
    if (dt1 < dt2) {
        return -1;
    } else if (dt1 > dt2) {
        return 1;
    } else {
        return 0;
    }
    // if (a.calculated_due_dt < b.calculated_due_dt) {
    //     return -1;
    // }
    // if (a.calculated_due_dt > b.calculated_due_dt) {
    //     return 1;
    // }
    // return 0;
}

result = result.sort(orderComp)