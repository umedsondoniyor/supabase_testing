var result = [];
var comp = $.sqlQuery("SELECT x.*, to_char(x.due_dt,'MM/DD/YYYY') fmt_due_dt FROM x_compliance_activity x where x.payer_id=${req.xpayer_id} " +
    "and x.npo_flag=1  " +
    "and x.contract_id=${req.xcontract_id} " +
    "and ${req.xwaiver_id}::integer in (select q.satir::integer from iwb.tool_parse_numbers(x.waiver_ids,',') q)" +
    " order by x.compliance_activity_id asc",
    { xpayer_id: xpayer_id, xwaiver_id: xwaiver_id, xcontract_id: xcontract_id });
var npo = $.getTableJSON("x_npo", xnpo_id);
// $.console(comp)
if (comp == null) {
    return result;//throw new Error('Please correct MCO and/or Waiver info.');
}

/* PHW – NPO Completed by PHW */
if (1 * npo.get('referral_source') == 8) {
    var temp = [];
    for (var i = 0; i < comp.length; i++) {
        if ([66, 67, 110, 163].indexOf(1 * comp[i].lkp_activity) != -1) {
            temp.push(comp[i]);
        }
    }
    comp = temp;
}
/* PHW MCO to MCO Transfer */
if (1 * npo.get('referral_source') == 20) {
    var temp = [];
    for (var i = 0; i < comp.length; i++) {
        if ([110, 163].indexOf(1 * comp[i].lkp_activity) == -1) {
            temp.push(comp[i]);
        }
    }
    comp = temp;
}


for (var i = 0; i < comp.length; i++) {

    /* PHI, FOC, SPC, Allwell, Send SRT Email, Successful New Member Orientation*/
    if ([1132, 1133, 1134, 1107, 1139, 1117].indexOf(1 * comp[i].lkp_activity) != -1) {
        var choice_forms = { 1132: 'phi', 1133: 'foc', 1134: 'service_provider_choice', 1107: 'permission_to_contact', 1139: 'srt_email' }
        var name_schemes = { 'phi': 'PHI', 'foc': 'FOC', 'service_provider_choice': 'SPC', 'permission_to_contact': 'AllWell', 'srt_email': 'SRT_EMAIL' }
        var db_table_id = { 1147: 7541, 1146: 7539, 1148: 7540 }[comp[i].lkp_activity];
        var form_name = choice_forms[comp[i].lkp_activity]
        var filename = name_schemes[form_name]
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var mca = null;

        if (form_name) {
            if ([1132, 1133, 1134].indexOf(1 * comp[i].lkp_activity) != -1) {
                mca = $.sqlQuery(
                    "SELECT x.envolve_insertion_dt,x." + form_name + "_id as id, " + (comp[i].lkp_activity == 1139 ? '' : " x.md5, x.review_status,x.lkp_mca_status,") +
                    "case when x.lkp_participant_type=2 then (select '" + filename + "_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') from x_participant p where p.participant_id=x.participant_id) " +
                    "when x.lkp_participant_type=1 then (select '" + filename + "_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') from x_npo p where p.npo_id=x.participant_id) " +
                    "else '' end filename, " +
                    "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
                    "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
                    "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
                    "FROM x_" + form_name + " x " +
                    "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 order by x.insert_dttm desc limit 1",
                    {
                        xnpo_id: xnpo_id,
                        xrole_id: _scd.roleId,
                        xuser_id: _scd.userId,
                        xtable_id: db_table_id
                    }
                );
            } else {
                mca = $.sqlQuery(
                    "SELECT x." + form_name + "_id as id, " + (comp[i].lkp_activity == 1139 ? '' : " x.md5, x.review_status,") +
                    "case when x.lkp_participant_type=2 then (select '" + filename + "_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') from x_participant p where p.participant_id=x.participant_id) " +
                    "when x.lkp_participant_type=1 then (select '" + filename + "_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') from x_npo p where p.npo_id=x.participant_id) " +
                    "else '' end filename, " +
                    "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
                    "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
                    "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
                    "FROM x_" + form_name + " x " +
                    "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 order by x.insert_dttm desc limit 1",
                    {
                        xnpo_id: xnpo_id,
                        xrole_id: _scd.roleId,
                        xuser_id: _scd.userId,
                        xtable_id: db_table_id
                    });
            }
        }
        if (1 * comp[i].lkp_activity == 1117) {
            mca = $.sqlQuery("SELECT lkp_mca_status, envolve_insertion_dt, new_member_orientation_autosave_id as id FROM x_new_member_orientation_autosave WHERE " +
                " participant_id='${req.xnpo_id}'::integer and lkp_participant_type=1 order by insert_dttm desc limit 1", { xnpo_id: xnpo_id });
        }

        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 2 });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }

        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            md5: mca != null ? mca[0].md5 : null,
            filename: mca != null ? mca[0].filename : null,
            review_status: mca != null ? mca[0].review_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            review_flag: mca != null ? mca[0].review_flag : null,
            instantpush_flag: mca != null ? mca[0].instantpush_flag : null,
            delete_flag: mca != null ? mca[0].delete_flag : null
        });
    }
    /* HRA */
    if (1 * comp[i].lkp_activity == 180) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var mca = $.sqlQuery(
            "SELECT x.lkp_mca_status, x.hra_assessment_autosave_id as id, x.envolve_insertion_dt " +
            "FROM x_hra_assessment_autosave x " +
            "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 order by x.insert_dttm desc limit 1",
            { xnpo_id: xnpo_id });
        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 2 });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }

        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            md5: mca != null ? mca[0].md5 : null,
            filename: mca != null ? mca[0].filename : null,
            review_status: null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
        });
    }
    /* HEDIS */
    if (1 * comp[i].lkp_activity == 1193) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var mca = $.sqlQuery(
            "SELECT x.lkp_mca_status, x.hedis_id as id, x.envolve_insertion_dt " +
            "FROM x_hedis x " +
            "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 order by x.insert_dttm desc limit 1",
            { xnpo_id: xnpo_id });

        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 2 });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            md5: mca != null ? mca[0].md5 : null,
            filename: mca != null ? mca[0].filename : null,
            review_status: null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
        });

    }
    /* SRT */
    if (1 * comp[i].lkp_activity == 179) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var mca = $.sqlQuery(
            "SELECT x.lkp_mca_status, x.srt_assessment_autosave_id as id, x.envolve_insertion_dt " +
            "FROM x_srt_assessment_autosave x " +
            "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 order by x.insert_dttm desc limit 1",
            { xnpo_id: xnpo_id }
        );
        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 2 });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            md5: mca != null ? mca[0].md5 : null,
            filename: mca != null ? mca[0].filename : null,
            review_status: null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
        });
    }
    /* PCSP */
    if (1 * comp[i].lkp_activity == 178) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var mca = $.sqlQuery(
            "SELECT x.lkp_mca_status, x.review_status, x.envolve_insertion_dt, x.pcsp_autosave_id as id, x.md5, " +
            "'PCSP_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') as filename, " +
            "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
            "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
            "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
            "FROM x_pcsp_autosave x, x_npo p " +
            "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 and p.npo_id=${req.xnpo_id} order by x.insert_dttm desc limit 1",
            {
                xnpo_id: xnpo_id,
                xrole_id: _scd.roleId,
                xuser_id: _scd.userId,
                xtable_id: 7558
            }
        );
        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 2 });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            md5: mca != null ? mca[0].md5 : null,
            filename: mca != null ? mca[0].filename : null,
            review_status: mca != null ? mca[0].review_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            review_flag: mca != null ? mca[0].review_flag : null,
            instantpush_flag: mca != null ? mca[0].instantpush_flag : null,
            delete_flag: mca != null ? mca[0].delete_flag : null
        });
    }
    /* InterRAI */
    if (1 * comp[i].lkp_activity == 177) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var mca = $.sqlQuery(
            "SELECT x.lkp_mca_status, x.review_status, x.envolve_insertion_dt, x.interrai_autosave_id as id, x.md5, " +
            "'INTERRAI_' || p.last_name || '_' || LEFT(p.first_name, 1) || '_' || p.medicaid_num || '_' || to_char(x.version_dttm, 'MMDDYYYY') as filename, " +
            "(select count(*) from def_assessment_permission where submit_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) review_flag, " +
            "(select count(*) from def_assessment_permission where instantpush_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) instantpush_flag, " +
            "(select count(*) from def_assessment_permission where delete_flag=1 and table_id=${req.xtable_id} and (role_id=${req.xrole_id} or user_id=${req.xuser_id})) delete_flag " +
            "FROM x_interrai_autosave x, x_npo p " +
            "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 and p.npo_id=${req.xnpo_id} order by x.insert_dttm desc limit 1",
            {
                xnpo_id: xnpo_id,
                xrole_id: _scd.roleId,
                xuser_id: _scd.userId,
                xtable_id: 7292
            }
        );
        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 2 });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            md5: mca != null ? mca[0].md5 : null,
            filename: mca != null ? mca[0].filename : null,
            review_status: mca != null ? mca[0].review_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            review_flag: mca != null ? mca[0].review_flag : null,
            instantpush_flag: mca != null ? mca[0].instantpush_flag : null,
            delete_flag: mca != null ? mca[0].delete_flag : null
        });
    }
    /* Successful Visit Reschedule */
    if (1 * comp[i].lkp_activity == 1136) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var check_nmo_popup = $.sqlQuery("select 1 from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity in (1118,1137) " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id });
        if (check_nmo_popup != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
            if (a != null) {
                lkp_compliant = 9999;
                activity_dt = a[0].dt;
                activity_id = a[0].activity_id;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_activity_frequency: comp[i].lkp_activity_frequency,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: '',
                activity_dt: activity_dt,
                attempts: (attempts != null ? attempts[0].count : null),
                last_attempt_dt: '',
                npo_id: xnpo_id,
                activity_id: activity_id,
                mca_id: null,
                lkp_mca_status: null,
                md5: null,
                filename: null
            });
        }
    }
    /* Unsuccessful Visit Reschedule */
    if (1 * comp[i].lkp_activity == 1135) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;

        var check_nmo_popup = $.sqlQuery("select 1 from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity in (1118,1137) " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id });
        if (check_nmo_popup != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
            if (a != null) {
                activity_dt = a[0].dt;
                activity_id = a[0].activity_id;
            }
            var mca = $.sqlQuery("SELECT lkp_mca_status,envolve_insertion_dt,unsuccessful_contact_autosave_id as id FROM x_unsuccessful_contact_autosave WHERE " +
                " participant_id='${req.xnpo_id}'::integer and lkp_reason_for_contact=16 and opened_by_activity=${req.lkp_activity} and lkp_participant_type=1 order by insert_dttm desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_activity_frequency: comp[i].lkp_activity_frequency,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: '',
                activity_dt: activity_dt,
                attempts: (attempts != null ? attempts[0].count : null),
                last_attempt_dt: '',
                npo_id: xnpo_id,
                activity_id: activity_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
                md5: null,
                filename: null
            });
        }
    }
    /* Unsuccessful Popup Visit */
    if (1 * comp[i].lkp_activity == 1138) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var related = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity in (67,1135) " +
            "AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id });
        if (related != null) {
            welcome_call_attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: 67 });
            reschedule_attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: 1135 });
        }
        if ((welcome_call_attempts != null && 1 * welcome_call_attempts[0].count >= 3) || (reschedule_attempts != null && 1 * reschedule_attempts[0].count >= 3)) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
            if (a != null) {
                activity_dt = a[0].dt;
                activity_id = a[0].activity_id;
            }
            var mca = $.sqlQuery("SELECT lkp_mca_status,envolve_insertion_dt,unsuccessful_contact_autosave_id as id FROM x_unsuccessful_contact_autosave WHERE " +
                " participant_id='${req.xnpo_id}'::integer and lkp_reason_for_contact=16 and opened_by_activity=${req.lkp_activity} and lkp_contact_method=1 and lkp_participant_type=1 order by insert_dttm desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_activity_frequency: comp[i].lkp_activity_frequency,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: '',
                activity_dt: activity_dt,
                attempts: (attempts != null ? attempts[0].count : null),
                last_attempt_dt: '',
                npo_id: xnpo_id,
                activity_id: activity_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
                md5: null,
                filename: null
            });
        }
    }
    /* Successful Popup Visit */
    if (1 * comp[i].lkp_activity == 1137) {
        var lkp_compliant = null;
        var activity_dt = '';
        var calculated_due_dt = '';
        var related_activity = comp[i].related_activity;
        var welcome_call_attempts = null;
        var reschedule_attempts = null;
        var activity_id = null;
        var mca = null;

        var related = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity in (67,1135) " +
            "AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id });
        if (related != null) {
            welcome_call_attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: 67 });
            reschedule_attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: 1135 });
        }
        if ((welcome_call_attempts != null && 1 * welcome_call_attempts[0].count >= 3) || (reschedule_attempts != null && 1 * reschedule_attempts[0].count >= 3)) {
            var d = $.sqlQuery("select to_char((case when n.located_dt is not null then n.located_dt else n.case_received_dt end),'MM/DD/YYYY') case_received_dt," +
                "-1*((select d from (select d::date, row_number() over (order by d) " +
                "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
                "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
                "where row_number=${req.related_activity_days}) -current_date) due, " +
                "to_char((select d from (select d::date, row_number() over (order by d) " +
                "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
                "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
                "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
                "from x_npo n where n.npo_id=${req.xnpo_id} and n.case_received_dt is not null",
                { related_activity_days: comp[i].related_activity_days, xnpo_id: xnpo_id });
            if (d != null) {
                mca = $.sqlQuery("SELECT lkp_mca_status,envolve_insertion_dt,welcome_call_autosave_id as id FROM x_welcome_call_autosave WHERE " +
                    " participant_id='${req.xnpo_id}'::integer and lkp_contact_method=1 and lkp_participant_type=1 order by insert_dttm desc limit 1", { xnpo_id: xnpo_id });
                var a = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                    " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                    "a.activity_date >= '${req.from_dt}'::date " +
                    "and a.activity_date <= '${req.to_dt}'::date " +
                    "order by a.activity_date desc limit 1",
                    {
                        xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                        from_dt: d[0].case_received_dt, to_dt: d[0].dt
                    });
                var late = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                    " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                    "a.activity_date > '${req.dt}'::date " +
                    "and a.activity_date <= current_date " +
                    "order by a.activity_date desc limit 1",
                    { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });
                if (a != null && late == null) {
                    lkp_compliant = 9999;
                    activity_id = a[0].activity_id;
                    if (a[0].dt != null) {
                        activity_dt = a[0].dt;
                    }
                }
                if (a == null && late != null) {
                    lkp_compliant = 8888;
                    calculated_due_dt = d[0].dt;
                    activity_id = late[0].activity_id;
                    if (late[0].dt != null) {
                        activity_dt = late[0].dt;
                    }
                }
                if (a == null && late == null) {
                    lkp_compliant = d[0].due;
                    calculated_due_dt = d[0].dt;
                }
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_activity_frequency: comp[i].lkp_activity_frequency,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: calculated_due_dt,
                activity_dt: activity_dt,
                attempts: null,
                last_attempt_dt: '',
                npo_id: xnpo_id,
                activity_id: activity_id,
                mca_id: mca != null ? mca[0].id : null,
                lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
                envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
                md5: null,
                filename: null
            });
        }
    }
    // /* Successful New Member Orientation */
    // if (1 * comp[i].lkp_activity == 1117) {
    //     var lkp_compliant = null;
    //     var activity_dt = '';
    //     var attempts = null;
    //     var activity_id = null;
    //     var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
    //         " AND a.participant_id='${req.xnpo_id}'::integer " +
    //         "order by a.activity_date desc limit 1",
    //         { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
    //     if (a != null) {
    //         activity_dt = a[0].dt;
    //         activity_id = a[0].activity_id;
    //     }
    //     var mca = $.sqlQuery("SELECT lkp_mca_status, new_member_orientation_autosave_id as id FROM x_new_member_orientation_autosave WHERE " +
    //         " participant_id='${req.xnpo_id}'::integer and lkp_participant_type=1 order by insert_dttm desc limit 1", { xnpo_id: xnpo_id });
    //     result.push({
    //         lkp_activity: comp[i].lkp_activity,
    //         lkp_activity_frequency: comp[i].lkp_activity_frequency,
    //         lkp_compliant: lkp_compliant,
    //         calculated_due_dt: '',
    //         activity_dt: activity_dt,
    //         attempts: (attempts != null ? attempts[0].count : null),
    //         last_attempt_dt: '',
    //         npo_id: xnpo_id,
    //         activity_id: activity_id,
    //         mca_id: mca != null ? mca[0].id : null,
    //         lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
    //         md5: null,
    //         filename: null
    //     });
    // }
    /* Unsuccessful New Member Orientation */
    if (1 * comp[i].lkp_activity == 1118) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        if (a != null) {
            activity_dt = a[0].dt;
            activity_id = a[0].activity_id;
            attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        }
        var mca = $.sqlQuery("SELECT lkp_mca_status, envolve_insertion_dt, unsuccessful_contact_autosave_id as id FROM x_unsuccessful_contact_autosave WHERE " +
            " participant_id='${req.xnpo_id}'::integer and lkp_reason_for_contact=10 and lkp_participant_type=1 order by insert_dttm desc limit 1", { xnpo_id: xnpo_id });
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: '',
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            md5: null,
            filename: null
        });
    }
    /* Unsuccessful Welcome Call */
    if (1 * comp[i].lkp_activity == 67) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        if (a != null) {
            activity_dt = a[0].dt;
            activity_id = a[0].activity_id;
            attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        }
        var mca = $.sqlQuery("SELECT lkp_mca_status, envolve_insertion_dt, unsuccessful_contact_autosave_id as id FROM x_unsuccessful_contact_autosave WHERE " +
            " participant_id='${req.xnpo_id}'::integer and lkp_reason_for_contact=16 and lkp_participant_type=1 order by insert_dttm desc limit 1", { xnpo_id: xnpo_id });
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: '',
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            md5: null,
            filename: null
        });
    }
    /* Successful Welcome Call */
    if (1 * comp[i].lkp_activity == 66) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var calculated_due_dt = '';
        var activity_id = null;
        var mca = null;

        var d = $.sqlQuery("select to_char((case when n.located_dt is not null then n.located_dt else n.case_received_dt end),'MM/DD/YYYY') case_received_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
            "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
            "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_npo n where n.npo_id=${req.xnpo_id} and n.case_received_dt is not null",
            { related_activity_days: comp[i].related_activity_days, xnpo_id: xnpo_id });
        if (d != null) {
            mca = $.sqlQuery("SELECT lkp_mca_status, envolve_insertion_dt, welcome_call_autosave_id as id FROM x_welcome_call_autosave WHERE " +
                " participant_id='${req.xnpo_id}'::integer and lkp_participant_type=1 order by insert_dttm desc limit 1",
                { xnpo_id: xnpo_id });
            var a = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].case_received_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });
            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: attempts,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            md5: null,
            filename: null
        });
    }

    /* Schedule Visit - Other */
    if (1 * comp[i].lkp_activity == 68 || 1 * comp[i].lkp_activity == 111) {
        var lkp_compliant = null;
        var activity_dt = '';
        var activity_id = null;
        var a = $.sqlQuery("select a.activity_id,to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 1 * comp[i].lkp_activity });
        if (a != null) {
            activity_dt = a[0].dt;
            lkp_compliant = 9999;
            activity_id = a[0].activity_id;
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: '',
            activity_dt: activity_dt,
            attempts: null,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            md5: null,
            filename: null
        });
    }
    /* Popup Visit */
    if (1 * comp[i].lkp_activity == 69) {
        var lkp_compliant = null;
        var activity_dt = '';
        var calculated_due_dt = '';
        var related_activity = comp[i].related_activity;
        var attempts = null;
        var related = null;
        var activity_id = null;
        var mca = null;

        if (related_activity != null) {
            related = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: 66 });
            if (related == null) {
                attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                    " AND a.participant_id='${req.xnpo_id}'::integer ",
                    { xnpo_id: xnpo_id, lkp_activity: related_activity });
            }
        }
        if (attempts != null && 1 * attempts[0].count == 3) {
            var d = $.sqlQuery("select to_char((case when n.located_dt is not null then n.located_dt else n.case_received_dt end),'MM/DD/YYYY') case_received_dt," +
                "-1*((select d from (select d::date, row_number() over (order by d) " +
                "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
                "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
                "where row_number=${req.related_activity_days}) -current_date) due, " +
                "to_char((select d from (select d::date, row_number() over (order by d) " +
                "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
                "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
                "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
                "from x_npo n where n.npo_id=${req.xnpo_id} and n.case_received_dt is not null",
                { related_activity_days: comp[i].related_activity_days, xnpo_id: xnpo_id });
            if (d != null) {
                mca = $.sqlQuery("SELECT lkp_mca_status, x.envolve_insertion_dt, unscheduled_contact_autosave_id as id FROM x_unscheduled_contact_autosave WHERE " +
                    " participant_id='${req.xnpo_id}'::integer and lkp_participant_type=1 order by insert_dttm desc limit 1",
                    { xnpo_id: xnpo_id });
                var a = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                    " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                    "a.activity_date >= '${req.from_dt}'::date " +
                    "and a.activity_date <= '${req.to_dt}'::date " +
                    "order by a.activity_date desc limit 1",
                    {
                        xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                        from_dt: d[0].case_received_dt, to_dt: d[0].dt
                    });
                var late = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                    " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                    "a.activity_date > '${req.dt}'::date " +
                    "and a.activity_date <= current_date " +
                    "order by a.activity_date desc limit 1",
                    { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });
                if (a != null && late == null) {
                    lkp_compliant = 9999;
                    activity_id = a[0].activity_id;
                    if (a[0].dt != null) {
                        activity_dt = a[0].dt;
                    }
                }
                if (a == null && late != null) {
                    lkp_compliant = 8888;
                    calculated_due_dt = d[0].dt;
                    activity_id = late[0].activity_id;
                    if (late[0].dt != null) {
                        activity_dt = late[0].dt;
                    }
                }
                if (a == null && late == null) {
                    lkp_compliant = d[0].due;
                    calculated_due_dt = d[0].dt;
                }
            }
        }

        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: null,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            md5: null,
            filename: null
        });

    }

    /* Complete Assessments (same date as schedule visit) */
    if (1 * comp[i].lkp_activity == 70) {
        var lkp_compliant = null;
        var activity_dt = '';
        var calculated_due_dt = '';
        var activity_id = null;

        var d = $.sqlQuery("select -1*(a.activity_date-current_date) due, to_char(a.npo_schedule_dt,'MM/DD/YYYY') dt from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68 });
        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "and a.activity_date <= '${req.dt}'::date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: 1 * comp[i].lkp_activity, dt: d[0].dt });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "and a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: 1 * comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }


        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: null,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            md5: null,
            filename: null
        });
    }

    /* Submit Assessments */
    if (1 * comp[i].lkp_activity == 75) {
        var lkp_compliant = null;
        var activity_dt = '';
        var calculated_due_dt = '';
        var activity_id = null;

        var d = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series(a.npo_schedule_dt::date + '1 day'::interval, a.npo_schedule_dt::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_activity a " +
            "where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 68, related_activity_days: 1 * comp[i].related_activity_days });

        if (d != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].npo_schedule_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });

            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }

        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: null,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            md5: null,
            filename: null
        });
    }

    /* Unsuccessful 7-14 Follow up Call */
    if (1 * comp[i].lkp_activity == 163) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        if (a != null) {
            activity_dt = a[0].dt;
            activity_id = a[0].activity_id;
            attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer ",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        }
        var mca = $.sqlQuery("SELECT lkp_mca_status, envolve_insertion_dt, unsuccessful_contact_autosave_id as id FROM x_unsuccessful_contact_autosave WHERE " +
            " participant_id='${req.xnpo_id}'::integer and lkp_reason_for_contact=0 and lkp_participant_type=1 order by insert_dttm desc limit 1", { xnpo_id: xnpo_id });
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: '',
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            md5: null,
            filename: null
        });
    }

    /* 7-14 Follow up Call */
    if (1 * comp[i].lkp_activity == 110) {
        var lkp_compliant = null;
        var activity_dt = '';
        var calculated_due_dt = '';
        var activity_id = null;
        var mca = null;

        var related = $.sqlQuery("select to_char(a.npo_schedule_dt,'MM/DD/YYYY') npo_schedule_dt, " +
            "to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity in (1136,68) " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id });
        if (related != null) {
            var d = $.sqlQuery("(select -1*(('${req.dt}'::date + (${req.related_activity_days} || ' day')::interval)::date -current_date) due, " +
                "to_char(('${req.dt}'::date + (${req.related_activity_days} || ' day')::interval)::date,'MM/DD/YYYY') dt " +
                "from x_npo n where n.npo_id=${req.xnpo_id})",
                { related_activity_days: comp[i].related_activity_days, xnpo_id: xnpo_id, dt: related[0].npo_schedule_dt });
            if (d != null) {
                mca = $.sqlQuery("SELECT lkp_mca_status, envolve_insertion_dt, seven_or_fourteen_day_follow_autosave_id as id FROM x_seven_or_fourteen_day_follow_autosave WHERE " +
                    " participant_id='${req.xnpo_id}'::integer and lkp_participant_type=1 order by insert_dttm desc limit 1",
                    { xnpo_id: xnpo_id });
                var a = $.sqlQuery("select a.activity_id,to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                    " AND a.participant_id='${req.xnpo_id}'::integer and " +
                    "a.activity_date >= '${req.from_dt}'::date " +
                    "and a.activity_date <= '${req.to_dt}'::date " +
                    "order by a.activity_date desc limit 1",
                    {
                        xnpo_id: xnpo_id, lkp_activity: 1 * comp[i].lkp_activity,
                        to_dt: d[0].dt, from_dt: related[0].dt
                    });
                var late = $.sqlQuery("select a.activity_id,to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                    " AND a.participant_id='${req.xnpo_id}'::integer and " +
                    "a.activity_date > '${req.dt}'::date " +
                    "and a.activity_date <= current_date " +
                    "order by a.activity_date desc limit 1",
                    { xnpo_id: xnpo_id, lkp_activity: 1 * comp[i].lkp_activity, dt: d[0].dt });
                if (a != null && late == null) {
                    lkp_compliant = 9999;
                    activity_id = a[0].activity_id;
                    if (a[0].dt != null) {
                        activity_dt = a[0].dt;
                    }
                }
                if (a == null && late != null) {
                    lkp_compliant = 8888;
                    calculated_due_dt = d[0].dt;
                    activity_id = late[0].activity_id;
                    if (late[0].dt != null) {
                        activity_dt = late[0].dt;
                    }
                }
                if (a == null && late == null) {
                    lkp_compliant = d[0].due;
                    calculated_due_dt = d[0].dt;
                }
            }
        }

        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: null,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            mca_id: mca != null ? mca[0].id : null,
            lkp_mca_status: mca != null ? mca[0].lkp_mca_status : null,
            envolve_insertion_dt: mca != null ? mca[0].envolve_insertion_dt : null,
            md5: null,
            filename: null
        });
    }

    /* OLTL Schedule Visit - Successful Initial Participant Contact - Initial Visit - Initial ISP submitted */
    if ((1 * comp[i].lkp_activity == 68 || 1 * comp[i].lkp_activity == 127 || 1 * comp[i].lkp_activity == 129 ||
        1 * comp[i].lkp_activity == 131) && xpayer_id == 6) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var calculated_due_dt = '';
        var activity_id = null;

        var d = $.sqlQuery("select to_char((case when n.located_dt is not null then n.located_dt else n.case_received_dt end),'MM/DD/YYYY') case_received_dt," +
            "-1*((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
            "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}) -current_date) due, " +
            "to_char((select d from (select d::date, row_number() over (order by d) " +
            "from generate_series((case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + '1 day'::interval, " +
            "(case when n.located_dt is not null then n.located_dt else n.case_received_dt end)::date + ((${req.related_activity_days}* 2+ 5) || ' day')::interval, '1d') d where extract('dow' from d) not in (0, 6) ) s " +
            "where row_number=${req.related_activity_days}),'MM/DD/YYYY') dt " +
            "from x_npo n where n.npo_id=${req.xnpo_id} and n.case_received_dt is not null",
            { related_activity_days: comp[i].related_activity_days, xnpo_id: xnpo_id });
        if (d != null) {
            var a = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date >= '${req.from_dt}'::date " +
                "and a.activity_date <= '${req.to_dt}'::date " +
                "order by a.activity_date desc limit 1",
                {
                    xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity,
                    from_dt: d[0].case_received_dt, to_dt: d[0].dt
                });
            var late = $.sqlQuery("select a.activity_id, to_char(a.activity_date,'MM/DD/YYYY') dt from x_activity a" +
                " where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} AND a.participant_id='${req.xnpo_id}'::integer and " +
                "a.activity_date > '${req.dt}'::date " +
                "and a.activity_date <= current_date " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity, dt: d[0].dt });
            if (a != null && late == null) {
                lkp_compliant = 9999;
                activity_id = a[0].activity_id;
                if (a[0].dt != null) {
                    activity_dt = a[0].dt;
                }
            }
            if (a == null && late != null) {
                lkp_compliant = 8888;
                calculated_due_dt = d[0].dt;
                activity_id = late[0].activity_id;
                if (late[0].dt != null) {
                    activity_dt = late[0].dt;
                }
            }
            if (a == null && late == null) {
                lkp_compliant = d[0].due;
                calculated_due_dt = d[0].dt;
            }
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: calculated_due_dt,
            activity_dt: activity_dt,
            attempts: attempts,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            md5: null,
            filename: null
        });
    }


    /* OLTL Unsuccessful Initial Participant Contact - Justification note entered in HCSIS */
    if ((1 * comp[i].lkp_activity == 128 || 1 * comp[i].lkp_activity == 130) && xpayer_id == 6) {
        var lkp_compliant = null;
        var activity_dt = '';
        var activity_id = null;
        var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: 1 * comp[i].lkp_activity });
        if (a != null) {
            activity_dt = a[0].dt;
            activity_id = a[0].activity_id;
            lkp_compliant = 9999;
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: '',
            activity_dt: activity_dt,
            attempts: null,
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            md5: null,
            filename: null
        });
    }


    /* Unsuccessful Outreach */
    // if (1 * comp[i].lkp_activity == 1115) {
    //     var lkp_compliant = null;
    //     var activity_dt = '';
    //     var attempts = null;
    //     var activity_id = null;
    //     var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
    //         " AND a.participant_id='${req.xnpo_id}'::integer " +
    //         "order by a.activity_date desc limit 1",
    //         { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
    //     if (a != null) {
    //         activity_dt = a[0].dt;
    //         activity_id = a[0].activity_id;
    //         attempts = $.sqlQuery("select count(*) from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
    //             " AND a.participant_id='${req.xnpo_id}'::integer ",
    //             { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
    //     }
    //     result.push({
    //         lkp_activity: comp[i].lkp_activity,
    //         lkp_activity_frequency: comp[i].lkp_activity_frequency,
    //         lkp_compliant: lkp_compliant,
    //         calculated_due_dt: '',
    //         activity_dt: activity_dt,
    //         attempts: (attempts != null ? attempts[0].count : null),
    //         last_attempt_dt: '',
    //         npo_id: xnpo_id,
    //         activity_id: activity_id,
    //         md5: null,
    //         filename: null
    //     });
    // }


    /* Prepare for Visit */
    if (1 * comp[i].lkp_activity == 1116) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
            " AND a.participant_id='${req.xnpo_id}'::integer " +
            "order by a.activity_date desc limit 1",
            { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
        if (a != null) {
            activity_dt = a[0].dt;
            activity_id = a[0].activity_id;
            lkp_compliant = 9999;
        }
        result.push({
            lkp_activity: comp[i].lkp_activity,
            lkp_activity_frequency: comp[i].lkp_activity_frequency,
            lkp_compliant: lkp_compliant,
            calculated_due_dt: '',
            activity_dt: activity_dt,
            attempts: (attempts != null ? attempts[0].count : null),
            last_attempt_dt: '',
            npo_id: xnpo_id,
            activity_id: activity_id,
            md5: null,
            filename: null
        });
    }
    /* Services Authorized */
    if (1 * comp[i].lkp_activity == 1182) {
        var lkp_compliant = null;
        var activity_dt = '';
        var attempts = null;
        var activity_id = null;
        var check_srt = $.sqlQuery(
            "SELECT 1 FROM x_srt_assessment_autosave x " +
            "WHERE x.participant_id='${req.xnpo_id}'::integer and x.lkp_participant_type=1 order by x.insert_dttm desc limit 1",
            { xnpo_id: xnpo_id }
        );
        if (check_srt != null) {
            var a = $.sqlQuery("select to_char(a.activity_date,'MM/DD/YYYY') dt, a.activity_id from x_activity a where a.lkp_activity_type=2 AND a.lkp_activity=${req.lkp_activity} " +
                " AND a.participant_id='${req.xnpo_id}'::integer " +
                "order by a.activity_date desc limit 1",
                { xnpo_id: xnpo_id, lkp_activity: comp[i].lkp_activity });
            if (a != null) {
                activity_dt = a[0].dt;
                activity_id = a[0].activity_id;
                lkp_compliant = 9999;
            }
            result.push({
                lkp_activity: comp[i].lkp_activity,
                lkp_activity_frequency: comp[i].lkp_activity_frequency,
                lkp_compliant: lkp_compliant,
                calculated_due_dt: '',
                activity_dt: activity_dt,
                attempts: (attempts != null ? attempts[0].count : null),
                last_attempt_dt: '',
                npo_id: xnpo_id,
                activity_id: activity_id,
                md5: null,
                filename: null
            });
        }
    }



}
$.console(result)

var order = [67, 66, 1138, 1137, 68, 1135, 1136, 1116, 177, 178, 180, 1193, 1132, 1133, 1134, 1107, 179, 1139, 1117, 1118, 110, 163, 111, 1182];
var temp = [];
for (var i = 0; i < order.length; i++) {
    for (var k = 0; k < result.length; k++) {
        if (result[k].lkp_activity == order[i]) {
            temp.push(result[k]);
        }
    }
}
result = temp;